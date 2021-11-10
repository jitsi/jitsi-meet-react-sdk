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
    const [ componentId, setComponentId ] = useState<string>('');
    const [ loading, setLoading ] = useState(true);
    const [ externalApi, setExternalApi ] = useState(null);
    const apiRef = useRef();
    const meetingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setComponentId(generateComponentId('jitsiMeeting'));
        initExternalApi(domain, (err: Error | null, api?: any): void => {
            if (err) {
                /* eslint-disable-next-line */
                console.error(err);

                return;
            }
            setExternalApi(api);
        });
    }, []);

    const loadIFrame = useCallback((result: any) => {
        apiRef.current = new result.JitsiMeetExternalApi(domain, {
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
        if (externalApi && !apiRef.current) {
            loadIFrame(externalApi);
        }
    }, [ externalApi, loadIFrame ]);

    const renderLoadingSpinner = useCallback(() => {
        if (!Spinner) {
            return null;
        }
        if (!loading || apiRef.current) {
            return null;
        }

        return <Spinner />;
    }, [ Spinner, apiRef.current ]);

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
