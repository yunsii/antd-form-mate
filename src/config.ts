import _isFunction from 'lodash/isFunction';
import { getBase64 } from './utils';

export const useBase64 = async (file) => {
  const dataUrl = await getBase64(file);
  return {
    data: {
      url: dataUrl,
      thumbUrl: dataUrl,
    }
  };
};
export let uploadFn: (file: any, onProgress?: { percent: number; }) => Promise<{ data: { url: string; thumbUrl: string; } }>;
export let getUrl = (response: any = {}) => {
  const { data } = response;
  return data;
};
export let isUploadOk = (response = {} as any) => {
  const { data } = response;
  return !!data;
};

export type UploadConfig = {
  uploadFn?: (file: any, onProgress?: ({ percent: number })) => any;
  isUploadOk?: (response: any) => boolean;
  getUrl?: (response: any) => { url: string, thumbUrl?: string };
}
export function setUploadConfig(options: UploadConfig) {
  if (options.uploadFn !== undefined) {
    uploadFn = options.uploadFn;
  }
  if (options.isUploadOk !== undefined) {
    isUploadOk = options.isUploadOk;
  }
  if (options.getUrl !== undefined) {
    getUrl = options.getUrl;
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

export let mapConfig = {
  amapKey: '1460ee2529622747f8faacac3e860bd6',
};

export type mapConfig = {
  amapKey?: string,
}
export function setMapConfig(options: mapConfig) {
  if (options.amapKey !== undefined) {
    mapConfig.amapKey = options.amapKey;
  }
}
