import React from 'react';

import IJitsiMeetExternalApi from './IJitsiMeetExternalApi';

/**
 * The the base props for React {@code Components} that load the Jitsi Meet IFrame.
 */
export default interface IMeetingProps {

    /**
     * The name of the room to join.
     */
    roomName: string;

    /**
     * The JS object with overrides for options defined in the config.js file
     * https://github.com/jitsi/jitsi-meet/blob/master/config.js.
     */
    configOverwrite?: object;

    /**
     * The JS object with overrides for options defined in the interface_config.js file
     * https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js.
     */
    interfaceConfigOverwrite?: object;

    /**
     * The JWT token.
     */
    jwt?: string;

    /**
     * Object arrays that contain information about participants invited to a call.
     */
    invitees?: [];

    /**
     * Information map about the devices used in a call.
     */
    devices?: {

        /**
         * The label of the device used for audio input.
         */
        audioInput: string;

        /**
         * The label of the device  used for audio output.
         */
        audioOutput: string;

        /**
         * The label of the device used for video input.
         */
        videoInput: string;
    };

    /**
     * The JS object that contains information about the participant starting the meeting.
     */
    userInfo?: {

        /**
         * The participant display name.
         */
        displayName: string;

        /**
         * The participant email address.
         */
        email: string;
    };

    /**
     * The default meeting language.
     */
    lang?: string;

    /**
     * The `stage.8x8.vc` or `8x8.vc` release version to test.
     * Expects the following format: `release-1234`.
     */
    release?: string;

    /**
     * The custom spinner to be displayed while the iframe is loading.
     */
    spinner?: React.ElementType;

    /**
     * The external API reference for events and commands.
     */
    onApiReady?: (api: IJitsiMeetExternalApi) => void;

    /**
     * The callback for when the meeting is ready to be closed.
     */
    onReadyToClose?: () => void;

    /**
     * The parent node used by the IFrame.
     */
    getIFrameRef?: (parentNode: HTMLDivElement) => void;
}
