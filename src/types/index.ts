import { default as IJitsiMeetExternalApi } from './IJitsiMeetExternalApi';
declare global {
    interface Window {
        JitsiMeetExternalAPI: IJitsiMeetExternalApi;
    }
}

export { default as IJitsiMeetingProps } from './IJitsiMeetingProps';
export { default as IJaaSMeetingProps } from './IJaaSMeetingProps';
export { default as IJitsiMeetExternalApi } from './IJitsiMeetExternalApi';

