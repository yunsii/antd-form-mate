import _find from 'lodash/find';

import { ENTRY_PREFIX } from '../constants/components';

export function getEntryDisplayName(entry: Function) {
  return `${ENTRY_PREFIX}.${entry.name}`;
}

export interface Option {
  value?: any;
  label?: React.ReactNode;
  children?: Option[];
}

export function getTargetOption(value: any, options: Option[]) {
  return _find(options, { value });
}
