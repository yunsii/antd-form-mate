import React, { useContext } from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import {
  CoreUploadPorps,

  // defaultCountLimitHint,
  // defaultSizeLimitHint,
  filterFileList,
  commonBeforeUpload,
  customRequest,
} from '../CoreUpload';
import { setCountLimitHint, setSizeLimitHint } from '../CoreUpload/utils';
import ConfigContext from '../../contexts/ConfigContext/context';
import { useIntl } from '../../contexts/Intlcontext';

export interface CustomDraggerProps extends CoreUploadPorps {}

const CustomDragger: React.FC<CustomDraggerProps> = (props) => {
  const { uploadFn: defaultUploadFn } = useContext(ConfigContext);
  const intl = useIntl();

  const {
    uploadFn = defaultUploadFn,
    onChange,
    filesCountLimit,
    fileSizeLimit,
    dimensionLimit,
    accept,
    checkImage,
    fileList,
    // countLimitHint,
    // sizeLimitHint,
    ...rest
  } = props;

  const handleChange = ({ fileList }) => {
    const { onChange } = props;
    if (onChange) {
      onChange(filterFileList(fileList) as any);
    }
  };

  return (
    <Upload.Dragger
      name='file'
      // multiple: true
      customRequest={customRequest(uploadFn)}
      onChange={handleChange}
      fileList={fileList}
      beforeUpload={commonBeforeUpload({
        filesCountLimit,
        fileSizeLimit,
        dimensionLimit,
        accept,
        checkImage,
        // countLimitHint: countLimitHint || defaultCountLimitHint,
        // sizeLimitHint: sizeLimitHint || defaultSizeLimitHint,
        countLimitHint: setCountLimitHint(intl),
        sizeLimitHint: setSizeLimitHint(intl),

        fileList: fileList,
      })}
      accept={accept}
      {...rest}
    >
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <p className='ant-upload-text'>{intl.getMessage('dragger.upload', '点击或拖拽文件到此处上传')}</p>
      {/* <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p> */}
    </Upload.Dragger>
  );
};

export default CustomDragger;
