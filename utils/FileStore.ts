import { observable, action } from 'mobx';

class FileStore {
  @observable file: File | undefined = undefined;

  constructor(data: { file?: File }) {
    this.file = data.file;
  }

  @action setFile(file: File) {
    this.file = file;
  }
}

export default FileStore;
