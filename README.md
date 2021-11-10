# Jitsi Meet Web SDK
The Jitsi Meet Web SDK provides the same user experience as the [Jitsi Meet](https://github.com/jitsi/jitsi-meet) app, in a customizable way which you can embed in your apps.

## Install
```bash
npm install @jitsi/web-sdk
```
### Modules
#### fetchExternalApi
To import the Jitsi Meet External API in a non-React project:
```js
window.onload = () => {
    fetchExternalApi().then(JitsiMeetExternalApi => {
        const api = new JitsiMeetExternalApi("YOUR_DOMAIN", { roomName: "YOUR_CUSTOM_ROOM_NAME" });
    });
}
```
#### JitsiMeeting
To be used with custom domains as-it-is in React projects:
```js
<JitsiMeeting
  id="testingJitsiMeetingInstance"
  domain="YOUR_DOMAIN"
/>
```
#### JaaSMeeting
To be used with `8x8.vc` domain as-it-is in React projects:
```js
<JaaSMeeting
  id="testingJaaSMeetingInstance"
  appId="testing"
/>
```

## Samples
Install and run the projects from the `examples` directory to see the modules in action.
