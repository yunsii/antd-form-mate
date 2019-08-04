import * as React from 'react';
import { FormItemProps } from 'antd/lib/form';
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { ColProps } from 'antd/lib/col';
export declare const FormProvider: React.ProviderExoticComponent<React.ProviderProps<WrappedFormUtils<any> | null>>;
export declare const defaultExtra: {
    picture: string;
};
export declare const defaultTypeHint: {
    email: string;
};
export interface CustomFormItemProps extends FormItemProps {
    dense?: boolean;
}
export declare type ComponentType = 'custom' | 'date' | 'datetime' | 'datetime-range' | 'number' | 'select' | 'textarea' | 'password' | 'picture' | 'switch' | 'slider' | 'file-dragger' | 'location' | string;
export interface ItemConfig {
    type: ComponentType;
    field: string;
    formItemProps?: CustomFormItemProps;
    fieldProps?: GetFieldDecoratorOptions;
    componentProps?: any;
    component?: React.ElementType;
}
export interface Layout {
    labelCol?: ColProps;
    wrapperCol?: ColProps;
}
export declare const createFormItems: (itemsConfig: ItemConfig[], globalLayout?: Layout | undefined) => JSX.Element[];
