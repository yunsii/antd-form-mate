import React from 'react';
import { UploadFile } from 'antd/lib/upload/interface';

import { getEntryDisplayName } from './utils';
import { cloneElement } from '../utils/reactNode';
import CustomUpload, { CustomUploadProps } from '../components/CustomUpload';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface UpdateEntryProps
  extends NewFormMateItemPropsWithoutChildren<UploadFile[] | undefined, CustomUploadProps> {}

const UploadEntry: React.FC<UpdateEntryProps> = (props) => {
  return (
    <FormMateItem
      valuePropName='fileList'
      plainRender={({ children, entryProps }) => cloneElement(children, { ...entryProps, disabled: true })}
      {...props}
    >
      <CustomUpload {...props.entryProps} />
    </FormMateItem>
  );
};

UploadEntry.displayName = getEntryDisplayName(UploadEntry);

export default UploadEntry;
