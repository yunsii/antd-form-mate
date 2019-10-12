import React from "react";
import { Icon, Modal } from "antd";
import _isArray from "lodash/isArray";
import { UploadFile } from 'antd/lib/upload/interface';
import CustomUpload, {
  setFileList,
  CustomUploadPorps,
  filterFileList,
} from "../CustomUpload/index";
import { picturesWallLocale } from '../../../locale';
import { imageFormatLimit } from '../../../config';
import { getBase64 } from '../../../utils';
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
}

export interface PicturesWallState {
  previewVisible: boolean;
  previewImage: string;
  fileList: any[];
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
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
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
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{picturesWallLocale.upload}</div>
      </div>
    );
    return (
      <div className={`${styles.pictureWall} clearfix`}>
        <CustomUpload
          accept={imageFormatLimit}
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
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
