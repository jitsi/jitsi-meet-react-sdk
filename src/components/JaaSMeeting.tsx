import { JitsiMeeting } from ".";
import { JaaS_DOMAIN } from "../constants";
import { IJaaSMeetingProps } from "../types";

/**
 * Returns the JaaSMeeting Component with access to the 8x8.vc External API
 * to be used as-it-is in React projects
 *
 * @param {IJitsiMeetingProps} props
 * @example
  ```js
      <JaaSMeeting
        id="testId"
        options={{
          roomName: 'TestingJaaSMeetingComponent'
          width: '100%'
          height: '500px'
        }}
        appId="exampleAppId"
        spinner={() => <>loading jaas meeting...</>}
        onApiReady={(externalApi) => console.log(externalApi)}
      />
  ```
 */
const JaaSMeeting = ({
  id,
  options,
  appId,
  spinner,
  onApiReady
}: IJaaSMeetingProps) => {
  const props = {
    id,
    domain: JaaS_DOMAIN,
    tenant: appId,
    options,
    spinner,
    onApiReady
  };
  return <JitsiMeeting {...props} />;
};

export default JaaSMeeting;
