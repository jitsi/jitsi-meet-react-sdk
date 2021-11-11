/**
 * Returns the complete room name
 *
 * @param {string} roomName
 * @param {string | undefined} tenant
 * @returns {string} the complete room name
 */
export const getRoomName = (
        roomName?: string,
        tenant?: string
): string | undefined => tenant ? `${tenant}/${roomName}` : roomName;


let instancesCounter = 0;

/**
 * Generates an unique id
 * @param {string} prefix
 * @returns {string} the component id
 */
export const generateComponentId = (
        prefix: string
): string => `${prefix}-${instancesCounter++}`;
