import React, { useContext } from 'react';
import { Upload, message } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import {
  sizeOfFile,
  getImageDimension,
  getBase64,
} from '../../utils/commons';
import {
  processDimensionLimit,
  isLimitDimension,
  setMimeLimitHint,
  setCountLimitHint,
  setSizeLimitHint,
  setDimensionLimitHint,
} from './utils';
import { uploadByBase64 as uploadByBase64Default } from '../../defaultConfig';
import ConfigContext from '../../contexts/ConfigContext/context';
import { useIntl } from '../../contexts/Intlcontext';

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

    fileList: uploadedFileList = [],
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
      const dataUrl: any = await getBase64(file);
      const dimension: any = await getImageDimension(dataUrl);

      const customHint = checkImage({
        dimension,
        type,
        name,
        size: sizeOfFile(file),
      });
      if (customHint) {
        message.error(customHint);
        return reject();
      }

      if (dimensionLimit) {
        const limits = processDimensionLimit(dimensionLimit);
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
  return fileList.filter(
    (item) => item.status !== undefined && item.status !== 'error'
  );
}

export const customRequest = (
  uploadFn: (
    file: File,
    setProgress: (percent: number) => any
  ) => Promise<string | void> = uploadByBase64Default
) => async ({ file, onSuccess, onError, onProgress }) => {
  const url = await uploadFn(file, (percent) => onProgress({ percent }));
  if (url) {
    onSuccess(url, file);
  } else {
    onError(url);
  }
};

export interface CoreUploadPorps extends UploadProps {
  uploadFn?: (
    file: File,
    setProgress: (percent: number) => any
  ) => Promise<string | void>;
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
export default function CoreUpload(props: CoreUploadPorps) {
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
    uploadFn,
    ...rest
  } = props;

  const { uploadFn: defaultUploadFn } = useContext(ConfigContext);
  const intl = useIntl();

  return (
    <Upload
      accept={accept}
      name='image'
      customRequest={customRequest(uploadFn || defaultUploadFn)}
      listType={listType || 'text'}
      fileList={fileList}
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
