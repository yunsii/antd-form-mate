import React from "react";
import { Upload, message } from "antd";
import { UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import _isString from "lodash/isString";
import _isArray from "lodash/isArray";
import { useBase64, uploadFn as uploadFnGlobal, isUploadOk as isUploadOkGlobal, getUrl } from '../../../config';
import { sizeOfFile, getImageDimension, getBase64 } from '../../../utils';
import { processDimensionLimit, isLimitDimension } from './utils';
import { CustomDraggerProps } from "./CustomDragger";
import { PicturesWallProps } from "../PicturesWall/index";

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
  uploadFn?: (file: File, setProgress: (percent: number) => any) => Promise<any>,
  isUploadOk?: (response: any) => boolean
) => async ({
  file,
  onSuccess,
  onError,
  onProgress,
}) => {
    let response: any;
    if (uploadFn) {  // 组件自定义上传函数
      response = await uploadFn(file, (percent) => onProgress({ percent }));
    } else if (uploadFnGlobal) {  // 全局配置上传函数
      response = await uploadFnGlobal(file);
    } else {  // 包默认使用 base64
      response = await useBase64(file);
      onSuccess(response, file);
      return;
    }
    if (isUploadOk && isUploadOk(response)) {  // 组件自定义上传判断成功与否的函数
      onSuccess(response, file);
    } else if (isUploadOkGlobal(response)) {  // 包默认判断成功与否的函数
      onSuccess(response, file);
    } else {
      onError(response);
    }
  };

function setFileNameByPath(path: string) {
  const pathSegment = path.split(/\//g);
  return pathSegment[pathSegment.length - 1];
}

export function setFileList(props: CustomDraggerProps | PicturesWallProps): UploadFile[] {
  const { value, getUrl: isolatedGetUrl } = props;
  let fileList: UploadFile[] = [];
  if (value && _isString(value)) {
    fileList = [{ uid: setFileNameByPath(value), url: value, name: setFileNameByPath(value), status: 'done' } as any];
  } else if (value && _isArray(value) && _isString(value[0])) {
    fileList = value.map((item, index) => ({ uid: setFileNameByPath(item), url: item, name: setFileNameByPath(item), status: 'done' } as any));
  } else if (value && _isArray(value)) {
    fileList = value.map(item => {
      if (item.response) {
        return { ...item, ...isolatedGetUrl ? isolatedGetUrl(item.response) : getUrl(item.response) }
      }
      return item;
    })
  }
  return fileList;
}

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

  return (
    <Upload
      accept={accept}
      name="image"
      customRequest={customRequest(uploadFn, isUploadOk)}
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
