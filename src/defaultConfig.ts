import _isFunction from 'lodash/isFunction';
import { Rule } from 'rc-field-form/lib/interface';
import ViewerProps from 'react-viewer/lib/ViewerProps';
import { ComponentType } from './interfaces';
import { getBase64 } from './utils/commons';
import { IntlType, zhCNIntl } from './contexts/Intlcontext';

const commenStyle = { width: '100%' };
const setDefaultCommenStyle = (type: ComponentType) => {
  return type !== 'switch' ? commenStyle : {};
};

export function processSetCommonProps(setCommonProps: (type: ComponentType, defaultStyle: any) => any = () => ({})) {
  if (!_isFunction(setCommonProps)) {
    throw new Error('setCommonProps is not a function.');
  }

  return (type: ComponentType, defaultStyle: any) => {
    const { style = {}, ...rest } = setCommonProps(type) || {};
    // console.log(type, rest);
    return {
      ...rest,
      style: {
        ...defaultStyle,
        ...setDefaultCommenStyle(type),
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
  return {
    data: {
      url: dataUrl,
      thumbUrl: dataUrl,
    },
  };
}

export function getUrl(response: any) {
  const { data } = response || {};
  return data;
}

export function isUploadOk(response: any) {
  const { data } = response || {};
  return !!data;
}

export const pictureAccept = 'image/*';

export const defaultViewerProps: ViewerProps = {
  rotatable: false,
  noImgDetails: true,
  scalable: false,
  zoomable: false,
};
