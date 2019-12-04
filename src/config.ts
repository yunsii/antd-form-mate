import { ComponentType } from './lib/props';
import { getBase64 } from './utils';

export const commenStyle = { width: "100%" };

export let commenProps: any = (type: ComponentType) => ({ style: type !== 'switch' ? commenStyle : {} });
export function setCommenProps(setProps: (type: ComponentType) => any) {
  const defaultCommenProps = commenProps();

  commenProps = (type: ComponentType, defaultStyle: any) => {
    const { style = {}, ...rest } = setProps(type) || {};
    // console.log(type, rest);
    return {
      ...defaultCommenProps,
      ...rest,
      style: {
        ...defaultStyle,
        ...(type !== 'switch' ? commenStyle : {}),
        ...style,
      },
    };
  }
}

export let uploadFile = async (file, onProgress?: { percent: number }) => {
  const dataUrl = await getBase64(file);
  return {
    data: {
      url: dataUrl,
      thumbUrl: dataUrl,
    }
  };
};
export let getUrl = (response: any = {}) => {
  const { data } = response;
  return data;
};
export let isUploadSuccess = (response = {} as any) => {
  const { data } = response;
  return !!data;
};

export type UploadConfig = {
  uploadFile?: (file: any, onProgress?: ({ percent: number })) => any;
  isUploadSuccess?: (response: any) => boolean;
  getUrl?: (response: any) => { url: string, thumbUrl?: string };
}
export function setUploadConfig(options: UploadConfig) {
  if (options.uploadFile !== undefined) {
    uploadFile = options.uploadFile;
  }
  if (options.isUploadSuccess !== undefined) {
    isUploadSuccess = options.isUploadSuccess;
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
