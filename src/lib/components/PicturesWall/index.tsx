import React, { useContext, forwardRef } from "react";
import { Icon, Modal } from "antd";
import _pick from "lodash/pick";
import _isArray from "lodash/isArray";
import _get from "lodash/get";
import { UploadFile } from 'antd/lib/upload/interface';
import CustomUpload, {
  CustomUploadPorps,
  filterFileList,
} from "../CustomUpload/index";
import { pictureFormateLimitDefault } from '../../../defaultConfig';
import { getBase64, getImageDimension } from '../../../utils';
import defaultLocal from '../../../defaultLocal';
import ConfigContext from '../../../ConfigContext';
import { setFileList } from '../../setValue';
import styles from "./index.less";

export function getPicturesLink(fileList) {
  if (_isArray(fileList) && fileList.length === 1) {
    return fileList[0].url;
  }
  if (_isArray(fileList)) {
    return fileList.map(item => item.url);
  }
  return fileList;
}

export interface PicturesWallProps extends CustomUploadPorps {
  value?: string | any[];
  pictureFormatLimit?: string;
  setLocale?: { upload: string };
}

export interface PicturesWallState {
  previewVisible: boolean;
  previewImage: string;
  fileList: any[];
  previewWidth: number;
}

class PicturesWall extends React.Component<PicturesWallProps, PicturesWallState> {
  /** ref: https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops */
  static getDerivedStateFromProps(props: PicturesWallProps) {
    return {
      fileList: setFileList(props),
    };
  }

  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    previewWidth: 600,
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    const url = file.url || file.preview;

    this.setState({
      previewWidth: await this.setPreviewWidth(url),
      previewImage: url,
      previewVisible: true,
    });
  };

  setPreviewWidth = async (url: string) => {
    const { width } = await getImageDimension(url);
    const innerWidth = window.innerWidth;
    if (width <= innerWidth) {
      return width <= 800 ? width : 1000;
    } else {
      return innerWidth * 0.6;
    }
  }

  handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    console.log(fileList);
    const { onChange } = this.props;
    if (onChange) {
      onChange(filterFileList(fileList) as any);
    }
  };

  render() {
    const { pictureFormatLimit, setLocale } = this.props;
    const { previewVisible, previewImage, fileList, previewWidth } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{_get(setLocale, 'upload') || defaultLocal.picturesWall.upload}</div>
      </div>
    );
    return (
      <div className={`${styles.pictureWall} clearfix`}>
        <CustomUpload
          accept={pictureFormatLimit || pictureFormateLimitDefault}
          {...this.props}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          listType="picture-card"
        >
          {fileList.length >= (this.props.filesCountLimit || 1) ? null : uploadButton}
        </CustomUpload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          width={previewWidth}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default forwardRef<React.ComponentClass, PicturesWallProps>((props, ref) => {
  const { getUrl, pictureFormatLimit, setLocale } = useContext(ConfigContext);
  const forwardProps = {
    getUrl,
    pictureFormatLimit,
    setLocale: {
      upload: _get(setLocale, 'picturesWall.upload'),
    },
    ...props,
    ref,
  } as any;
  console.log(forwardProps);
  return <PicturesWall {...forwardProps} />;
})
