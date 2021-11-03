/* eslint-disable @typescript-eslint/no-unused-vars */
import IJitsiMeetingOptions from "./IJitsiMeetingOptions";
import { JitsiMeeting } from "..";

/**
 * The type of the React {@code Component} props of {@link JitsiMeeting}.
 */
export default interface IJitsiMeetingProps {
  /**
   * The id of the component
   */
  id: string;
  /**
   * The domain used to build the conference URL
   */
  domain: string;

  /**
   * The tenant that provides an isolated context and prefixes the room name
   */
  tenant?: string;

  /**
   * The custom spinner to be displayed while the iframe is loading
   */
  spinner?: () => JSX.Element;

  /**
   * The optional arguments for the conference
   */
  options: IJitsiMeetingOptions;

  /**
   * The external API reference for events and commands
   */
  onApiReady: (api: any) => object;
}
