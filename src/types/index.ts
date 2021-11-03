declare global {
  interface Window {
    JitsiMeetExternalAPI: () => object;
  }
}

export { default as IJitsiMeetingOptions } from "./IJitsiMeetingOptions";
export { default as IJitsiMeetingProps } from "./IJitsimeetingProps";
export { default as IJaaSMeetingProps } from "./IJaaSMeetingProps";
