import { useState } from 'react';

function useInput({
  initValue = '',
  type = 'text',
  validateFunc,
  label = '',
  name = '',
  id = '',
  autoComplete = '',
}) {
  const [value, setValue] = useState(initValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const clearHandler = () => {
    setValue('');
  };

  const getValue = () => {
    return value;
  };

  const validate = () => {
    return typeof validateFunc === 'function' ? validateFunc(value) : true;
  };

  return {
    forTag: {
      onChange,
      value,
      type,
      label,
      name,
      id,
      autoComplete,
    },
    clear: clearHandler,
    isValid: validate,
    getValue,
  };
}

export default useInput;
