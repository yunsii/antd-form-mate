import * as React from 'react';
import { Select, Input } from 'antd';

import Wrapper from '../components/Wrapper';
import { Select as CSelect } from '../../src';

const separatorWidth = 36;
const inputWidth = `calc(50% - ${separatorWidth / 2}px)`;
// const inputWidth = `120px`;

export default () => {
  return (
    <Wrapper>
      <div>antd select</div>
      <Select style={{ width: '50%' }} loading />
      <br />
      <div>custom select</div>
      <CSelect style={{ width: '50%' }} loading />
      <br />
      <div>input group with custom select</div>
      <Input.Group compact>
        <CSelect
          style={{
            width: inputWidth,
          }}
        />
        <CSelect
          style={{
            width: inputWidth,
          }}
        />
      </Input.Group>
    </Wrapper>
  );
};
