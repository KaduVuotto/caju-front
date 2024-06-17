import { memo } from "react";
import * as Styled from "./styles";
import { Skeleton } from "@mui/material";

type Props = {
  small?: boolean;
  loading?: boolean;
  bgcolor?: string;
  color?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button = memo(
  ({ small, bgcolor, color, loading, ...props }: Props) => {
    if (loading) {
      return <Skeleton width={'5vw'} height={'5vh'} />;
    }
    if (small) {
      return <Styled.ButtonSmall bgcolor={bgcolor} color={color} {...props} />;
    }
    return <Styled.Button {...props} />;
  }
);
