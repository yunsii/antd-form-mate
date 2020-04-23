import { Form } from 'antd';

import FormMateItem from './FormMateItem';
import FormMateDynamic from './FormMateDynamic';
import { FormMate as InternalForm } from './FormMate';
import { useFormMate } from './utils';

type InternalForm = typeof InternalForm;

/**
 * 让表单使用更轻松
 */
interface FormMate extends InternalForm {
  useFormMate: typeof useFormMate;
  Item: typeof FormMateItem;
  Dynamic: typeof FormMateDynamic;
  List: typeof Form.List;
  Provider: typeof Form.Provider;
}

const FormMate: FormMate = InternalForm as FormMate;

FormMate.useFormMate = useFormMate;
FormMate.Item = FormMateItem;
FormMate.Dynamic = FormMateDynamic;
FormMate.List = Form.List;
FormMate.Provider = Form.Provider;

export default FormMate;
