import * as Styled from "./styles";

type Props = {
  small?: boolean;
  bgcolor?: string;
  color?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button = ({ small, bgcolor, color, ...props }: Props) => {
  if (small) {
    return <Styled.ButtonSmall bgcolor={bgcolor} color={color} {...props} />;
  }
  return <Styled.Button {...props} />;
};
