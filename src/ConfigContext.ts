import React from 'react';
import _isFunction from 'lodash/isFunction';
import { ComponentType } from './lib/props';

export interface ConfigContextProps {
  setCommenProps?: (type: ComponentType) => any;
  commenExtra?: { [k in ComponentType]?: any };
  commenRules?: { [k in ComponentType]?: any[] };
  uploadFn?: (file: File, setProgress: (percent: number) => any) => Promise<any>;
  getUrl?: (response: any) => { url: string, thumbUrl?: string };
  isUploadOk?: (response: any) => boolean;
  pictureFormatLimit?: string;
  amapKey?: string;
}

export const ConfigContext = React.createContext<ConfigContextProps>({})
export default ConfigContext;

export const ConfigProvider = ConfigContext.Provider;

ConfigContext.displayName = 'antd-form-mate\'s ConfigContext';
