import * as Styled from "./styles";
import { Columns } from "./components/Columns/Columns";
import { useDashboard } from "~/hooks/useDashboard";
import { memo } from "react";
import { Typography } from "@mui/material";
import { TextField } from "~/components/TextField/TextField";
import { IconButton } from "~/components/Buttons/IconButton";
import { HiRefresh, HiSearch } from "react-icons/hi";
import { Button } from "~/components/Buttons/Button";
import { ToastContainer } from "react-toastify";

export const Dashboard = memo(() => {
  const {
    dataRegistrations,
    changeStatus,
    loadingRegistrations,
    errorRegistrations,
    loadingScreen,
    deleteCard,
    goToNewAdmissionPage,
    refresh,
    handleCpf,
    cpf,
    errorCpf,
    searchCpf,
    cpfIsValid,
  } = useDashboard();

  return (
    <Styled.Container>
      <Styled.ContainerSearchAndAdmissions>
        <div>
          <Styled.Actions>
            <TextField
              cpfMask
              placeholder={"Digite aqui um CPF"}
              value={cpf}
              onChange={handleCpf}
            />

            <div />
            <IconButton
              aria-label="refetch"
              disabled={!cpfIsValid}
              onClick={() => searchCpf(cpf)}
            >
              <HiSearch />
            </IconButton>
          </Styled.Actions>
          <Typography variant="body1" color="red">
            {errorCpf}
          </Typography>
        </div>
        <Styled.Actions>
          <IconButton aria-label="refetch" onClick={refresh}>
            <HiRefresh />
          </IconButton>
          <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
        </Styled.Actions>
      </Styled.ContainerSearchAndAdmissions>
      <Columns
        registrations={dataRegistrations}
        changeStatus={changeStatus}
        loadingRegistrations={loadingRegistrations}
        loadingScreen={loadingScreen}
        errorRegistrations={errorRegistrations}
        deleteCard={deleteCard}
      />
      <ToastContainer />
    </Styled.Container>
  );
});
