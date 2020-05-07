import React from 'react';
import { Rule } from 'rc-field-form/lib/interface';
import ViewerProps from 'react-viewer/lib/ViewerProps';

import { ComponentType } from '../../interfaces';
import {
  uploadByBase64,
  pictureAccept,
  setDefaultRules,
  processSetCommonProps,
  defaultViewerProps,
} from '../../defaultConfig';

export interface ConfigConsumerProps {
  setCommonProps: (type: ComponentType, defaultStyle: any, useCommonStyle?: boolean) => any;
  uploadFn: (file: File, setProgress: (percent: number) => any) => Promise<any>;
  commonExtra: { [k in ComponentType]?: any };
  commonRules: { [k in ComponentType]?: Rule[] };
  pictureAccept: string;
  viewerProps: ViewerProps;
}

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  setCommonProps: processSetCommonProps(),
  uploadFn: uploadByBase64,
  commonExtra: {},
  commonRules: setDefaultRules(),
  pictureAccept,
  viewerProps: defaultViewerProps,
});

ConfigContext.displayName = "antd-form-mate's ConfigContext";

export default ConfigContext;
