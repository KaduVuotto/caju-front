import { IconButton } from "~/components/Buttons/IconButton";
import * as Styled from "./styles";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { TextField } from "~/components/TextField/TextField";
import { Button } from "~/components/Buttons/Button";
import { ChangeEvent, memo } from "react";

export const NewAdmission = memo(() => {
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
        <TextField
          placeholder="Nome"
          label="Nome"
          error={""}
          value={""}
          onChange={() => {}}
        />
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          error={""}
          value={""}
          onChange={() => {}}
        />
        <TextField
          placeholder="CPF"
          label="CPF"
          error={""}
          value={""}
          onChange={() => {}}
        />
        <TextField
          label="Data de admissão"
          type="date"
          error={""}
          value={""}
          onChange={() => {}}
        />
        <Button onClick={() => {}}>Cadastrar</Button>
      </Styled.Card>
    </Styled.Container>
  );
});
