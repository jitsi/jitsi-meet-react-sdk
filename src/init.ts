import { DEFAULT_DOMAIN } from './constants';
import { JitsiMeetExternalApi } from './types';

const loadExternalApi = async (
        domain: string,
        release?: string
): Promise<JitsiMeetExternalApi> => new Promise((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) {
        return resolve(window.JitsiMeetExternalAPI);
    }

    const script: HTMLScriptElement = document.createElement('script');
    const releaseParam: string = release ? `?release=release-${release}` : '';

    script.async = true;
    script.src = `https://${domain}/external_api.js${releaseParam}`;
    script.onload = () => resolve(window.JitsiMeetExternalAPI);
    script.onerror = () => reject(new Error(`Script load error: ${script.src}`));
    document.head.appendChild(script as Node);
});


let scriptPromise: Promise<JitsiMeetExternalApi>;

/**
 * Injects the external_api.js script for the corresponding domain in DOM
 * and resolves with either the `JitsiMeetExternalApi` class definition or an error.
 *
 * Only the first script will be injected, therefore avoid using multiple instances
 * with mixed domains and release version at the same time.
 *
 * @param {string} domain - The domain of the external API
 * @param {string} release - The Jitsi Meet release
 * @returns {Promise<JitsiMeetExternalApi>} - The JitsiMeetExternalAPI or an error
 */
export const fetchExternalApi = (
        domain: string = DEFAULT_DOMAIN,
        release?: string
): Promise<JitsiMeetExternalApi> => {
    if (scriptPromise) {
        return scriptPromise;
    }

    scriptPromise = loadExternalApi(domain, release);

    return scriptPromise;
};
