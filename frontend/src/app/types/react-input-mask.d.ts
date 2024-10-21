/*
A biblioteca react-input-mask não fornece um arquivo de
declarações de tipos TypeScript (.d.ts) na sua instalação padrão.
O TypeScript precisa desse arquivo para entender os tipos e as
propriedades da biblioteca.
*/

declare module 'react-input-mask' {
  import * as React from 'react';

  export interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string;
    alwaysShowMask?: boolean;
    beforeMaskedValueChange?: (newState: { value: string; selection: { start: number; end: number }; }, oldState: { value: string; selection: { start: number; end: number }; }, userInput: string | undefined) => { value: string; selection: { start: number; end: number }; };
  }

  const InputMask: React.FC<InputMaskProps>;

  export default InputMask;
}
  