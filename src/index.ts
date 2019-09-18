import * as FormMateConfig from './config';
import * as FormMateLocale from './locale';
import {
  setDefaultExtra,
  setDefaultTypeHint,
  setDefaultTypeRule,
} from './lib/form-mate';

export { createFormItems } from './lib/form-mate';

export const config = {
  setDefaultExtra,
  setDefaultTypeHint,
  setDefaultTypeRule,
  setCommenStyle: FormMateConfig.setCommenStyle,
  setCommenProps: FormMateConfig.setCommenProps,
  setUploadConfig: FormMateConfig.setUploadConfig,
  setPictureConfig: FormMateConfig.setPictureConfig,
};

export const locale = {
  setPicturesWallLocale: FormMateLocale.setPicturesWallLocale,
  setDraggerLocale: FormMateLocale.setDraggerLocale,
};
