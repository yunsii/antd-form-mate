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
