import React, { useState } from 'react';
import InputMask from 'react-input-mask';

function PhoneInput({ ...props }) {
  const [mask, setMask] = useState('(99) 9 9999-9999');
  const TEL_LENGTH = 14;
  return (
    <InputMask
      { ...props }
      mask={ mask }
      onBlur={ (e) => {
        if (e.target.value.replace('_', '').length === TEL_LENGTH) {
          setMask('(99) 9 999-9999');
        }
      } }
      onFocus={ (e) => {
        if (e.target.value.replace('_', '').length === TEL_LENGTH) {
          setMask('(99) 9 9999-9999');
        }
      } }
    >
      {(inputProps) => <input { ...inputProps } type="tel" />}
    </InputMask>
  );
}

export default PhoneInput;
