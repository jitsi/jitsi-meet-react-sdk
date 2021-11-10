import { DEFAULT_DOMAIN, JAAS_DOMAIN } from './constants';
import IJitsiMeetExternalApi from './types/IJitsiMeetExternalApi';

type ExternalApi = {
    isLoaded: boolean;
    callbacks: ((err: Error | null, api?: new () => IJitsiMeetExternalApi) => void)[];
    err: Error | null;
};

let externalApi: ExternalApi;

export const initExternalApi = (
        domain: string = DEFAULT_DOMAIN,
        callback: (err: Error | null, api?: new () => IJitsiMeetExternalApi) => void
): void => {
    if (!externalApi) {
        externalApi = {
            isLoaded: false,
            callbacks: [ callback ],
            err: null
        };
        const script: HTMLScriptElement = document.createElement('script');

        script.async = true;
        script.src = `https://${domain}/external_api.js`;
        script.onload = () => {
            externalApi.isLoaded = true;
            const callbacks = externalApi.callbacks;

            if (callbacks) {
                callbacks.forEach(cb => {
                    // cb can be `setExternalApi` when called from component
                    // or the `resolve` function when from fetchExternalApi
                    cb(null, window.JitsiMeetExternalAPI);
                });
            }
        };
        script.onerror = () => {
            externalApi.isLoaded = true;
            externalApi.err = new Error(
                `Script load error: ${script.src}`
            );
            const callbacks = externalApi.callbacks;

            if (callbacks && callbacks.length) {
                callbacks.forEach(cb => {
                    // cb can be `setExternalApi` when called from component
                    // or the `resolve` function when from fetchExternalApi
                    cb(externalApi.err);
                });
            }
        };

        document.head.appendChild(script as Node);
    } else if (externalApi.isLoaded) {
        if (externalApi.err) {
            callback(externalApi.err);
        } else {
            callback(null, window.JitsiMeetExternalAPI);
        }
    } else {
        externalApi.callbacks.push(callback);
    }
};

/**
 * Injects the external_api.js script for the corresponding domain in DOM
 * and resolves with an object containing either the `JitsiMeetExternalAPI`
 * class definition or an error
 *
 * @param {string} domain - The domain of the external API
 * @returns {Promise<object>} - Object containing the JitsiMeetExternalAPI object
 * or an error
 */
export const fetchExternalApi = (
        domain: string = JAAS_DOMAIN
): Promise<void | (new () => IJitsiMeetExternalApi)> =>
    new Promise((resolve, reject) => {
        initExternalApi(domain, (error: Error | null, api?: new () => IJitsiMeetExternalApi): void => {
            if (error) {
                reject(error);
            }
            resolve(api);
        });
    });
