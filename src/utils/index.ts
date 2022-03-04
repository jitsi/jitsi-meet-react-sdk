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

let instancesCounter = 0;

/**
 * Generates an unique id
 * @param {string} prefix
 * @returns {string} the component id
 */
export const generateComponentId = (
        prefix: string
): string => `${prefix}-${instancesCounter++}`;
