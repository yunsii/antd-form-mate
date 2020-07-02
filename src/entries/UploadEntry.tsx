import React from 'react';

import CustomUpload, { CustomUploadProps } from '../components/CustomUpload';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface UpdateEntryProps extends NewFormMateItemPropsWithoutChildren<CustomUploadProps> {}

const UploadEntry: React.FC<UpdateEntryProps> = (props) => {
  return (
    <FormMateItem valuePropName='fileList' {...props}>
      <CustomUpload {...props.entryProps} />
    </FormMateItem>
  );
};

UploadEntry.displayName = `FM.${UploadEntry.name}`;

export default UploadEntry;
