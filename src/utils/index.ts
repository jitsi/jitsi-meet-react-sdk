import { DEFAULT_OPTIONS } from '../constants';

/**
 * Returns the complete room name
 *
 * @param {string | undefined} tenant
 * @param {string} roomName
 * @returns {string} the complete room name
 */
export const getRoomName = (
        tenant?: string,
        roomName = DEFAULT_OPTIONS.roomName
): string => tenant ? `${tenant}/${roomName}` : roomName;


let instancesCounter = 0;

/**
 * Generates an unique id
 * @param {string} prefix
 * @returns {string} the component id
 */
export const generateComponentId = (
        prefix: string
): string => `${prefix}-${instancesCounter++}`;
