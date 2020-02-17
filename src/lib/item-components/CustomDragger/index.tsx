import React, { useContext } from "react";
import { Upload } from "antd";
import { InboxOutlined } from '@ant-design/icons';
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
import ConfigContext from '../../../config-context/context';
import { setFileList } from '../../setValue';
import { useIntl } from "../../../intl-context";

const { Dragger } = Upload as any;

export interface CustomDraggerProps extends CustomUploadPorps {
  value?: string | any[];
}

export interface CustomDraggerState {
  fileList: UploadProps["fileList"];
}

const CustomDragger: React.FC<CustomDraggerProps> = (props) => {
  const {
    getUrl: defaultGetUrl,
    uploadFn: defaultUploadFn,
    isUploadOk: defaultIsUploadOk,
  } = useContext(ConfigContext);
  const intl = useIntl();

  const {
    getUrl = defaultGetUrl,
    uploadFn = defaultUploadFn,
    isUploadOk = defaultIsUploadOk,
    onChange,
    filesCountLimit,
    fileSizeLimit,
    dimensionLimit,
    accept,
    checkImage,
    countLimitHint,
    sizeLimitHint,
    ...rest
  } = props;

  const files = setFileList({ value: rest.value, getUrl });

  const handleChange = ({ fileList }) => {
    console.log(fileList);
    const { onChange } = props;
    if (onChange) {
      onChange(filterFileList(fileList) as any);
    }
  };

  return (
    <Dragger
      name="file"
      // multiple: true
      customRequest={customRequest(uploadFn, isUploadOk)}
      onChange={handleChange}
      fileList={files}
      beforeUpload={commonBeforeUpload({
        filesCountLimit,
        fileSizeLimit,
        dimensionLimit,
        accept,
        checkImage,
        countLimitHint: countLimitHint || defaultCountLimitHint,
        sizeLimitHint: sizeLimitHint || defaultSizeLimitHint,

        fileList: files,
      })}
      accept={accept}
      {...rest}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{intl.getMessage('dragger.upload', '点击或拖拽文件到此处上传')}</p>
      {/* <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p> */}
    </Dragger>
  );
}

export default CustomDragger;
