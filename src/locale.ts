export const picturesWallLocale = {
  upload: '上传',
}
export type PicturesWallLocale = {
  upload?: string;
}
export function setPicturesWallLocale(config: PicturesWallLocale) {
  if (config.upload !== undefined) {
    picturesWallLocale.upload = config.upload;
  }
}

export const draggerLocale = {
  upload: '点击或拖拽文件到此处上传',
}
export type DraggerLocale = {
  upload?: string;
}
export function setDraggerLocale(config: DraggerLocale) {
  if (config.upload !== undefined) {
    draggerLocale.upload = config.upload;
  }
}

export const mapLocale = {
  currentAddress: '当前地址：',
  addressPickPlaceholder: '请选择地址',
  addressInputPlaceholder: '请输入地址'
}
export type MapLocale = {
  currentAddress?: string;
  addressPickPlaceholder?: string;
  addressInputPlaceholder?: string;
}
export function setMapLocale(config: MapLocale) {
  if (config.currentAddress !== undefined) {
    mapLocale.currentAddress = config.currentAddress;
  }
  if (config.addressPickPlaceholder !== undefined) {
    mapLocale.addressPickPlaceholder = config.addressPickPlaceholder;
  }
  if (config.addressInputPlaceholder !== undefined) {
    mapLocale.addressInputPlaceholder = config.addressInputPlaceholder;
  }
}
