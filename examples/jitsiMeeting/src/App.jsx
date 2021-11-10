import { JitsiMeeting, JaaSMeeting } from '@jitsi/web-sdk';
import React, { useRef, useState } from 'react';


const App = () => {
    const apiRef = useRef();
    const apiRefNew = useRef();
    const [ logItems, updateLog ] = useState([]);
    const [ showNew, toggleShowNew ] = useState(false);
    const [ knockingParticipants, updateKnockingParticipants ] = useState([]);

    const printEventOutput = payload => {
        updateLog(items => [ ...items, JSON.stringify(payload) ]);
    };

    const handleAudioStatusChange = (payload, feature) => {
        if (payload.muted) {
            updateLog(items => [ ...items, `${feature} off` ])
        } else {
            updateLog(items => [ ...items, `${feature} on` ])
        }
    };

    const handleChatUpdates = (payload, ref) => {
        if (payload.isOpen || !payload.unreadCount) {
            return;
        }
        ref.current.executeCommand('toggleChat');
        updateLog(items => [ ...items, `you have ${payload.unreadCount} unread messages` ])
    };

    const handleKnockingParticipant = payload => {
        updateLog(items => [ ...items, JSON.stringify(payload) ]);
        updateKnockingParticipants(participants => [ ...participants, payload?.participant ])
    };

    const resolveKnockingParticipants = (ref, condition) => {
        knockingParticipants.forEach(participant => {
            ref.current.executeCommand('answerKnockingParticipant', participant?.id, condition(participant));
            updateKnockingParticipants(participants => participants.filter(item => item.id === participant.id));
        });
    };

    const handleJitsiIFrameRef = iframeRef => {
        iframeRef.style.border = '10px solid cadetblue';
        iframeRef.style.background = 'cadetblue';
    };

    const handleJaasIFrameRef = iframeRef => {
        iframeRef.style.marginTop = '10px';
        iframeRef.style.border = '10px dashed tomato';
        iframeRef.style.padding = '5px';
    };

    const handleApiReady = (apiObj, ref) => {
        ref.current = apiObj;
        ref.current.addEventListeners({
            // Listening to events from the external API
            audioMuteStatusChanged: payload => handleAudioStatusChange(payload, 'audio'),
            videoMuteStatusChanged: payload => handleAudioStatusChange(payload, 'video'),
            raiseHandUpdated: printEventOutput,
            tileViewChanged: printEventOutput,
            chatUpdated: payload => handleChatUpdates(payload, ref),
            knockingParticipant: handleKnockingParticipant
        });
    };

    // Multiple instances demo
    const renderNewComp = () => {
        if (!showNew) {
            return null;
        }

        return (
            <JitsiMeeting
                domain='meet.jit.si'
                roomName='JitsiMeetingComponentDemo'
                width='100%'
                height='400px'
                onApiReady={externalApi => handleApiReady(externalApi, apiRefNew)}
            />
        );
    };

    const renderButtons = () => (
        <div style={{ margin: '15px 0' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <button
                    type='text'
                    title="Click to execute toggle raise hand command"
                    style={{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#ff9b42',
                        color: 'white',
                        padding: '12px 46px',
                        margin: '2px 2px'
                    }}
                    onClick={() => apiRef.current.executeCommand('toggleRaiseHand')}
                >Raise hand</button>
                <button
                    type='text'
                    title="Click to approve/reject knocking participant"
                    style={{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#0376da',
                        color: 'white',
                        padding: '12px 46px',
                        margin: '2px 2px'
                    }}
                    onClick={() => resolveKnockingParticipants(apiRef, ({ name }) => !name.includes('test'))}
                >Resolve lobby</button>
                <button
                    type='text'
                    style={{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#a7a7a7',
                        color: 'white',
                        padding: '12px 46px',
                        margin: '2px 2px'
                    }}
                    onClick={() => toggleShowNew(!showNew)}
                >Toggle new instance</button>
            </div>
        </div>
    );

    const renderLog = () => logItems.map(
        (item, index) => (
            <div style={{
                fontFamily: 'monospace',
                padding: '5px'
            }} key={index}>{item}</div>
        )
    );

    const renderSpinner = () => (
        <div style={{
            fontFamily: 'sans-serif',
            textAlign: 'center'
        }}>Loading..</div>
    );


    return (
        <>
            <h1 style={{
                fontFamily: 'sans-serif',
                textAlign: 'center'
            }}>JitsiMeeting Demo App</h1>
            <JitsiMeeting
                domain="meet.jit.si"
                roomName='JitsiMeetingComponentDemo'
                width='100%'
                height='400px'
                spinner={renderSpinner}
                onApiReady={externalApi => handleApiReady(externalApi, apiRef)}
                getIFrameRef={handleJitsiIFrameRef}
            />
            <JaaSMeeting
                appId="test"
                roomName='JaaSMeetingComponentDemo'
                width='100%'
                height='400px'
                spinner={renderSpinner}
                onApiReady={externalApi => handleApiReady(externalApi, apiRef)}
                getIFrameRef={handleJaasIFrameRef}
            />
            {renderButtons()}
            {renderNewComp()}
            {renderLog()}
        </>
    );
};

export default App;
