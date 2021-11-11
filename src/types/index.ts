import { JitsiMeetExternalApi } from './JitsiMeetExternalApi';
declare global {
    interface Window {
        JitsiMeetExternalAPI: JitsiMeetExternalApi;
    }
}

export { JitsiMeetExternalApi } from './JitsiMeetExternalApi';
export { default as IJitsiMeetingProps } from './IJitsiMeetingProps';
export { default as IJaaSMeetingProps } from './IJaaSMeetingProps';
export { default as IJitsiMeetExternalApi } from './IJitsiMeetExternalApi';

