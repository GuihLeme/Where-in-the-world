import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useField } from '@unform/core';

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div className={styles.container}>
      <FiSearch size={20} color={'var(--dark-gray)'} />
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </div>
  )
}

export default Input;
