import { Rule } from 'rc-field-form/lib/interface';
import ViewerProps from 'react-viewer/lib/ViewerProps';
import { ComponentType } from './interfaces';
import { getBase64 } from './utils/commons';
import { IntlType, zhCNIntl } from './contexts/Intlcontext';

const commonStyle = { width: '100%' };

/** 处理传入的 `setCommonProps` ，返回增强的 `setCommonProps` */
export function processSetCommonProps(setCommonProps: (type: ComponentType) => any = () => ({})) {
  if (typeof setCommonProps !== 'function') {
    throw new Error('setCommonProps is not a function.');
  }

  return (type: ComponentType, defaultStyle: React.CSSProperties, useCommonStyle: boolean = true) => {
    const { style = {}, ...rest } = setCommonProps(type) || {};
    // console.log(type, rest);
    return {
      ...rest,
      style: {
        ...defaultStyle,
        ...(useCommonStyle ? commonStyle : {}),
        ...style,
      },
    };
  };
}

export const setDefaultRules: (intl?: IntlType) => { [k in ComponentType]?: Rule[] } = (intl) => {
  return {
    email: [
      {
        type: 'email',
        message: (intl || zhCNIntl).getMessage('message.email', '请输入正确的邮箱格式'),
      },
    ],
  };
};

export async function uploadByBase64(file: File) {
  const dataUrl = await getBase64(file);
  return dataUrl;
}

export const pictureAccept = 'image/*';

export const defaultViewerProps: ViewerProps = {
  rotatable: false,
  noImgDetails: true,
  scalable: false,
  zoomable: false,
  attribute: false,
};
