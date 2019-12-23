import React from 'react';
import _merge from 'lodash/merge';
import ViewerProps from 'react-viewer/lib/ViewerProps';
import { ComponentType } from '../lib/props';
import {
  uploadByBase64 as uploadByBase64Default,
  getUrl as getUrlDefault,
  isUploadOk as isUploadOkDefault,
  pictureFormateLimit as pictureFormateLimitDefault,
  amapKey as amapKeyDefault,

  defaultExtra,
  defaultRules,

  processSetCommenProps,
  defaultViewerProps,
} from '../defaultConfig';
import defaultLocale from '../defaultLocale';
import ConfigContext, { ConfigConsumerProps } from './context';

export interface AFMLocaleProps {
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

export interface ConfigProviderProps {
  setCommenProps?: (type: ComponentType, defaultStyle: any) => any;
  uploadFn?: (file: File, setProgress: (percent: number) => any) => Promise<any>;
  getUrl?: (response: any) => { url: string, thumbUrl?: string };
  isUploadOk?: (response: any) => boolean;
  commenExtra?: { [k in ComponentType]?: any };
  commenRules?: { [k in ComponentType]?: any[] };
  pictureFormateLimit?: string;
  amapKey?: string;
  afmLocale?: AFMLocaleProps;
  viewerProps?: ViewerProps;
}

function initState(props: ConfigProviderProps) {
  const {
    setCommenProps,
    uploadFn,
    getUrl,
    isUploadOk,
    commenExtra,
    commenRules,
    pictureFormateLimit,
    amapKey,
    afmLocale,
    viewerProps,
  } = props;

  const config: ConfigConsumerProps = {
    setCommenProps: processSetCommenProps(setCommenProps),
    uploadFn: uploadFn || uploadByBase64Default,
    getUrl: getUrl || getUrlDefault,
    isUploadOk: isUploadOk || isUploadOkDefault,
    commenExtra: {
      ...defaultExtra,
      ...commenExtra,
    },
    commenRules: {
      ...defaultRules,
      ...commenRules,
    },
    pictureFormateLimit: pictureFormateLimit || pictureFormateLimitDefault,
    amapKey: amapKey || amapKeyDefault,
    afmLocale: _merge(defaultLocale, afmLocale),
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
