import { useCallback, useState } from 'react';

export default (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeValue, setValue];
};
