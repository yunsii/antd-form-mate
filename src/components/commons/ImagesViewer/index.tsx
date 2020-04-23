import React, { useContext } from "react";
import Viewer from 'react-viewer';
import ViewerProps from 'react-viewer/lib/ViewerProps';
import ConfigContext from '../../../contexts/ConfigContext/context';

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
