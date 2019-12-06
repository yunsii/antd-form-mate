import React from 'react';
import { Divider } from 'antd';
import _keys from "lodash/keys";
import _cloneDeep from "lodash/cloneDeep";
import _pick from "lodash/pick";
import _flatten from "lodash/flatten";

export function isDevelopEnv() {
  return process.env.NODE_ENV === 'development';
}

export function getBase64(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function getImageDimension(imageUrl: string): Promise<{ width: number, height: number }> {
  const img = new Image();
  img.src = imageUrl;
  return new Promise((resolve, reject) => {
    let set: any;
    const check = () => {
      if (img.width > 0 || img.height > 0) {
        if (set) clearInterval(set);
        resolve({
          width: img.width,
          height: img.height,
        });
      }
    };
    set = setInterval(check, 40);
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = () => {
      reject(new Error(`load ${imageUrl} fail.`));
    };
  });
}

export function sizeOfFile(file: File) {
  const { size } = file;
  return size;
}

export function setResponse(response: XMLHttpRequest['response']) {
  let result: any;
  try {
    result = JSON.parse(response);
  } catch (err) {
    result = _cloneDeep(response);
  }
  return result;
}

export type OnEvent = (xhr: XMLHttpRequest, ev: ProgressEvent) => void;
export type ProgressEventData = {
  method: string;
  data: Document | BodyInit | null;
  headers?: {
    [k: string]: any;
  };
  withCredentials?: boolean;
}
export type ProgressEventEvents = {
  onProgress: OnEvent,
  onTimeout?: OnEvent,
}
export const progressXhr: (url: string, data: ProgressEventData, events: ProgressEventEvents) => Promise<any> = (
  url,
  {
    method,
    data,
    headers,
    withCredentials = true,
  },
  {
    onProgress = () => { },
    onTimeout = () => { },
  },
) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (headers) {
      _keys(headers).forEach(item => {
        xhr.setRequestHeader(item, headers[item]);
      })
    } else {
      xhr.setRequestHeader('Accept', 'application/json');
    }
    xhr.withCredentials = withCredentials;
    xhr.addEventListener('load', (ev) => {
      resolve(setResponse(xhr.response))
    });
    xhr.upload.addEventListener("progress", (ev) => {
      onProgress(xhr, ev);
    }, false);
    xhr.addEventListener('error', (ev) => {
      reject({ type: 'error', xhr, progressEvent: ev });
    });
    xhr.addEventListener('timeout', (ev) => {
      onTimeout(xhr, ev);
      reject({ type: 'timeout', xhr, progressEvent: ev })
    });
    xhr.send(data);
  })
}

export function addDivider(actions: React.ReactNode[]) {
  return _flatten(
    actions.map((item, index) => {
      if (index + 1 < actions.length) {
        return [item, <Divider key={`${index}_divider`} type="vertical" />];
      }
      return [item];
    })
  );
}
