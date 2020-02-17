import React from 'react';
import { ComponentType } from '../lib/props';
import ViewerProps from 'react-viewer/lib/ViewerProps';
import {
  uploadByBase64,
  getUrl,
  isUploadOk,
  pictureAccept,
  amapKey,

  defaultExtra,
  defaultRules,

  processSetCommonProps,
  defaultViewerProps,
} from '../defaultConfig';

export interface ConfigConsumerProps {
  setCommonProps: (type: ComponentType, defaultStyle: any) => any;
  uploadFn: (file: File, setProgress: (percent: number) => any) => Promise<any>;
  getUrl: (response: any) => { url: string, thumbUrl?: string };
  isUploadOk: (response: any) => boolean;
  commonExtra: { [k in ComponentType]?: any };
  commonRules: { [k in ComponentType]?: any[] };
  pictureAccept: string;
  amapKey: string;
  viewerProps: ViewerProps;
}

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  setCommonProps: processSetCommonProps(),
  uploadFn: uploadByBase64,
  getUrl,
  isUploadOk,
  commonExtra: defaultExtra,
  commonRules: defaultRules,
  pictureAccept,
  amapKey,
  viewerProps: defaultViewerProps,
});

ConfigContext.displayName = 'antd-form-mate\'s ConfigContext';

export default ConfigContext;
