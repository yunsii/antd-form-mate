import React from 'react';
import _merge from 'lodash/merge';
import ViewerProps from 'react-viewer/lib/ViewerProps';
import { ComponentType } from '../lib/props';
import {
  uploadByBase64 as defaultUploadByBase64,
  getUrl as defaultGetUrl,
  isUploadOk as defaultIsUploadOk,
  pictureFormateLimit as defaultPictureFormateLimit,
  amapKey as defaultAmapKey,

  defaultExtra,
  defaultRules,

  processSetCommenProps,
  defaultViewerProps,
} from '../defaultConfig';
import ConfigContext, { ConfigConsumerProps } from './context';

export interface ConfigProviderProps {
  setCommenProps?: (type: ComponentType, defaultStyle: any) => any;
  uploadFn?: (file: File, setProgress: (percent: number) => any) => Promise<any>;
  getUrl?: (response: any) => { url: string, thumbUrl?: string };
  isUploadOk?: (response: any) => boolean;
  commenExtra?: { [k in ComponentType]?: any };
  commenRules?: { [k in ComponentType]?: any[] };
  pictureFormateLimit?: string;
  amapKey?: string;
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
    viewerProps,
  } = props;

  const config: ConfigConsumerProps = {
    setCommenProps: processSetCommenProps(setCommenProps),
    uploadFn: uploadFn || defaultUploadByBase64,
    getUrl: getUrl || defaultGetUrl,
    isUploadOk: isUploadOk || defaultIsUploadOk,
    commenExtra: {
      ...defaultExtra,
      ...commenExtra,
    },
    commenRules: {
      ...defaultRules,
      ...commenRules,
    },
    pictureFormateLimit: pictureFormateLimit || defaultPictureFormateLimit,
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
