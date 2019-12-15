import React, { useContext } from "react";
import { Upload, message } from "antd";
import { UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import _isString from "lodash/isString";
import _isArray from "lodash/isArray";
import { sizeOfFile, getImageDimension, getBase64 } from '../../../utils';
import { processDimensionLimit, isLimitDimension } from './utils';
import { uploadByBase64 as uploadByBase64Default, isUploadOk as isUploadOkDefault } from '../../../defaultConfig';
import ConfigContext from '../../../config-provider/context';

export const defaultFilesCountLimit = 1;
export const defaultFileSizeLimit = 500 * 1024 * 1024;

export const defaultMimeLimitHint = (accept: string) => `上传文件类型错误，仅限 ${accept}`;
export const defaultCountLimitHint = (countLimit: number) => `仅限上传 ${countLimit} 个文件`;
export const defaultImageLimitHint = (dimensionLimit: string, customHint: string) => customHint || `图片像素限制 ${dimensionLimit}`;
export const defaultSizeLimitHint = (sizeLimit: number) => `图片必须小于 ${sizeLimit} B`;

export const commonBeforeUpload = (limit: any) => (file: any) => {
  const {
    filesCountLimit = defaultFilesCountLimit,
    fileSizeLimit = defaultFileSizeLimit,
    dimensionLimit,
    accept,
    checkImage = () => undefined,
    mimeLimitHint = defaultMimeLimitHint,
    countLimitHint = defaultCountLimitHint,
    imageLimitHint = defaultImageLimitHint,
    sizeLimitHint = defaultSizeLimitHint,

    fileList: uploadedFileList,
  } = limit;
  const { name, type } = file;

  return new Promise(async (resolve, reject) => {
    if (accept && typeof accept === 'string') {
      const mimeTypeReg = new RegExp(accept.replace(/,/g, "|"));
      if (!mimeTypeReg.test(name) && !mimeTypeReg.test(type)) {
        message.error(mimeLimitHint(accept));
        return reject();
      }
    }

    if (/image\/./.test(type) && dimensionLimit) {
      const limits = processDimensionLimit(dimensionLimit);
      console.log(file);
      const dataUrl: any = await getBase64(file);
      const dimension: any = await getImageDimension(dataUrl);
      console.log(limits);
      console.log(dimension);

      const customHint = checkImage({ dimension, type, name, size: sizeOfFile(file) });
      if (isLimitDimension(limits, dimension) && !customHint) {
        return resolve();
      }
      message.error(imageLimitHint(dimensionLimit, customHint));
      return reject();
    }

    const isLtCount = uploadedFileList.length < filesCountLimit;
    if (!isLtCount) {
      message.error(countLimitHint(filesCountLimit))
    }
    const isLtSize = sizeOfFile(file) <= fileSizeLimit;
    if (!isLtSize) {
      message.error(sizeLimitHint(fileSizeLimit));
    }
    if (isLtCount && isLtSize) {
      return resolve();
    };
    reject();
  }) as Promise<void>
}

export function filterFileList(fileList: UploadFile[]) {
  return fileList.filter(item => item.status !== undefined && item.status !== 'error');
}

export const customRequest = (
  uploadFn: (file: File, setProgress: (percent: number) => any) => Promise<any> = uploadByBase64Default,
  isUploadOk: (response: any) => boolean = isUploadOkDefault,
) => async ({
  file,
  onSuccess,
  onError,
  onProgress,
}) => {
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
  getUrl?: (response: any) => { url: string, thumbUrl?: string };
  children?: React.ReactChildren | React.ReactNode;
  filesCountLimit?: number;
  fileSizeLimit?: number;
  dimensionLimit?: string;
  /** return hint if validate failed */
  checkImage?: (info: { dimension: { width: number, height: number }, type: string, name: string, size: number }) => string;
  countLimitHint?: (countLimit: number) => string;
  sizeLimitHint?: (sizeLimit: number) => string;
  imageLimitHint?: (dimensionLimit: string, customCheck: boolean) => string;
}

// https://github.com/react-component/upload/blob/master/examples/customRequest.js
export default function CustomUpload(props: CustomUploadPorps) {
  const { uploadFn: uploadFnGlobal, isUploadOk: isUploadOkGlobal } = useContext(ConfigContext);
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
    countLimitHint,
    sizeLimitHint,
    imageLimitHint,
    uploadFn,
    isUploadOk,
    ...rest
  } = props;
  const setUploadFn = () => uploadFn || uploadFnGlobal;
  const setIsUploadOk = () => isUploadOk || isUploadOkGlobal;

  return (
    <Upload
      accept={accept}
      name="image"
      customRequest={customRequest(setUploadFn(), setIsUploadOk())}
      listType={listType || "text"}
      fileList={fileList}
      onChange={onChange}
      beforeUpload={commonBeforeUpload({
        filesCountLimit,
        fileSizeLimit,
        dimensionLimit,
        accept,
        checkImage,
        countLimitHint,
        imageLimitHint,
        sizeLimitHint,

        fileList,
      })}
      {...rest}
    >
      {children}
    </Upload>
  );
}
