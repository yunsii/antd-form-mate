import React from 'react';
import { ComponentType } from '../lib/props';
import {
  uploadByBase64Default,
  getUrlDefault,
  isUploadOkDefault,
  pictureFormateLimitDefault,
  amapKeyDefault,

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
  pictureFormatLimit: string;
  amapKey: string;
  afmLocale: typeof defaultLocal;
}

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  setCommenProps: processSetCommenProps(),
  uploadFn: uploadByBase64Default,
  getUrl: getUrlDefault,
  isUploadOk: isUploadOkDefault,
  commenExtra: defaultExtra,
  commenRules: defaultRules,
  pictureFormatLimit: pictureFormateLimitDefault,
  amapKey: amapKeyDefault,
  afmLocale: defaultLocal,
});

ConfigContext.displayName = 'antd-form-mate\'s ConfigContext';

export default ConfigContext;
