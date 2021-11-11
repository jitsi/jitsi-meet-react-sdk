import { JitsiMeetExternalApi } from './types';

const loadExternalApi = async (
        domain?: string
): Promise<JitsiMeetExternalApi> => new Promise((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) {
        return resolve(window.JitsiMeetExternalAPI);
    }

    const script: HTMLScriptElement = document.createElement('script');

    script.async = true;
    script.src = `https://${domain}/external_api.js`;
    script.onload = () => resolve(window.JitsiMeetExternalAPI);
    script.onerror = () => reject(new Error(`Script load error: ${script.src}`));
    document.head.appendChild(script as Node);
});


let scriptPromise: Promise<JitsiMeetExternalApi>;

/**
 * Injects the external_api.js script for the corresponding domain in DOM
 * and resolves with either the `JitsiMeetExternalApi` class definition or an error
 *
 * @param {string} domain - The domain of the external API
 * @returns {Promise<JitsiMeetExternalApi>} - the JitsiMeetExternalAPI or an error
 */
export const fetchExternalApi = (domain?: string): Promise<JitsiMeetExternalApi> => {
    if (scriptPromise) {
        return scriptPromise;
    }

    scriptPromise = loadExternalApi(domain);

    return scriptPromise;
};
