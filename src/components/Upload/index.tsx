import React, { Component } from "react";
import { Upload, Icon, message } from "antd";
import { UploadProps } from 'antd/lib/upload';
import _isString from "lodash/isString";
import _isArray from "lodash/isArray";
import { uploadFile, isUploadSuccess } from '../../config';
import { draggerLocale } from '../../locale';
import { sizeOfFile, getImageDimension, getBase64 } from '../../utils';

const { Dragger } = Upload as any;

const defaultFilesCountLimit = 1;
const defaultFileSizeLimit = 100 * 1024 * 1024;

const defaultMimeLimitHint = (accept: string) => `上传文件类型错误，仅限 ${accept}`;
const defaultCountLimitHint = (countLimit: number) => `仅限上传 ${countLimit} 个文件`;
const defaultImageLimitHint = (dimensionLimit: string, customCheck: boolean) => `图片像素限制 ${dimensionLimit}`;
const defaultSizeLimitHint = (sizeLimit: number) => `图片必须小于 ${sizeLimit} B`;

function processDimensionLimit(dimensionLimit: string) {
  let result: any[] = [false, false];
  let limit = dimensionLimit;
  if (!dimensionLimit.startsWith('<') && !dimensionLimit.startsWith('>') && !dimensionLimit.match(',')) {
    limit = `<${limit}`
  }
  const getWidthAndHeight = (item: string) => item.split('*').map(item => parseInt(item, 10))
  if (limit.startsWith('<')) {
    const [width, height] = getWidthAndHeight(limit.slice(1))
    result[1] = {
      width,
      height,
    }
  } else if (limit.startsWith('>')) {
    const [width, height] = getWidthAndHeight(limit.slice(1))
    result[0] = {
      width,
      height,
    }
  } else {
    const [min, max] = limit.split(',');
    const [minWidth, minHeight] = getWidthAndHeight(min);
    const [maxWidth, maxHeight] = getWidthAndHeight(max);
    result[0] = {
      width: minWidth,
      height: minHeight,
    }
    result[1] = {
      width: maxWidth,
      height: maxHeight,
    }
  }
  return result;
}

function isLimitDimension(limits: any[], dimension: { width: number, height: number }) {
  const { width, height } = dimension;
  const isLessOrEqual = (limit) => width <= limit.width && height <= limit.height
  const isMoreOrEqual = (limit) => width >= limit.width && height >= limit.height
  if (limits[0] === false) {
    return isLessOrEqual(limits[1]);
  }
  if (limits[1] === false) {
    return isMoreOrEqual(limits[0]);
  }
  return isMoreOrEqual(limits[0]) && isLessOrEqual(limits[1]);
}

const commonBeforeUpload = (limit) => (file: any) => {
  const {
    filesCountLimit = defaultFilesCountLimit,
    fileSizeLimit = defaultFileSizeLimit,
    dimensionLimit,
    accept,
    checkImage = () => true,
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
        reject();
        return;
      }
    }

    // console.log('/image\/./.test(type)', /image\/./.test(type));
    if (/image\/./.test(type) && dimensionLimit) {
      const limits = processDimensionLimit(dimensionLimit);
      // console.log(file);
      const dataUrl: any = await getBase64(file);
      const dimension: any = await getImageDimension(dataUrl);
      console.log(limits);
      console.log(dimension);
      if (isLimitDimension(limits, dimension) && checkImage({ dimension, type, name, size: sizeOfFile(file) })) {
        resolve();
        return;
      }
      message.error(imageLimitHint(dimensionLimit, checkImage({ dimension, type, name, size: sizeOfFile(file) })));
      reject();
      return;
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
      resolve();
      return;
    };
    reject();
  }) as Promise<void>
}

export function filterFileList(fileList) {
  // console.log(fileList);
  return fileList.filter(item => item.status !== undefined && item.status !== 'error');
}

const customRequest = uploadFunction => async ({
  file,
  onSuccess,
  onError
}) => {
  let response: any = null;
  if (uploadFunction) {
    response = await uploadFunction(file);
  } else {
    response = await uploadFile(file);
  }
  if (isUploadSuccess(response)) {
    onSuccess(response, file);
  } else {
    onError(response);
  }
};

function setFileNameByPath(path) {
  const pathSegment = path.split(/\//g);
  return pathSegment[pathSegment.length - 1];
}

export function setFileList(props): UploadProps["fileList"] {
  const { value } = props;
  let fileList: any[] = [];
  if (value && _isString(value)) {
    fileList = [{ uid: -1, url: value, name: setFileNameByPath(value) }];
  } else if (value && _isArray(value) && _isString(value[0])) {
    fileList = value.map((item, index) => ({ uid: -index, url: item, name: setFileNameByPath(value) }));
  } else if (value && _isArray(value)) {
    fileList = [...value];
  }
  return fileList;
}

export interface CustomDraggerProps extends CustomUploadPorps { }

export interface CustomDraggerState {
  fileList: UploadProps["fileList"];
}

export class CustomDragger extends Component<CustomDraggerProps, CustomDraggerState> {
  static getDerivedStateFromProps(props: CustomDraggerProps) {
    return {
      fileList: setFileList(props)
    };
  }

  constructor(props: CustomDraggerProps) {
    super(props);
    this.state = {
      fileList: setFileList(this.props)
    };
  }

  handleChange = ({ fileList }) => {
    // console.log(fileList);
    const { onChange } = this.props;
    if (onChange) {
      onChange(filterFileList(fileList));
    }
  };

  render() {
    const {
      uploadFunction,
      onChange,
      filesCountLimit,
      fileSizeLimit,
      dimensionLimit,
      accept,
      checkImage,
      countLimitHint,
      sizeLimitHint,
      ...rest
    } = this.props;
    const { fileList } = this.state;

    return (
      <Dragger
        name="file"
        // multiple: true
        customRequest={customRequest(uploadFunction)}
        onChange={this.handleChange}
        fileList={fileList}
        beforeUpload={commonBeforeUpload({
          filesCountLimit,
          fileSizeLimit,
          dimensionLimit,
          accept,
          checkImage,
          countLimitHint: countLimitHint || defaultCountLimitHint,
          sizeLimitHint: sizeLimitHint || defaultSizeLimitHint,

          fileList,
        })}
        accept={accept}
        {...rest}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">{draggerLocale.upload}</p>
        {/* <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p> */}
      </Dragger>
    );
  }
}


export interface CustomUploadPorps extends UploadProps {
  uploadFunction?: any;
  children?: any;
  filesCountLimit?: number;
  fileSizeLimit?: number;
  dimensionLimit?: string;
  checkImage?: (info: { dimension: { width: number, height: number }, type: string, name: string, size: number }) => boolean;
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
    uploadFunction,
    ...rest
  } = props;

  return (
    <Upload
      accept={accept}
      name="image"
      customRequest={customRequest(uploadFunction)}
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
