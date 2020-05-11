import * as React from 'react';
import { storiesOf } from '@storybook/react';
import StringForm from './StringForm';
import NumberForm from './NumberForm';
import DateForm from './DateForm';
import PickerForm from './PickerForm';
import VariantForm from './VariantForm';
import MultiForm from './MultiForm';
import UploadForm from './UploadForm';
import PlainForm from './PlainForm';

import Select from './SelectDemo';

import PopoverForm from './PopoverForm';

import PicturesWall from './PictureWall';

storiesOf('ant-form-mate', module).add('String Form', () => <StringForm />);
storiesOf('ant-form-mate', module).add('Number Form', () => <NumberForm />);
storiesOf('ant-form-mate', module).add('Date Form', () => <DateForm />);
storiesOf('ant-form-mate', module).add('Picker Form', () => <PickerForm />);
storiesOf('ant-form-mate', module).add('Variant Form', () => <VariantForm />);
storiesOf('ant-form-mate', module).add('Upload Form', () => <UploadForm />);
storiesOf('ant-form-mate', module).add('Multi-Form', () => <MultiForm />);
storiesOf('ant-form-mate', module).add('Plain Form', () => <PlainForm />);

storiesOf('ant-form-mate components', module).add('Select', () => <Select />);

storiesOf('ant-form-mate usage', module).add('with Popover', () => <PopoverForm />);

storiesOf('antd official demo', module).add('PictureWall', () => <PicturesWall />);
