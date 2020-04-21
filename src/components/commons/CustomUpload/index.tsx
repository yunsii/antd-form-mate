import React, { useContext } from 'react';
import { Upload, message } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';
import _template from 'lodash/template';
import { sizeOfFile, getImageDimension, getBase64 } from '../../../utils/commons';
import {
  processDimensionLimit,
  isLimitDimension,
  setMimeLimitHint,
  setCountLimitHint,
  setSizeLimitHint,
  setDimensionLimitHint,
} from './utils';
import { uploadByBase64 as uploadByBase64Default, isUploadOk as isUploadOkDefault } from '../../../defaultConfig';
import ConfigContext from '../../../contexts/ConfigContext/context';
import { useIntl } from '../../../contexts/Intlcontext';

export const defaultFilesCountLimit = 1;
export const defaultFileSizeLimit = Infinity;

export const commonBeforeUpload = (limit: any) => (file: any) => {
  const {
    accept,
    filesCountLimit = defaultFilesCountLimit,
    fileSizeLimit = defaultFileSizeLimit,
    dimensionLimit,

    mimeLimitHint,
    countLimitHint,
    dimensionLimitHint,
    sizeLimitHint,
    checkImage = () => undefined,

    fileList: uploadedFileList,
  } = limit;
  const { name, type } = file;

  return new Promise(async (resolve, reject) => {
    if (accept && typeof accept === 'string') {
      const mimeTypeReg = new RegExp(accept.replace(/,/g, '|'));
      if (!mimeTypeReg.test(name) && !mimeTypeReg.test(type)) {
        message.error(mimeLimitHint(accept));
        return reject();
      }
    }

    if (/image\/./.test(type)) {
      console.log(file);
      const dataUrl: any = await getBase64(file);
      const dimension: any = await getImageDimension(dataUrl);
      console.log(dimension);

      const customHint = checkImage({ dimension, type, name, size: sizeOfFile(file) });
      if (customHint) {
        message.error(customHint);
        return reject();
      }

      if (dimensionLimit) {
        const limits = processDimensionLimit(dimensionLimit);
        console.log(limits);
        if (!isLimitDimension(limits, dimension)) {
          message.error(dimensionLimitHint(dimensionLimit));
          return reject();
        }
      }
    }

    const isLtCount = uploadedFileList.length < filesCountLimit;
    if (!isLtCount) {
      message.error(countLimitHint(filesCountLimit));
    }

    console.log('fileSizeLimit', fileSizeLimit);
    const isLtSize = sizeOfFile(file) <= fileSizeLimit;
    if (!isLtSize) {
      message.error(sizeLimitHint(fileSizeLimit));
    }
    if (!isLtCount || !isLtSize) {
      return reject();
    }
    resolve();
  }) as Promise<void>;
};

export function filterFileList(fileList: UploadFile[]) {
  return fileList.filter((item) => item.status !== undefined && item.status !== 'error');
}

export const customRequest = (
  uploadFn: (file: File, setProgress: (percent: number) => any) => Promise<any> = uploadByBase64Default,
  isUploadOk: (response: any) => boolean = isUploadOkDefault
) => async ({ file, onSuccess, onError, onProgress }) => {
  const response = await uploadFn(file, (percent) => onProgress({ percent }));
  if (isUploadOk(response)) {
    onSuccess(response, file);
  } else {
    onError(response);
  }
};

export interface CustomUploadPorps extends UploadProps {
  uploadFn?: (file: File, setProgress: (percent: number) => any) => Promise<any>;
  isUploadOk?: (response: any) => boolean;
  getUrl?: (response: any) => { url: string; thumbUrl?: string };
  children?: React.ReactChildren | React.ReactNode;
  filesCountLimit?: number;
  /** 单位 `b` */
  fileSizeLimit?: number;
  dimensionLimit?: string;
  /** return hint if validate failed */
  checkImage?: (info: {
    dimension: { width: number; height: number };
    type: string;
    name: string;
    size: number;
  }) => string | undefined;
  // countLimitHint?: (countLimit: number) => string;
  // sizeLimitHint?: (sizeLimit: number) => string;
  // imageLimitHint?: (dimensionLimit: string, customCheck: boolean) => string;
}

// https://github.com/react-component/upload/blob/master/examples/customRequest.js
export default function CustomUpload(props: CustomUploadPorps) {
  const {
    accept,
    listType,
    fileList,
    onChange,
    children,

    filesCountLimit,
    fileSizeLimit,
    dimensionLimit,
    checkImage,
    // countLimitHint,
    // sizeLimitHint,
    // imageLimitHint,
    getUrl,
    uploadFn,
    isUploadOk,
    ...rest
  } = props;

  const { uploadFn: defaultUploadFn, isUploadOk: defaultIsUploadOk, getUrl: defaultGetUrl } = useContext(ConfigContext);
  const intl = useIntl();

  const processFileList =
    fileList?.map((item) => {
      if (item.response) {
        return { ...item, ...defaultGetUrl(item.response) };
      }
      return item;
    }) || [];

  return (
    <Upload
      accept={accept}
      name='image'
      customRequest={customRequest(uploadFn || defaultUploadFn, isUploadOk || defaultIsUploadOk)}
      listType={listType || 'text'}
      fileList={processFileList}
      onChange={onChange}
      beforeUpload={commonBeforeUpload({
        accept,
        filesCountLimit,
        fileSizeLimit,
        dimensionLimit,
        checkImage,

        mimeLimitHint: setMimeLimitHint(intl),
        countLimitHint: setCountLimitHint(intl),
        dimensionLimitHint: setDimensionLimitHint(intl),
        sizeLimitHint: setSizeLimitHint(intl),

        fileList,
      })}
      {...rest}
    >
      {children}
    </Upload>
  );
}
