import { fetchExternalApi } from '@jitsi/web-sdk';

window.onload = () => {
    fetchExternalApi('meet.jit.si').then(result => {
        const api = new result.JitsiMeetExternalApi('meet.jit.si', {
            roomName: 'ExternalAPIInitModuleDemo',
            height: 700,
            parentNode: document.getElementById('jitsi-meeting-container')
        });
    });
};
