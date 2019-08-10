import { getBase64 } from './utils';

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

export let directUpload = true;
export let uploadFile = async (file) => {
  const dataUrl = await getBase64(file);
  return {
    data: {
      path: dataUrl,
    }
  };
};
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
  uploadFile: (file: any) => any;
  isUploadSuccess: (response: any) => void;
  getUrl: (response: any) => { url: string, [k: string]: any };
  directUpload?: boolean;
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
  if (options.directUpload !== undefined) {
    directUpload = options.directUpload;
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
