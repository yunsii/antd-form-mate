import React from 'react';

import FormMate from '../../src';
import Wrapper from '../components/Wrapper';
import PopoverInput from '../components/PopoverInput';

export default () => {
  const [formMate] = FormMate.useFormMate();
  return (
    <Wrapper>
      <PopoverInput
        item={{
          type: 'date',
          name: 'date',
        }}
        initialValue={1565151166}
        formMate={formMate}
        run={(value) => {
          console.log(value);
        }}
      />
    </Wrapper>
  );
};
