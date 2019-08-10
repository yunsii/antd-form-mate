export const picturesWallLacale = {
  upload: '上传',
}

export type PicturesWallLacale = {
  upload?: string;
}

export function setPicturesWallLocalLocale(config: PicturesWallLacale) {
  if (config.upload !== undefined) {
    picturesWallLacale.upload = config.upload;
  }
}

export const draggerLacale = {
  upload: '点击或拖拽文件到此处上传',
}

export type DraggerLacale = {
  upload?: string;
}

export function setDraggerLacale(config: DraggerLacale) {
  if (config.upload !== undefined) {
    draggerLacale.upload = config.upload;
  }
}
