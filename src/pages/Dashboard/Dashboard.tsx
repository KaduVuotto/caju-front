import * as Styled from "./styles";
import { Columns } from "./components/Columns/Columns";
import { useDashboard } from "~/hooks/useDashboard";
import { memo } from "react";
import { Typography } from "@mui/material";
import { TextField } from "~/components/TextField/TextField";
import { IconButton } from "~/components/Buttons/IconButton";
import { HiRefresh } from "react-icons/hi";
import { Button } from "~/components/Buttons/Button";

export const Dashboard = memo(() => {
  const {
    dataRegistrations,
    changeStatus,
    loadingRegistrations,
    errorRegistrations,
    loadingScreen,
    errorScreen,
    deleteCard,
    goToNewAdmissionPage,
    refresh
  } = useDashboard();

  return (
    <Styled.Container>
      <Styled.ContainerSearchAndAdmissions>
        <TextField placeholder="Digite um CPF válido" />
        <Styled.Actions>
          <IconButton aria-label="refetch" onClick={() => refresh()}>
            <HiRefresh />
          </IconButton>
          <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
        </Styled.Actions>
      </Styled.ContainerSearchAndAdmissions>
      {errorScreen ? (
        <Styled.ErrorContainer>
          <Typography variant="body1">{errorScreen}</Typography>
        </Styled.ErrorContainer>
      ) : (
        <Columns
          registrations={dataRegistrations}
          changeStatus={changeStatus}
          loadingRegistrations={loadingRegistrations}
          loadingScreen={loadingScreen}
          errorRegistrations={errorRegistrations}
          deleteCard={deleteCard}
        />
      )}
    </Styled.Container>
  );
});
