import React from 'react';

import { getEntryDisplayName } from './utils';
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

UploadEntry.displayName = getEntryDisplayName(UploadEntry);

export default UploadEntry;
