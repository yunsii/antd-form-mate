import { Form } from "antd";
import FormMateItem from "./components/FormMate/FormMateItem";

export { ConfigProvider } from "./contexts/ConfigContext";
export {
  IntlProvider,
  IntlConsumer,
  createIntl,
  IntlType,
  zhCNIntl,
  enUSIntl,
} from "./contexts/Intlcontext";

import { FormMate as InternalForm } from "./components/FormMate";

type InternalForm = typeof InternalForm;
interface FormMate extends InternalForm {
  useForm: typeof Form.useForm;
  Item: typeof FormMateItem;
  List: typeof Form.List;
  Provider: typeof Form.Provider;

  /** @deprecated Only for warning usage. Do not use. */
  create: () => void;
}

const FormMate: FormMate = InternalForm as FormMate;

FormMate.useForm = Form.useForm;
FormMate.Item = FormMateItem;
FormMate.List = Form.List;
FormMate.Provider = Form.Provider;
FormMate.create = Form.create;

export default FormMate;

export { registerComponent } from "./map";

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
