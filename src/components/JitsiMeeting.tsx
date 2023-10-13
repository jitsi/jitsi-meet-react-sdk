import {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';

import { DEFAULT_DOMAIN } from '../constants';
import { fetchExternalApi } from '../init';
import { IJitsiMeetExternalApi, IJitsiMeetingProps, JitsiMeetExternalApi } from '../types';
import { generateComponentId, getAppId } from '../utils';

/**
 * Returns the JitsiMeeting Component with access to a custom External API
 * to be used as-it-is in React projects
 *
 * @param {IJitsiMeetingProps} props the component's props
 * @returns {ReactElement} the `JitsiMeeting` Component
 * @example
  ```js
    <JitsiMeeting
        domain='meet.jit.si'
        roomName: 'TestingJitsiMeetingComponent'
        spinner={CustomSpinner}
        onApiReady={(externalApi) => console.log(externalApi)}
    />
  ```
 */
const JitsiMeeting = ({
    domain = DEFAULT_DOMAIN,
    roomName,
    configOverwrite,
    interfaceConfigOverwrite,
    jwt,
    invitees,
    devices,
    userInfo,
    release,
    lang,
    spinner: Spinner,
    onApiReady,
    onReadyToClose,
    getIFrameRef
}: IJitsiMeetingProps): ReactElement => {
    const [ loading, setLoading ] = useState(true);
    const [ apiLoaded, setApiLoaded ] = useState(false);
    const externalApi = useRef<JitsiMeetExternalApi>();
    const apiRef = useRef<IJitsiMeetExternalApi>();
    const meetingRef = useRef<HTMLDivElement>(null);
    const componentId = useMemo(() =>
        generateComponentId('jitsiMeeting')
    , [ generateComponentId ]);

    useEffect(() => {
        fetchExternalApi(domain, release, getAppId(roomName))
            .then((api: JitsiMeetExternalApi) => {
                externalApi.current = api;
                setApiLoaded(true);
            })
            .catch((e: Error) => console.error(e.message));
    }, []);

    const loadIFrame = useCallback((JitsiMeetExternalAPI: JitsiMeetExternalApi) => {
        apiRef.current = new JitsiMeetExternalAPI(domain, {
            roomName,
            configOverwrite,
            interfaceConfigOverwrite,
            jwt,
            invitees,
            devices,
            userInfo,
            release,
            lang,
            parentNode: meetingRef.current
        });
        setLoading(false);
        if (apiRef.current) {
            typeof onApiReady === 'function' && onApiReady(apiRef.current);
            apiRef.current.on('readyToClose', () => {
                typeof onReadyToClose === 'function' && onReadyToClose();
            });
            if (meetingRef.current && typeof getIFrameRef === 'function') {
                getIFrameRef(meetingRef.current);
            }
        }
    }, [
        apiRef,
        meetingRef,
        onApiReady,
        onReadyToClose,
        getIFrameRef,
        domain,
        roomName,
        configOverwrite,
        interfaceConfigOverwrite,
        jwt,
        invitees,
        devices,
        userInfo,
        release,
        lang
    ]);

    useEffect(() => {
        if (apiLoaded && !apiRef.current) {
            if (externalApi.current) {
                loadIFrame(externalApi.current);
            }
        }
    }, [ apiLoaded, loadIFrame ]);

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
