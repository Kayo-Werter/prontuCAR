declare module 'react-currency-input-field' {
  import React from 'react';

  interface CurrencyInputProps {
      value?: string;
      onValueChange?: (value: string | undefined, name?: string) => void;
      decimalsLimit?: number;
      prefix?: string;
      className?: string;
      placeholder?: string;
      name?: string;
      decimalSeparator?: string;
      groupSeparator?: string;
      allowDecimals?: boolean; // Certifique-se de que isso esteja presente
      onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void; // Adiciona a propriedade onBlur
  }

  const CurrencyInput: React.FC<CurrencyInputProps>;

  export default CurrencyInput;
}
