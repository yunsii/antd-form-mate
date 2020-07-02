import { Form } from 'antd';

import FormMateItem from './FormMateItem';
import FormMateDynamic from './FormMateDynamic';
import { FormMate as InternalForm } from './FormMate';
import { useFormMate } from './utils';
import CascaderEntry from '../../entries/CascaderEntry';
import CheckGroupEntry from '../../entries/CheckGroupEntry';
import CustomEntry from '../../entries/CustomEntry';
import DateEntry from '../../entries/DateEntry';
import DateRangeEntry from '../../entries/DateRangeEntry';
import InputEntry from '../../entries/InputEntry';
import NumberEntry from '../../entries/NumberEntry';
import NumberRangeEntry from '../../entries/NumberRangeEntry';
import PasswordEntry from '../../entries/PasswordEntry';
import Plain from '../../entries/Plain';
import RadioGroupEntry from '../../entries/RadioGroupEntry';
import SelectEntry from '../../entries/SelectEntry';
import SliderEntry from '../../entries/SliderEntry';
import SwitchEntry from '../../entries/SwitchEntry';
import TextAreaEntry from '../../entries/TextAreaEntry';
import TimeEntry from '../../entries/TimeEntry';
import TimeRangeEntry from '../../entries/TimeRangeEntry';
import UploadEntry from '../../entries/UploadEntry';
import UploadDraggerEntry from '../../entries/UploadDraggerEntry';

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

  Cascader: typeof CascaderEntry;
  CheckGroup: typeof CheckGroupEntry;
  Custom: typeof CustomEntry;
  Date: typeof DateEntry;
  DateRange: typeof DateRangeEntry;
  Input: typeof InputEntry;
  Number: typeof NumberEntry;
  NumberRange: typeof NumberRangeEntry;
  Password: typeof PasswordEntry;
  Plain: typeof Plain;
  RadioGroup: typeof RadioGroupEntry;
  Select: typeof SelectEntry;
  Slider: typeof SliderEntry;
  Switch: typeof SwitchEntry;
  TextArea: typeof TextAreaEntry;
  Time: typeof TimeEntry;
  TimeRange: typeof TimeRangeEntry;
  Upload: typeof UploadEntry;
  UploadDragger: typeof UploadDraggerEntry;
}

const FormMate: FormMate = InternalForm as FormMate;

FormMate.useFormMate = useFormMate;
FormMate.Item = FormMateItem;
FormMate.Dynamic = FormMateDynamic;
FormMate.List = Form.List;
FormMate.Provider = Form.Provider;

FormMate.Cascader = CascaderEntry;
FormMate.CheckGroup = CheckGroupEntry;
FormMate.Custom = CustomEntry;
FormMate.Date = DateEntry;
FormMate.DateRange = DateRangeEntry;
FormMate.Input = InputEntry;
FormMate.Number = NumberEntry;
FormMate.NumberRange = NumberRangeEntry;
FormMate.Password = PasswordEntry;
FormMate.Plain = Plain;
FormMate.RadioGroup = RadioGroupEntry;
FormMate.Select = SelectEntry;
FormMate.Slider = SliderEntry;
FormMate.Switch = SwitchEntry;
FormMate.TextArea = TextAreaEntry;
FormMate.Time = TimeEntry;
FormMate.TimeRange = TimeRangeEntry;
FormMate.Upload = UploadEntry;
FormMate.UploadDragger = UploadDraggerEntry;

export default FormMate;
