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
