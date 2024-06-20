import { memo } from "react";
import * as Styled from "./styles";

type Props = {
  children?: React.ReactNode;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = memo(({ children, disabled, ...props }: Props) => {
  if (disabled) {
    return (
      <Styled.IconButton disabled={disabled} {...props}>
        {children}
      </Styled.IconButton>
    );
  }
  return <Styled.IconButton {...props}>{children}</Styled.IconButton>;
});
