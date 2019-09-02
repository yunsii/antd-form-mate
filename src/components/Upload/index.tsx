import React, { Component } from "react";
import { Upload, Icon, message } from "antd";
import { UploadProps } from 'antd/lib/upload';
import _isString from "lodash/isString";
import _isArray from "lodash/isArray";
import { uploadFile, isUploadSuccess } from '../../config';
import { draggerLocale } from '../../locale';

const { Dragger } = Upload as any;

const defaultFilesCountLimit = 1;
const defaultFileSizeLimit = 100 * 1024 * 1024;

const defaultMimeLimitHint = (accept: string) => `上传文件类型错误，仅限 ${accept}`;
const defaultCountLimitHint = (countLimit: number) => `仅限上传 ${countLimit} 个文件`;
const defaultSizeLimitHint = (sizeLimit: number) => `图片必须小于 ${sizeLimit} B`;

const commonBeforeUpload = (limit) => (file) => {
  const {
    filesCountLimit = defaultFilesCountLimit,
    fileSizeLimit = defaultFileSizeLimit,
    accept,
    mimeLimitHint = defaultMimeLimitHint,
    countLimitHint = defaultCountLimitHint,
    sizeLimitHint = defaultSizeLimitHint,

    fileList: uploadedFileList,
  } = limit;
  console.log(file, uploadedFileList);
  console.log(filesCountLimit, fileSizeLimit, accept);

  if (accept && typeof accept === 'string') {
    const mimeTypeReg = new RegExp(accept.replace(/,/g, "|"));
    const { name, type } = file;
    if (!mimeTypeReg.test(name) || !mimeTypeReg.test(type)) {
      message.error(mimeLimitHint(accept));
      return false;
    } 
  }
  // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  // if (!isJpgOrPng) {
  //   message.error('You can only upload JPG/PNG file!');
  // }
  const isLtCount = uploadedFileList.length < filesCountLimit;
  if (!isLtCount) {
    message.error(countLimitHint(filesCountLimit))
  }
  const isLtSize = file.size <= fileSizeLimit;
  if (!isLtSize) {
    message.error(sizeLimitHint(fileSizeLimit));
  }
  console.log('isLtCount && isLtSize', isLtCount && isLtSize)
  return isLtCount && isLtSize;
}

export function filterFileList(fileList) {
  return fileList.filter(item => item.status !== undefined);
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
      accept,
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
          accept,
          countLimitHint: countLimitHint || defaultCountLimitHint,
          sizeLimitHint: sizeLimitHint || defaultSizeLimitHint,

          fileList,
        })}
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
  countLimitHint?: (countLimit: number) => string;
  sizeLimitHint?: (sizeLimit: number) => string;
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
    countLimitHint,
    sizeLimitHint,
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
        accept,
        countLimitHint,
        sizeLimitHint,

        fileList,
      })}
      {...rest}
    >
      {children}
    </Upload>
  );
}
