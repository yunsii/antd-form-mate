import * as FormMateUtils from './utils';

export { ConfigProvider } from './ConfigContext';
export { createFormItems } from './lib/form-mate';

export const utils = {
  progressXhr: FormMateUtils.progressXhr,
}

export { default as CheckGroup } from './lib/components/CustomCheckGroup';
export { default as DatePicker } from './lib/components/CustomDatePicker';
export { default as RadioGroup } from './lib/components/CustomRadioGroup';
export { default as Select } from './lib/components/CustomSelect';
export { default as Switch } from './lib/components/CustomSwitch';
export { default as Upload } from './lib/components/CustomUpload';
export { default as Dragger } from './lib/components/CustomUpload/CustomDragger';
export { default as AMap } from './lib/components/CustomAMap';
export { default as LocationPicker } from './lib/components/LocationPicker';
export { default as PicturesWall } from './lib/components/PicturesWall';

export { default as EditableTable } from './lib/components/EditableTable';
