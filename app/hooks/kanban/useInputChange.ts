import React, { useState } from 'react';

export function useInputChange(initialValue: string) {
  const [ isChanging, setIsChanging ] = useState<boolean>(false);
  const [ value, setValue ] = useState<string>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement >) => {
    const newVal = e.currentTarget.value;
    if (!newVal || newVal === initialValue) {
      setIsChanging(false);
      return false;
    }
    setValue(newVal);
    setIsChanging(true);
  };

  return {
    isChanging,
    setIsChanging,
    value,
    onChange: handleChange,
  };
}