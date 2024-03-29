/** ref: https://github.com/ant-design/ant-design/blob/master/components/_util/reactNode.ts */

import * as React from 'react';

export const isValidElement = React.isValidElement;

export function replaceElement(
  element: React.ReactNode,
  replacement: React.ReactNode,
  props: any
): React.ReactNode {
  if (!isValidElement(element)) return replacement;

  return React.cloneElement(
    element,
    typeof props === 'function' ? props() : props
  );
}

export function cloneElement(
  element: React.ReactNode,
  props?: any
): React.ReactElement {
  return replaceElement(element, element, props) as React.ReactElement;
}
