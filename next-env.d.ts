/* eslint-disable spaced-comment */
/// <reference types="next" />
/// <reference types="next/types/global" />
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.mp3' {
  const src: string;
  export default src;
}
declare module 'react-keyboard-event-handler';
declare module 'node-blob';
