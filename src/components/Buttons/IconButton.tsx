import { memo } from "react";
import * as Styled from "./styles";

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = memo(({ children, ...props }: Props) => {
  return <Styled.IconButton {...props}>{children}</Styled.IconButton>;
});
