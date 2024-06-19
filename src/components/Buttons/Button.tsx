import { memo } from "react";
import * as Styled from "./styles";
import { Skeleton } from "@mui/material";

type Props = {
  small?: boolean;
  loading?: boolean;
  disabled?: boolean;
  bgcolor?: string;
  color?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = memo(
  ({ small, bgcolor, color, loading, disabled, ...props }: Props) => {
    if (loading) {
      return <Skeleton width={"5vw"} height={"5vh"} />;
    }
    if (disabled) {
      return <Styled.Button onClick={() => null} {...props} />;
    }
    if (disabled && small) {
      return (
        <Styled.Button
          bgcolor={bgcolor}
          color={color}
          onClick={() => null}
          {...props}
        />
      );
    }
    if (small) {
      return <Styled.ButtonSmall bgcolor={bgcolor} color={color} {...props} />;
    }
    return <Styled.Button {...props} />;
  }
);
