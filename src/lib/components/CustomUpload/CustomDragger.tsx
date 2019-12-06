import React, { Component } from "react";
import { Upload, Icon } from "antd";
import { UploadProps } from 'antd/lib/upload';
import { draggerLocale } from '../../../locale';
import {
  CustomUploadPorps,
} from './index';
import {
  defaultCountLimitHint,
  defaultSizeLimitHint,
  setFileList,
  filterFileList,
  commonBeforeUpload,
  customRequest,
} from './index';
import { uploadByBase64Default, isUploadOkDefault } from '../../../defaultConfig';
import { withConfigContext } from '../../../utils';

const { Dragger } = Upload as any;

export interface CustomDraggerProps extends CustomUploadPorps {
  value?: string | any[];
}

export interface CustomDraggerState {
  fileList: UploadProps["fileList"];
}

@(withConfigContext(['uploadFn', 'isUploadOk']) as any)
export default class CustomDragger extends Component<CustomDraggerProps, CustomDraggerState> {
  static getDerivedStateFromProps(props: CustomDraggerProps) {
    return {
      fileList: setFileList(props)
    };
  }

  state = {
    fileList: [],
  };

  handleChange = ({ fileList }) => {
    console.log(fileList);
    const { onChange } = this.props;
    if (onChange) {
      onChange(filterFileList(fileList) as any);
    }
  };

  render() {
    const {
      uploadFn,
      isUploadOk,
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

    const setUploadFn = () => uploadFn || uploadByBase64Default;
    const setIsUploadOk = () => isUploadOk || isUploadOkDefault;

    return (
      <Dragger
        name="file"
        // multiple: true
        customRequest={customRequest(setUploadFn(), setIsUploadOk())}
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
