/* eslint-disable @typescript-eslint/no-unused-vars */
import IJitsiMeetingOptions from "./IJitsiMeetingOptions";
import { JaaSMeeting } from "..";

/**
 * The type of the React {@code Component} props of {@link JaaSMeeting}.
 */
export default interface IJaaSMeetingProps {
  /**
   * The id of the component
   */
  id: string;

  /**
   * The App ID that provides an isolated context and prefixes the room name
   */
  appId: string;

  /**
   * The optional arguments for the conference
   */
  options: IJitsiMeetingOptions;

  /**
   * The custom spinner to be displayed while the iframe is loading
   */
  spinner?: () => JSX.Element;

  /**
   * The external API reference for events and commands
   */
  onApiReady: (api: any) => object;
}
