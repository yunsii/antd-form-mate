export { ConfigProvider } from "./contexts/ConfigContext";
export {
  IntlProvider,
  IntlConsumer,
  createIntl,
  IntlType,
  zhCNIntl,
  enUSIntl,
} from "./contexts/Intlcontext";
export { default as createFormItems, FormMate } from "./components/FormMate";
export { registerComponent } from "./map";
export { defaultItemLayout } from "./defaultConfig";

export { default as Upload } from "./components/commons/CustomUpload";
export { default as ImagesViewer } from "./components/commons/ImagesViewer";

export { default as CheckGroup } from "./components/CustomCheckGroup";
export { default as DatePicker } from "./components/CustomDatePicker";
export { default as RadioGroup } from "./components/CustomRadioGroup";
export { default as Select } from "./components/CustomSelect";
export { default as Switch } from "./components/CustomSwitch";
export { default as Dragger } from "./components/CustomDragger";
export { default as PicturesWall } from "./components/PicturesWall";
export { default as InputNumberRange } from "./components/InputNumberRange";

export { getBase64, getImageDimension, progressXhr } from "./utils/commons";
