import React, { useState } from 'react';
import _merge from 'lodash/merge';
import { Rule } from 'rc-field-form/lib/interface';
import ViewerProps from 'react-viewer/lib/ViewerProps';
import { ComponentType } from '../../interfaces';
import {
  uploadByBase64 as defaultUploadByBase64,
  pictureAccept as defaultPictureAccept,
  setDefaultRules,
  processSetCommonProps,
  defaultViewerProps,
} from '../../defaultConfig';
import ConfigContext, { ConfigConsumerProps } from './context';
import { useIntl } from '../Intlcontext';

export interface ConfigProviderProps {
  setCommonProps?: (type: ComponentType, defaultStyle: any) => any;
  /** 默认统一使用 base64 编码预览，如果配置则直接上传，可配置第二个参数设置上传进度，返回上传文件的链接即可 */
  uploadFn?: (file: File, setProgress: (percent: number) => any) => Promise<string | void>;
  commonExtra?: { [k in ComponentType]?: any };
  commonRules?: { [k in ComponentType]?: Rule[] };
  /** 配置可上传的图片类型 */
  pictureAccept?: string;
  /** 配置图片预览组件 */
  viewerProps?: ViewerProps;
}

function initConfig(props: ConfigProviderProps) {
  const intl = useIntl();
  const { setCommonProps, uploadFn, commonExtra, commonRules, pictureAccept, viewerProps } = props;

  const config: ConfigConsumerProps = {
    setCommonProps: processSetCommonProps(setCommonProps),
    uploadFn: uploadFn || defaultUploadByBase64,
    commonExtra: {
      ...commonExtra,
    },
    commonRules: {
      ...setDefaultRules(intl),
      ...commonRules,
    },
    pictureAccept: pictureAccept || defaultPictureAccept,
    viewerProps: {
      ...defaultViewerProps,
      ...viewerProps,
    },
  };

  return config;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const { children } = props;

  const [config] = useState(initConfig(props));

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};
