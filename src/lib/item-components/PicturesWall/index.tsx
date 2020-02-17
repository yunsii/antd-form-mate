import React, { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import _pick from "lodash/pick";
import _isArray from "lodash/isArray";
import _findIndex from "lodash/findIndex";
import _get from "lodash/get";
import ViewerProps from 'react-viewer/lib/ViewerProps';
import { UploadFile } from 'antd/lib/upload/interface';
import ImagesViewer from '../../components/ImagesViewer';
import CustomUpload, {
  CustomUploadPorps,
  filterFileList,
} from "../../components/CustomUpload/index";
// import { getBase64 } from '../../../utils';
import ConfigContext from '../../../config-context/context';
import { setFileList } from '../../setValue';
import styles from "./index.less";
import { useIntl } from "../../../intl-context";

export interface PicturesWallProps extends CustomUploadPorps {
  value?: string | any[];
  viewerProps?: ViewerProps;
  pictureAccept?: string;
}

const PicturesWall: React.FC<PicturesWallProps> = (props) => {
  const { getUrl: defaultGetUrl, pictureAccept: defaultPictureAccept } = useContext(ConfigContext);
  const intl = useIntl();

  const {
    value,
    getUrl = defaultGetUrl,
    pictureAccept = defaultPictureAccept,
    viewerProps,
  } = props;

  const files = setFileList({ value, getUrl });

  const [previewVisible, setPreviewVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePreview = async (file: UploadFile) => {
    console.log(files, file);
    console.log(_findIndex(files, { uid: file.uid }));
    setActiveIndex(_findIndex(files, { uid: file.uid }));
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    console.log('handleChange', fileList);
    const { onChange } = props;
    if (onChange) {
      onChange(filterFileList(fileList) as any);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">{intl.getMessage('picturesWall.upload', '上传')}</div>
    </div>
  );

  return (
    <div className={`${styles.pictureWall} clearfix`}>
      <CustomUpload
        accept={pictureAccept}
        {...props}
        fileList={files}
        onPreview={handlePreview}
        onChange={handleChange}
        listType="picture-card"
      >
        {files.length >= (props.filesCountLimit || 1) ? null : uploadButton}
      </CustomUpload>
      <ImagesViewer
        visible={previewVisible}
        images={files.map(item => ({ src: item.url!, alt: item.fileName }))}
        onClose={() => setPreviewVisible(false)}
        activeIndex={activeIndex}
        {...viewerProps}
      />
    </div>
  );
}

export default PicturesWall;