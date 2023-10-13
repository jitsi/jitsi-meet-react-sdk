import { IJitsiMeetExternalApi } from '.';

export type JitsiMeetExternalApi = {
    new (

        /**
         * The domain used to build the conference URL.
         */
        domain: string,

        /**
         * The optional arguments for the IFrame.
         */
        options: {

            /**
             * The name of the room to join.
             */
            roomName?: string,

            /**
             * The created IFrame width.
             */
            width?: string | number,

            /**
             * The height for the created IFrame.
             */
            height?: string | number,

            /**
             * The JS object with overrides for options defined in the config.js file
             * https://github.com/jitsi/jitsi-meet/blob/master/config.js.
             */
            configOverwrite?: object,

            /**
             * The JS object with overrides for options defined in the interface_config.js file
             * https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js.
             */
            interfaceConfigOverwrite?: object;

            /**
             * The JWT token.
             */
            jwt?: string,

            /**
             * The IFrame onload event handler.
             */
            onload?: () => void,

            /**
             * Object arrays that contain information about participants invited to a call.
             */
            invitees?: [],

            /**
             * Information map about the devices used in a call.
             */
            devices?: {

                /**
                 * The label of the device used for audio input.
                 */
                audioInput: string,

                /**
                 * The label of the device  used for audio output.
                 */
                audioOutput: string,

                /**
                 * The label of the device used for video input.
                 */
                videoInput: string
            },

            /**
             * The JS object that contains information about the participant starting the meeting.
             */
            userInfo?: {

                /**
                 * The participant display name.
                 */
                displayName: string,

                /**
                 * The participant email address.
                 */
                email: string
            },

            /**
             * The default meeting language.
             */
            lang?: string,

            /**
             * The `stage.8x8.vc` or `8x8.vc` release version to test.
             * Expects the following format: `release-1234`.
             */
            release?: string,

            /**
             * The HTML DOM Element where the IFrame is added as a child.
             */
            parentNode?: HTMLDivElement | null
        }
    ): IJitsiMeetExternalApi
};
