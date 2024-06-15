import { InputHTMLAttributes } from "react";
import * as Styled from "./styles";
import { memo } from "react";

type Props = {
  label?: string;
  error?: string;
  id?: string;
} & InputHTMLAttributes<any>;

export const TextField = memo(({ id, label, error, ...props }: Props) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <Styled.Input {...props} />
      <Styled.Span>{error}</Styled.Span>
    </div>
  );
});
