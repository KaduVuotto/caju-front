import * as React from "react";
import * as Styled from "./styles";

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const Header = React.memo(({ children, ...props }: Props) => {
  return <Styled.Header {...props}>{children}</Styled.Header>;
});
