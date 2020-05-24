import { observable, action } from 'mobx';

class FileStore {
  @observable file: File | undefined = undefined;

  constructor(initialData: { file?: File }) {
    this.file = initialData.file;
  }

  @action setFile(file: File) {
    this.file = file;
  }
}

export default FileStore;
