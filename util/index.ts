export const getFileParts = (file: File) => {
  const sepIndex = file.name.lastIndexOf('.');
  const fileName = file.name.slice(0, sepIndex);
  const fileType = file.name.slice(sepIndex + 1);
  return { fileName, fileType };
};
