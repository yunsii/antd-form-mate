import React from 'react';
import { ComponentType } from '../lib/props';
import {
  uploadByBase64,
  getUrl,
  isUploadOk,
  pictureFormateLimit,
  amapKey,

  defaultExtra,
  defaultRules,

  processSetCommenProps,
} from '../defaultConfig';
import defaultLocal from '../defaultLocale';

export interface ConfigConsumerProps {
  setCommenProps: (type: ComponentType, defaultStyle: any) => any;
  uploadFn: (file: File, setProgress: (percent: number) => any) => Promise<any>;
  getUrl: (response: any) => { url: string, thumbUrl?: string };
  isUploadOk: (response: any) => boolean;
  commenExtra: { [k in ComponentType]?: any };
  commenRules: { [k in ComponentType]?: any[] };
  pictureFormateLimit: string;
  amapKey: string;
  afmLocale: typeof defaultLocal;
}

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  setCommenProps: processSetCommenProps(),
  uploadFn: uploadByBase64,
  getUrl,
  isUploadOk,
  commenExtra: defaultExtra,
  commenRules: defaultRules,
  pictureFormateLimit,
  amapKey,
  afmLocale: defaultLocal,
});

ConfigContext.displayName = 'antd-form-mate\'s ConfigContext';

export default ConfigContext;
