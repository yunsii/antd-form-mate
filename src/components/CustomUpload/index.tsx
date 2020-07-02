import React, { useContext, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import _findIndex from 'lodash/findIndex';
import ViewerProps from 'react-viewer/lib/ViewerProps';
import { UploadFile } from 'antd/lib/upload/interface';

import ImagesViewer from '../commons/ImagesViewer';
import CoreUpload, { CoreUploadPorps, filterFileList } from '../CoreUpload';
// import { getBase64 } from '../../../utils';
import ConfigContext from '../../contexts/ConfigContext/context';
import styles from './index.less';
import { useIntl } from '../../contexts/Intlcontext';

export interface CustomUploadProps extends CoreUploadPorps {
  viewerProps?: ViewerProps;
  pictureAccept?: string;
}

const CustomUpload: React.FC<CustomUploadProps> = (props) => {
  const { pictureAccept: defaultPictureAccept } = useContext(ConfigContext);
  const intl = useIntl();

  const { fileList = [], pictureAccept = defaultPictureAccept, viewerProps, children } = props;

  const [previewVisible, setPreviewVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePreview = async (file: UploadFile) => {
    setActiveIndex(_findIndex(fileList, { uid: file.uid }));
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const { onChange } = props;
    if (onChange) {
      onChange(filterFileList(fileList) as any);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className='ant-upload-text'>{intl.getMessage('picturesWall.upload', '上传')}</div>
    </div>
  );

  return (
    <div className={`${styles.pictureWall} clearfix`}>
      <CoreUpload
        accept={pictureAccept}
        onPreview={handlePreview}
        listType='picture-card'
        {...props}
        fileList={fileList}
        onChange={handleChange}
      >
        {fileList.length >= (props.filesCountLimit || 1) ? null : children || uploadButton}
      </CoreUpload>
      <ImagesViewer
        visible={previewVisible}
        images={fileList
          .filter((item) => item.url || item.response)
          .map((item) => ({ src: item.url || item.response, alt: item.name }))}
        onClose={() => setPreviewVisible(false)}
        activeIndex={activeIndex}
        {...viewerProps}
      />
    </div>
  );
};

export default CustomUpload;
