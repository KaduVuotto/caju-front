import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { IconButton } from "~/components/Buttons/IconButton";
import routes from "~/router/routes";
import * as Styled from "./styles";
import { Button } from "~/components/Buttons/styles";
import { TextField } from "~/components/TextField/TextField";
import { memo } from "react";

export const SearchBar = memo(() => {
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <Styled.Container>
      <TextField placeholder="Digite um CPF válido" />
      <Styled.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </Styled.Actions>
    </Styled.Container>
  );
});
