import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import { EditableColumnProps } from "./index";

export function setRenderForColumn(column: EditableColumnProps<any>) {
  if (column.render !== undefined) return column;
  const options = _get(column, 'formItemConfig.componentProps.options');
  if (_isArray(options) && options.length) {
    column.render = (value) => {
      const target = options.find(item => item.value === value);
      if (target) {
        return target.text;
      }
      return '-';
    }
  }
  return column;
}
