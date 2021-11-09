import { useCallback, useEffect, useRef, useState } from 'react';

import { initExternalApi } from '..';
import { IJitsiMeetingProps } from '../types';
import { generateComponentId } from '../utils';

/**
 * Returns the JitsiMeeting Component with access to a custom External API
 * to be used as-it-is in React projects
 *
 * @param {IJitsiMeetingProps} props the component's props
 * @returns {React.Component} the `JitsiMeeting` Component
 * @example
  ```js
      <JitsiMeeting
        domain='meet.jit.si'
        roomName: 'TestingJitsiMeetingComponent'
        width: '100%'
        height: 500
        spinner={CustomSpinner}
        onApiReady={(externalApi) => console.log(externalApi)}
      />
  ```
 */
const JitsiMeeting = ({
  domain,
  roomName,
  width,
  height,
  configOverwrite,
  interfaceConfigOverwrite,
  jwt,
  onload,
  invitees,
  devices,
  userInfo,
  spinner: Spinner,
  onApiReady,
  getIFrameRef
}: IJitsiMeetingProps) => {
  const [componentId] = useState(generateComponentId('jitsiMeeting'));
  const apiRef = useRef();
  const meetingRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [jitsiClass, setJitsiClass] = useState(null);

  useEffect(() => {
    initExternalApi(domain, (err: Error | null, JitsiClass?: any): void => {
      if (err) {
        /* eslint-disable-next-line */
        console.error(err);
        return;
      }
      setJitsiClass(JitsiClass);
    });
  }, []);

  const loadIFrame = useCallback((JitsiMeetExternalAPI: any) => {
    apiRef.current = new JitsiMeetExternalAPI.fn(domain, {
      roomName,
      width,
      height,
      configOverwrite,
      interfaceConfigOverwrite,
      jwt,
      onload,
      invitees,
      devices,
      userInfo,
      parentNode: meetingRef.current
    });
    setLoading(false);
    if (apiRef.current) {
      onApiReady(apiRef.current);
      (getIFrameRef && meetingRef.current) && getIFrameRef(meetingRef.current);
    }
  }, [
    apiRef,
    meetingRef,
    onApiReady,
    getIFrameRef,
    domain,
    roomName,
    width,
    height,
    configOverwrite,
    interfaceConfigOverwrite,
    jwt,
    onload,
    invitees,
    devices,
    userInfo
  ]);

  useEffect(() => {
    if (jitsiClass && !apiRef.current) {
      loadIFrame(jitsiClass);
    }
  }, [jitsiClass, loadIFrame]);

  const renderLoadingSpinner = useCallback(() => {
    if (!Spinner) {
      return null;
    }
    if (!loading) {
      return null;
    }
    return <Spinner />;
  }, [Spinner]);

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