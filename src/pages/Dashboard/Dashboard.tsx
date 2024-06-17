import * as Styled from "./styles";
import { Columns } from "./components/Columns/Columns";
import { useDashboard } from "~/hooks/useDashboard";
import { memo } from "react";
import { Typography } from "@mui/material";
import { TextField } from "~/components/TextField/TextField";
import { IconButton } from "~/components/Buttons/IconButton";
import { HiRefresh, HiSearch } from "react-icons/hi";
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
    refresh,
    handleCpf,
    cpf,
    errorCpf,
    searchCPF,
  } = useDashboard();

  return (
    <Styled.Container>
      <Styled.ContainerSearchAndAdmissions>
        <Styled.Actions>
          <TextField
            placeholder={"Digite um CPF válido"}
            error={errorCpf}
            value={cpf}
            onChange={handleCpf}
          />
          <div />
          <IconButton aria-label="refetch" disabled={false} onClick={searchCPF}>
            <HiSearch />
          </IconButton>
        </Styled.Actions>
        <Styled.Actions>
          <IconButton aria-label="refetch" onClick={refresh}>
            <HiRefresh />
          </IconButton>
          <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
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
