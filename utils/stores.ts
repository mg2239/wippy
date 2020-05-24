import { useStaticRendering } from 'mobx-react';

import FileStore from './FileStore';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let store: { fileStore: FileStore; } | null = null;

export default function initializeStore(data = { fileStore: {} }) {
  if (isServer) {
    return {
      fileStore: new FileStore(data.fileStore),
    };
  }
  if (store === null) {
    store = {
      fileStore: new FileStore(data.fileStore),
    };
  }

  return store;
}
