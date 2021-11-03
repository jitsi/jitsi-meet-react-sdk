import { JaaS_DOMAIN } from "./constants";

type ExternalApiMap = {
  [key: string]: {
    fn?: any;
    isLoaded: boolean;
    callbacks: ((err: Error | null, jitsiClass?: any) => void)[];
    err: Error | null;
  };
};

const externalApiMap: ExternalApiMap = {};

/**
 * Injects the external_api.js script for the corresponding domain in DOM
 * and resolves with an object containing either the `JitsiMeetExternalAPI`
 * class definition or an error
 *
 * @param {string} domain - The domain of the external API
 * @returns {Promise<object>} - Object containing the JitsiMeetExternalAPI object
 * or an error
 */
export const initExternal = (domain: string = JaaS_DOMAIN): Promise<void> =>
  new Promise((resolve, reject) => {
    init(domain, (error: Error | null, jitsiClass?: any): void => {
      if (error) {
        reject(error);
      }
      resolve(jitsiClass);
    });
  });

export const init = (
  domain: string,
  callback: (err: Error | null, jitsiClass?: any) => void
): void => {
  if (!externalApiMap[domain]) {
    externalApiMap[domain] = {
      isLoaded: false,
      callbacks: [callback],
      err: null,
    };
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `https://${domain}/external_api.js`;
    script.onload = () => {
      externalApiMap[domain].isLoaded = true;
      externalApiMap[domain].fn = window.JitsiMeetExternalAPI.bind({});
      const callbacks = externalApiMap[domain].callbacks;
      if (callbacks) {
        callbacks.forEach((cb) => {
          // cb can be `setJitsiClass` when called from component
          // or the `resolve` function when from initExternal
          cb(null, { fn: externalApiMap[domain].fn });
        });
      }
    };
    script.onerror = () => {
      externalApiMap[domain].isLoaded = true;
      externalApiMap[domain].err = new Error(
        `Script load error: ${script.src}`
      );
      const callbacks = externalApiMap[domain].callbacks;
      if (callbacks && callbacks.length) {
        callbacks.forEach((cb) => {
          // cb can be `setJitsiClass` when called from component
          // or the `resolve` function when from initExternal
          cb(externalApiMap[domain].err);
        });
      }
    };

    document.head.appendChild(script as Node);
  } else {
    if (externalApiMap[domain].isLoaded) {
      if (externalApiMap[domain].err) {
        callback(externalApiMap[domain].err);
      } else {
        callback(null, { fn: externalApiMap[domain].fn });
      }
    } else {
      externalApiMap[domain].callbacks.push(callback);
    }
  }
};
