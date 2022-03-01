/* eslint-disable-next-line */
import { JitsiMeeting } from '..';
import IMeetingProps from './IMeetingProps';

/**
 * The type of the React {@code Component} props of {@link JitsiMeeting}.
 */
export default interface IJitsiMeetingProps extends IMeetingProps {

    /**
     * The domain used to build the conference URL.
     */
    domain?: string;
}
