import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

type SerializedStore = {
  mp3: File,
};

export class FileStore {
  @observable mp3: File | undefined;

  hydrate(store: SerializedStore) {
    this.mp3 = store.mp3 != null ? store.mp3 : undefined;
  }

  setFile(file: File) {
    this.mp3 = file;
  }
}

export function initializeStore() {
  return {
    fileStore: new FileStore(),
  };
}
