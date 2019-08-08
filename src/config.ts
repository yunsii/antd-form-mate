export let commenStyle = { width: "100%" };
export function setCommenStyle(options) {
  commenStyle = {
    ...commenStyle,
    ...options,
  }
}

export let commenProps = {};
export function setCommenProps(options) {
  commenProps = {
    ...commenProps,
    ...options,
  }
}

export let uploadFile;
export let getUrl = response => {
  const { data } = response;
  return {
    url: data.path,
  }
};
export let isUploadSuccess = response => {
  const { data } = response;
  return data;
};

export type UploadConfig = {
  uploadFile: (file: any) => void;
  isUploadSuccess: (response: any) => void;
  getUrl: (response: any) => { url: string, [k: string]: any };
}
export function uploadConfig(options: UploadConfig) {
  if (options.uploadFile !== undefined) {
    uploadFile = options.uploadFile;
  }
  if (options.getUrl !== undefined) {
    getUrl = options.getUrl;
  }
  if (options.isUploadSuccess !== undefined) {
    isUploadSuccess = options.isUploadSuccess;
  }
}

export let imageFormatLimit = '.jpg,.jpeg,.bmp,.png,.gif';

export type PictureConfig = {
  imageFormatLimit?: string,
}
export function pictureConfig(options: PictureConfig) {
  if (options.imageFormatLimit !== undefined) {
    imageFormatLimit = options.imageFormatLimit;
  }
}
