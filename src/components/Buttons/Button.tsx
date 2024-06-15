import { memo } from "react";
import * as Styled from "./styles";

type Props = {
  small?: boolean;
  bgcolor?: string;
  color?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button = memo(
  ({ small, bgcolor, color, ...props }: Props) => {
    if (small) {
      return <Styled.ButtonSmall bgcolor={bgcolor} color={color} {...props} />;
    }
    return <Styled.Button {...props} />;
  }
);
