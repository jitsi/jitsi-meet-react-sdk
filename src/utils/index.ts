import { DEFAULT_OPTIONS } from '../constants';

/**
 * Returns the complete room name
 *
 * @param {string} tenant
 * @param {string} roomName
 * @returns {string}
 */
export const getRoomName = (
  tenant?: string,
  roomName = DEFAULT_OPTIONS.roomName
): string => {
  return tenant ? `${tenant}/${roomName}` : roomName;
};

export const generateComponentId = (...args: string[]) => {
  const uuid = 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, character => {
    const random = (Math.random() * 16) % 16 | 0;
    return (character === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  })
  return `${args.join('-')}-${uuid}`;
};
