/// <reference types="react-scripts" />

declare module "@mono.co/connect.js" {
  interface Config {
    onClose?: () => void;
    onLoad?: () => void;
    onSuccess: (payload: { code: string }) => void;
    key: string;
  }

  class MonoInstance {
    constructor(config: Config);
    open: () => void;
    setup: () => void;
  }

  export = MonoInstance;
}
