import { useEffect, useRef, useState } from "react";
import { init } from "..";
import { IJitsiMeetingProps } from "../types";
import { getRoomName } from "../utils";

/**
 * Returns the JitsiMeeting Component with access to a custom External API
 * to be used as-it-is in React projects
 *
 * @param {IJitsiMeetingProps} props
 * @example
  ```js
      <JitsiMeeting
        id="testId"
        domain="meet.jit.si"
        options={{
          roomName: 'TestingJitsiMeetingComponent'
          width: '100%'
          height: '500px'
        }}
        spinner={() => <>loading jitsi meeting...</>}
        onApiReady={(externalApi) => console.log(externalApi)}
      />
  ```
 */
const JitsiMeeting = ({
  id,
  domain,
  options,
  tenant,
  spinner,
  onApiReady
}: IJitsiMeetingProps) => {
  const componentId = `${id}-jitsiMeeting`;
  const apiRef = useRef<any>();
  const meetingRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [jitsiClass, setJitsiClass] = useState(null);

  useEffect(() => {
    init(domain, (err: Error|null, JitsiClass?: any): void => {
      if (err) {
        /* eslint-disable-next-line */
        console.error(err);
        return;
      }
      setJitsiClass(JitsiClass);
    });
  }, []);

  useEffect(() => {
    if (jitsiClass) {
      loadIFrame(jitsiClass);
    }
  }, [jitsiClass]);


  const loadIFrame = (JitsiMeetExternalAPI: any) => {
    apiRef.current = new JitsiMeetExternalAPI.fn(domain, {
      ...options,
      roomName: getRoomName(tenant, options.roomName),
      parentNode: meetingRef.current
    });
    setLoading(false);
    onApiReady(apiRef.current);
  };

  const renderLoadingSpinner = () => {
    if (!spinner) {
      return null;
    }
    if (!loading) {
      return null;
    }
    return spinner();
  };

  return (
    <>
      {renderLoadingSpinner()}
      <div
        id={componentId}
        key={componentId}
        ref={meetingRef}
      />
    </>
  );
};

export default JitsiMeeting;