import { ENTRY_PREFIX } from '../constants/components';

export function getEntryDisplayName(entry: Function) {
  return `${ENTRY_PREFIX}.${entry.name}`;
}
