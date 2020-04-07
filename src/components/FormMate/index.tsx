import { Form } from "antd";
import FormMateItem from "./FormMateItem";
import FormMateDynamic from "./FormMateDynamic";

import { FormMate as InternalForm } from "./FormMate";

type InternalForm = typeof InternalForm;
interface FormMate extends InternalForm {
  useForm: typeof Form.useForm;
  Item: typeof FormMateItem;
  Dynamic: typeof FormMateDynamic;
  List: typeof Form.List;
  Provider: typeof Form.Provider;

  /** @deprecated Only for warning usage. Do not use. */
  create: () => void;
}

const FormMate: FormMate = InternalForm as FormMate;

FormMate.useForm = Form.useForm;
FormMate.Item = FormMateItem;
FormMate.Dynamic = FormMateDynamic;
FormMate.List = Form.List;
FormMate.Provider = Form.Provider;
FormMate.create = Form.create;

export default FormMate;
