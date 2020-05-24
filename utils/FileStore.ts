import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

type SerializedStore = {
  file: File,
};

export class FileStore {
  @observable file: File | undefined;

  hydrate(store: SerializedStore) {
    this.file = store.file != null ? store.file : undefined;
  }

  setFile(file: File) {
    this.file = file;
  }
}

export function initializeStore() {
  return {
    fileStore: new FileStore(),
  };
}
