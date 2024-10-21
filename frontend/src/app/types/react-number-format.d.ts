declare module 'react-number-format' {
    import * as React from 'react';
  
    export interface NumberFormatProps {
      value?: string | number;
      onValueChange?: (values: { value: string; floatValue: number | undefined }) => void;
      thousandSeparator?: boolean | string;
      decimalSeparator?: string;
      decimalScale?: number;
      fixedDecimalScale?: boolean;
      prefix?: string;
      placeholder?: string;
      className?: string;
      name?: string;
      // Adicione outras props que você precisar
    }
  
    export default class NumberFormat extends React.Component<NumberFormatProps> {}
}
  