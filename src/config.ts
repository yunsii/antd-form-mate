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

export let uploadFile = async (file) => {
  const dataUrl = await getBase64(file);
  return {
    data: {
      url: dataUrl,
      thumbUrl: dataUrl,
    }
  };
};
export let isUploadSuccess = (response = {} as any) => {
  const { data } = response;
  return !!data;
};

export type UploadConfig = {
  uploadFile?: (file: any) => any;
  isUploadSuccess?: (response: any) => boolean;
}
export function setUploadConfig(options: UploadConfig) {
  if (options.uploadFile !== undefined) {
    uploadFile = options.uploadFile;
  }
  if (options.isUploadSuccess !== undefined) {
    isUploadSuccess = options.isUploadSuccess;
  }
}

export let imageFormatLimit = '.jpg,.jpeg,.bmp,.png,.gif';

export type PictureConfig = {
  imageFormatLimit?: string,
}
export function setPictureConfig(options: PictureConfig) {
  if (options.imageFormatLimit !== undefined) {
    imageFormatLimit = options.imageFormatLimit;
  }
}
