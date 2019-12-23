import React, { useContext } from "react";
import _pick from "lodash/pick";
import _isArray from "lodash/isArray";
import _findIndex from "lodash/findIndex";
import _get from "lodash/get";
import Viewer from 'react-viewer';
import ViewerProps from 'react-viewer/lib/ViewerProps';
import ConfigContext from '../../../config-provider/context';

const ImagesViewer: React.FC<ViewerProps> = (props) => {
  const { viewerProps } = useContext(ConfigContext);
  return (
    <Viewer
      {...viewerProps}
      {...props}
    />
  );
}

export default ImagesViewer;
