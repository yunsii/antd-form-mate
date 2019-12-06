import React from 'react';
import _isFunction from 'lodash/isFunction';
import { ComponentType } from './lib/props';

export interface SetLocal {
  picturesWall?: {
    upload?: string;
  };
  dragger?: {
    upload?: string;
  };
  map?: {
    currentAddress?: string;
    addressPickPlaceholder?: string;
    addressInputPlaceholder?: string;
  };
}

export interface ConfigContextProps {
  setCommenProps?: (type: ComponentType) => any;
  uploadFn?: (file: File, setProgress: (percent: number) => any) => Promise<any>;
  getUrl?: (response: any) => { url: string, thumbUrl?: string };
  isUploadOk?: (response: any) => boolean;
  commenExtra?: { [k in ComponentType]?: any };
  commenRules?: { [k in ComponentType]?: any[] };
  pictureFormatLimit?: string;
  amapKey?: string;
  setLocal?: SetLocal;
}

export const ConfigContext = React.createContext<ConfigContextProps>({})
export default ConfigContext;

export const ConfigProvider = ConfigContext.Provider;

ConfigContext.displayName = 'antd-form-mate\'s ConfigContext';
