export { ConfigProvider } from './contexts/ConfigContext';
export type { IntlProvider, IntlConsumer, createIntl, IntlType, zhCNIntl, enUSIntl } from './contexts/Intlcontext';

import FormMate from './components/FormMate';
export default FormMate;

export { default as CoreUpload } from './components/CoreUpload';
export { default as ImagesViewer } from './components/commons/ImagesViewer';

export { default as CheckGroup } from './components/CustomCheckGroup';
export { default as RadioGroup } from './components/CustomRadioGroup';
export { default as Select } from './components/CustomSelect';
export { default as UploadDragger } from './components/CustomUploadDragger';
export { default as CustomUpload } from './components/CustomUpload';
export { default as InputNumberRange } from './components/InputNumberRange';

export { getBase64, getImageDimension, progressXhr } from './utils/commons';
