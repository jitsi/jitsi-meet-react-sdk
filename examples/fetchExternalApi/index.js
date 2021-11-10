import { fetchExternalApi } from '@jitsi/web-sdk';

window.onload = () => {
    fetchExternalApi('meet.jit.si').then(externalApi => {
        const api = new externalApi.Fn('meet.jit.si', {
            roomName: 'ExternalAPIInitModuleDemo',
            height: 700,
            parentNode: document.getElementById('jitsi-meeting-container')
        });
    });
};
