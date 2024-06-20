import { memo } from "react";
import * as Styled from "./styles";
import { Skeleton } from "@mui/material";

type Props = {
  small?: boolean;
  loading?: boolean;
  disabled?: boolean;
  bgColor?: string;
  color?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = memo(
  ({ small, bgColor, color, loading, disabled, ...props }: Props) => {
    if (loading) {
      return <Skeleton data-testId="skeleton" width={"5vw"} height={"5vh"} />;
    }
    if (disabled) {
      return <Styled.Button onClick={() => null} {...props} />;
    }
    if (disabled && small) {
      return (
        <Styled.Button
          disabled={disabled}
          color={color}
          onClick={() => null}
          {...props}
        />
      );
    }
    if (small) {
      return <Styled.ButtonSmall bgColor={bgColor} color={color} {...props} />;
    }
    return <Styled.Button {...props} />;
  }
);
