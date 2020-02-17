import React from 'react';
import _merge from 'lodash/merge';
import ViewerProps from 'react-viewer/lib/ViewerProps';
import { ComponentType } from '../lib/props';
import {
  uploadByBase64 as defaultUploadByBase64,
  getUrl as defaultGetUrl,
  isUploadOk as defaultIsUploadOk,
  pictureAccept as defaultPictureAccept,
  amapKey as defaultAmapKey,
  defaultExtra,
  defaultRules,

  processSetCommonProps,
  defaultViewerProps,
} from '../defaultConfig';
import ConfigContext, { ConfigConsumerProps } from './context';

export interface ConfigProviderProps {
  setCommonProps?: (type: ComponentType, defaultStyle: any) => any;
  uploadFn?: (file: File, setProgress: (percent: number) => any) => Promise<any>;
  getUrl?: (response: any) => { url: string, thumbUrl?: string };
  isUploadOk?: (response: any) => boolean;
  commonExtra?: { [k in ComponentType]?: any };
  commonRules?: { [k in ComponentType]?: any[] };
  pictureAccept?: string;
  amapKey?: string;
  viewerProps?: ViewerProps;
}

function initState(props: ConfigProviderProps) {
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
      ...defaultExtra,
      ...commonExtra,
    },
    commonRules: {
      ...defaultRules,
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

export class ConfigProvider extends React.Component<ConfigProviderProps> {

  state = initState(this.props);

  render() {
    const { children } = this.props;
    return (
      <ConfigContext.Provider value={this.state}>
        {children}
      </ConfigContext.Provider>
    );
  }
}
