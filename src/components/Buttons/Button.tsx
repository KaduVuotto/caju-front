import * as Styled from './styles'

type Props = {
  small?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = ({small, ...props}: Props) => {
  if(small){
    return (
      <Styled.ButtonSmall {...props} />
    );
  }
  return (
    <Styled.Button {...props} />
  );
};
