import { ReactElement } from 'react';

import { IJaaSMeetingProps } from '../types';
import { getJaaSDomain, getRoomName } from '../utils';

import { JitsiMeeting } from '.';

/**
 * Returns the JaaSMeeting Component with access to the 8x8.vc External API
 * to be used as-it-is in React projects
 *
 * @param {IJaaSMeetingProps} props the component's props
 * @returns {ReactElement} the `JaaSMeeting` Component
 * @example
  ```js
      <JaaSMeeting
        roomName: 'TestingJaaSMeetingComponent'
        appId='exampleAppId'
        spinner={CustomSpinner}
        onApiReady={(externalApi) => console.log(externalApi)}
      />
  ```
 */
const JaaSMeeting = ({
    appId,
    roomName,
    useStaging,
    release,
    ...rest
}: IJaaSMeetingProps): ReactElement => (
    <JitsiMeeting
        domain={getJaaSDomain(useStaging)}
        roomName={getRoomName(roomName, appId)}
        release={release}
        {...rest}
    />
);

export default JaaSMeeting;
