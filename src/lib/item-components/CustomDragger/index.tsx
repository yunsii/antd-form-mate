import React, { Component, forwardRef, useContext } from "react";
import { Upload, Icon } from "antd";
import { UploadProps } from 'antd/lib/upload';
import _get from "lodash/get";
import {
  CustomUploadPorps,
} from '../../components/CustomUpload/index';
import {
  defaultCountLimitHint,
  defaultSizeLimitHint,
  filterFileList,
  commonBeforeUpload,
  customRequest,
} from '../../components/CustomUpload/index';
import ConfigContext from '../../../config-provider/context';
import { setFileList } from '../../setValue';

const { Dragger } = Upload as any;

export interface CustomDraggerProps extends CustomUploadPorps {
  value?: string | any[];
  setLocale?: { upload: string };
}

export interface CustomDraggerState {
  fileList: UploadProps["fileList"];
}

class CustomDragger extends Component<CustomDraggerProps, CustomDraggerState> {
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
      setLocale = {},
      ...rest
    } = this.props;
    const { fileList } = this.state;

    return (
      <Dragger
        name="file"
        // multiple: true
        customRequest={customRequest(uploadFn, isUploadOk)}
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
        <p className="ant-upload-text">{_get(setLocale, 'upload')}</p>
        {/* <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p> */}
      </Dragger>
    );
  }
}

export default forwardRef<React.ComponentClass, CustomDraggerProps>((props, ref) => {
  const { uploadFn, isUploadOk, afmLocale: { dragger } } = useContext(ConfigContext);
  const forwardProps = {
    uploadFn,
    isUploadOk,
    setLocale: {
      upload: dragger.upload,
    },
    ...props,
    ref,
  } as any
  return <CustomDragger {...forwardProps} />;
})
