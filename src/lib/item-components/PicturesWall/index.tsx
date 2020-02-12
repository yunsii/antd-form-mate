import React, { useContext, forwardRef } from "react";
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
import ConfigContext from '../../../config-provider/context';
import { setFileList } from '../../setValue';
import styles from "./index.less";

export interface PicturesWallProps extends CustomUploadPorps {
  value?: string | any[];
  viewerProps?: ViewerProps;
}

export interface InternalPicturesWallProps extends PicturesWallProps {
  setLocale: { upload: string };
  pictureFormateLimit: string;
}

export interface InternalPicturesWallState {
  previewVisible: boolean;
  activeIndex: number;
  fileList: UploadFile[];
}

class InternalPicturesWall extends React.Component<InternalPicturesWallProps, InternalPicturesWallState> {
  /** ref: https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops */
  static getDerivedStateFromProps(props: InternalPicturesWallProps) {
    return {
      fileList: setFileList(props),
    };
  }

  state = {
    previewVisible: false,
    activeIndex: 0,
    fileList: [] as UploadFile[],
  };

  handlePreview = async (file: UploadFile) => {
    const { fileList } = this.state;
    console.log(fileList, file);
    console.log(_findIndex(fileList, { uid: file.uid }));
    this.setState({
      activeIndex: _findIndex(fileList, { uid: file.uid }),
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    console.log(fileList);
    const { onChange } = this.props;
    if (onChange) {
      onChange(filterFileList(fileList) as any);
    }
  };

  render() {
    const { pictureFormateLimit, setLocale, viewerProps } = this.props;
    const { previewVisible, fileList, activeIndex } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">{_get(setLocale, 'upload')}</div>
      </div>
    );
    return (
      <div className={`${styles.pictureWall} clearfix`}>
        <CustomUpload
          accept={pictureFormateLimit}
          {...this.props}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          listType="picture-card"
        >
          {fileList.length >= (this.props.filesCountLimit || 1) ? null : uploadButton}
        </CustomUpload>
        <ImagesViewer
          visible={previewVisible}
          images={fileList.map(item => ({ src: item.url!, alt: item.fileName }))}
          onClose={() => this.setState({ previewVisible: false })}
          activeIndex={activeIndex}
          {...viewerProps}
        />
      </div>
    );
  }
}

export default forwardRef<React.ComponentClass, PicturesWallProps>((props, ref) => {
  const { getUrl, pictureFormateLimit, afmLocale: { picturesWall } } = useContext(ConfigContext);
  const forwardProps = {
    getUrl,
    pictureFormateLimit,
    setLocale: {
      upload: picturesWall.upload,
    },
    ...props,
    ref,
  } as any;
  console.log(forwardProps);
  return <InternalPicturesWall {...forwardProps} />;
})
