import React from 'react';
import _isFunction from 'lodash/isFunction';
import { ComponentType } from './lib/props';
import { getBase64 } from './utils';

const commenStyle = { width: "100%" };
const setDefaultCommenStyle = (type: ComponentType) => {
  return type !== 'switch' ? commenStyle : {}
};
const setDefaultCommenProps = (type: ComponentType) => {
  return {
    style: setDefaultCommenStyle(type),
  }
};

export function processSetCommenProps(setCommenProps: (type: ComponentType) => any = () => ({})) {
  if (!_isFunction(setCommenProps)) {
    throw new Error('setCommenProps is not a function.');
  }

  return (type: ComponentType, defaultStyle: any) => {
    const defaultCommenProps = setDefaultCommenProps(type);
    const { style = {}, ...rest } = setCommenProps(type) || {};
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

async function uploadFn(file: File) {
  const dataUrl = await getBase64(file);
  return {
    data: {
      url: dataUrl,
      thumbUrl: dataUrl,
    }
  };
}

function getUrl(response: any = {}) {
  const { data } = response;
  return data;
}

function isUploadOk(response: any = {}) {
  const { data } = response;
  return !!data;
}

export const defaultExtra = {
  picture: "请上传图片",
}

export interface ConfigProviderProps {
  setCommenProps?: (type: ComponentType) => any;
  commenExtra?: { [k in ComponentType]?: any };
  uploadFn?: (file: any, onProgress?: { percent: number; }) => Promise<{ data: { url: string; thumbUrl: string; } }>;
  getUrl?: (response: any) => boolean;
  isUploadOk?: (response: any) => boolean;
  imageFormatLimit?: string;
  amapKey?: string;
}

export const ConfigContext = React.createContext<ConfigProviderProps>({
  setCommenProps: setDefaultCommenProps,
  uploadFn,
  getUrl,
  isUploadOk,
  imageFormatLimit: '.jpg,.jpeg,.bmp,.png,.gif',
  amapKey: '1460ee2529622747f8faacac3e860bd6',
})

export const ConfigProvider = ConfigContext.Provider;

ConfigContext.displayName = 'antd-form-mate\'s ConfigContext';
