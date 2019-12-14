import React from 'react';
import _merge from 'lodash/merge';
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
  pictureFormatLimit?: string;
  amapKey?: string;
  afmLocale?: AFMLocaleProps;
}

export class ConfigProvider extends React.Component<ConfigProviderProps> {
  renderProvider = () => {
    const {
      setCommenProps,
      uploadFn,
      getUrl,
      isUploadOk,
      commenExtra,
      commenRules,
      pictureFormatLimit,
      amapKey,
      afmLocale,

      children,
    } = this.props;

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
      pictureFormatLimit: pictureFormatLimit || pictureFormateLimitDefault,
      amapKey: amapKey || amapKeyDefault,
      afmLocale: _merge(defaultLocale, afmLocale),
    }

    return (
      <ConfigContext.Provider value={config}>
        {children}
      </ConfigContext.Provider>
    )
  }

  render() {
    return this.renderProvider();
  }
}
