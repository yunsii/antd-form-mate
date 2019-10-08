import * as React from 'react';
import { storiesOf } from '@storybook/react';
import PicturesWall from './PictureWall';
import BasicForm from './BasicForm';
import AdvancedForm from './AdvancedForm';
import AMap from './AMap';
import EditableTable from './EditableTable';

storiesOf('ant-form-mate', module)
  .add('Basic', () => <BasicForm />);

storiesOf('ant-form-mate', module)
  .add('Advanced', () => <AdvancedForm />);

storiesOf('custom components', module)
  .add('EditableTable', () => <EditableTable />)
  .add('AMap', () => <AMap />);

storiesOf('antd official components', module)
  .add('PictureWall', () => <PicturesWall />);
