import { DEFAULT_OPTIONS } from "../constants";

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
