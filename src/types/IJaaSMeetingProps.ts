/* eslint-disable-next-line */
import { JaaSMeeting } from '..';
import IMeetingProps from './IMeetingProps';

/**
 * The type of the React {@code Component} props of {@link JaaSMeeting}.
 */
export default interface IJaaSMeetingProps extends IMeetingProps {

    /**
     * The App ID that provides an isolated context and prefixes the room name.
     */
    appId: string;

    /**
     * Whether to use the stage environment or not.
     */
    useStaging?: boolean;
}
