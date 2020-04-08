import * as React from 'react';
import { storiesOf } from '@storybook/react';
import PicturesWall from './PictureWall';
import BasicForm from './BasicForm';
import AdvancedForm from './AdvancedForm';

storiesOf('ant-form-mate', module).add('Basic', () => <BasicForm />);

storiesOf('ant-form-mate', module).add('Advanced', () => <AdvancedForm />);

storiesOf('antd official demo', module).add('PictureWall', () => <PicturesWall />);
