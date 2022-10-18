import { JAAS_PROD_DOMAIN, JAAS_STAGING_DOMAIN } from '../constants';

/**
 * Returns the complete room name
 *
 * @param {string} roomName
 * @param {string} tenant
 * @returns {string} the complete room name
 */
export const getRoomName = (
        roomName: string,
        tenant?: string
): string => {
    if (tenant) {
        return `${tenant}/${roomName}`;
    }

    return roomName;
};

/**
 * Returns the appId or tenant value
 *
 * @param {string} roomName
 * @returns {string|undefined}
 */
export const getAppId = (roomName: string): string | undefined => {
    const roomParts = roomName.split('/');

    if (roomParts.length <= 1) {
        return;
    }

    return roomParts[0];
}

/**
 * Returns the JaaS domain
 *
 * @param {boolean|undefined} useStaging
 * @returns {string} the JaaS domain
 */
export const getJaaSDomain = (useStaging?: boolean): string => {
    if (useStaging) {
        return JAAS_STAGING_DOMAIN;
    }

    return JAAS_PROD_DOMAIN;
};

let instancesCounter = 0;

/**
 * Generates an unique id
 * @param {string} prefix
 * @returns {string} the component id
 */
export const generateComponentId = (
        prefix: string
): string => `${prefix}-${instancesCounter++}`;
