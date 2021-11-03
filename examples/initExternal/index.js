import { initExternal } from "jitsi-meet-web-sdk";

initExternal('meet.jit.si').then((externalApi) => {
  console.log(externalApi);
});