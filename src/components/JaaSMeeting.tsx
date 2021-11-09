import { JAAS_DOMAIN } from '../constants';
import { IJaaSMeetingProps } from '../types';
import { getRoomName } from '../utils';

import { JitsiMeeting } from '.';

/**
 * Returns the JaaSMeeting Component with access to the 8x8.vc External API
 * to be used as-it-is in React projects
 *
 * @param {IJitsiMeetingProps} props the component's props
 * @returns {React.Component} the `JaaSMeeting` Component
 * @example
  ```js
      <JaaSMeeting
        roomName: 'TestingJaaSMeetingComponent'
        width: '100%'
        height: 500
        appId='exampleAppId'
        spinner={CustomSpinner}
        onApiReady={(externalApi) => console.log(externalApi)}
      />
  ```
 */
const JaaSMeeting = ({
    appId,
    roomName,
    ...rest
}: IJaaSMeetingProps) => (
    <JitsiMeeting
        domain={JAAS_DOMAIN}
        roomName={getRoomName(appId, roomName)}
        {...rest}
    />
);

export default JaaSMeeting;
