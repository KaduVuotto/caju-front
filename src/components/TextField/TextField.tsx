import { InputHTMLAttributes } from "react";
import * as Styled from "./styles";
import { memo } from "react";

type Props = {
  error: string;
  value: string | number | readonly string[] | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = memo(
  ({ error, value, onChange, ...props }: Props) => {
    return (
      <div>
        <Styled.Input
          mask="999.999.999-99"
          value={value}
          onChange={onChange}
          {...props}
        />
        <Styled.Span>{error}</Styled.Span>
      </div>
    );
  }
);
