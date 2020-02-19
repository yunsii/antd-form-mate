import React, { useState } from 'react';
import _merge from 'lodash/merge';
import { Rule } from 'rc-field-form/lib/interface';
import ViewerProps from 'react-viewer/lib/ViewerProps';
import { ComponentType } from '../lib/props';
import {
  uploadByBase64 as defaultUploadByBase64,
  getUrl as defaultGetUrl,
  isUploadOk as defaultIsUploadOk,
  pictureAccept as defaultPictureAccept,
  amapKey as defaultAmapKey,

  setDefaultRules,

  processSetCommonProps,
  defaultViewerProps,
} from '../defaultConfig';
import ConfigContext, { ConfigConsumerProps } from './context';
import { useIntl } from '../intl-context';

export interface ConfigProviderProps {
  setCommonProps?: (type: ComponentType, defaultStyle: any) => any;
  uploadFn?: (file: File, setProgress: (percent: number) => any) => Promise<any>;
  getUrl?: (response: any) => { url: string, thumbUrl?: string };
  isUploadOk?: (response: any) => boolean;
  commonExtra?: { [k in ComponentType]?: any };
  commonRules?: { [k in ComponentType]?: Rule[] };
  pictureAccept?: string;
  amapKey?: string;
  viewerProps?: ViewerProps;
}

function initConfig(props: ConfigProviderProps) {
  const intl = useIntl();
  const {
    setCommonProps,
    uploadFn,
    getUrl,
    isUploadOk,
    commonExtra,
    commonRules,
    pictureAccept,
    amapKey,
    viewerProps,
  } = props;

  const config: ConfigConsumerProps = {
    setCommonProps: processSetCommonProps(setCommonProps),
    uploadFn: uploadFn || defaultUploadByBase64,
    getUrl: getUrl || defaultGetUrl,
    isUploadOk: isUploadOk || defaultIsUploadOk,
    commonExtra: {
      ...commonExtra,
    },
    commonRules: {
      ...setDefaultRules(intl),
      ...commonRules,
    },
    pictureAccept: pictureAccept || defaultPictureAccept,
    amapKey: amapKey || defaultAmapKey,
    viewerProps: {
      ...defaultViewerProps,
      ...viewerProps,
    },
  }

  return config;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const { children } = props;

  const [config] = useState(initConfig(props));

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}
