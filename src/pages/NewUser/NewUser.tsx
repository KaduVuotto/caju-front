import TextField from "~/components/TextField";
import * as Styled from "./styles";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { Button } from "~/components/Buttons/styles";

export const NewUser = () => {
  const history = useHistory();
  
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <Styled.Container>
      <Styled.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField placeholder="Nome" label="Nome" />
        <TextField placeholder="Email" label="Email" type="email" />
        <TextField placeholder="CPF" label="CPF" />
        <TextField label="Data de admissão" type="date" />
        <Button onClick={() => {}}>Cadastrar</Button>
      </Styled.Card>
    </Styled.Container>
  );
};