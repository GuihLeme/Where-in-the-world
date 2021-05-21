import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useField } from '@unform/core';

import styles from './styles.module.scss';
import { useTheme } from '../../hooks/ThemeContext';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const { isDarkMode } = useTheme();
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
    <div className={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <FiSearch size={20} />
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        name="inputSearch"
        {...rest}
      />
    </div>
  )
}

export default Input;
