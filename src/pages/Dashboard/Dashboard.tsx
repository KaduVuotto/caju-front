import * as Styled from "./styles";
import { Columns } from "./components/Columns/Columns";
import { useDashboard } from "~/hooks/useDashboard";
import { memo } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { TextField } from "~/components/TextField/TextField";
import { IconButton } from "~/components/Buttons/IconButton";
import { HiRefresh, HiSearch } from "react-icons/hi";
import { Button } from "~/components/Buttons/Button";
import { ToastContainer } from "react-toastify";

export const Dashboard = memo(() => {
  const {
    cpf,
    cpfIsValid,
    dataRegistrations,
    errorCpf,
    errorRegistrations,
    goToNewAdmissionPage,
    handleCloseDialog,
    handleConfirmButton,
    handleCpf,
    handleOpenDialog,
    loadingRegistrations,
    loadingScreen,
    openDialog,
    refresh,
    searchCpf,
    textDialog,
  } = useDashboard();

  return (
    <Styled.Container>
      <Styled.ContainerSearchAndAdmissions>
        <div>
          <Styled.Actions>
            <TextField
              cpfMask
              onChange={handleCpf}
              placeholder={"Digite aqui um CPF"}
              value={cpf}
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
        errorRegistrations={errorRegistrations}
        handleOpenDialog={handleOpenDialog}
        loadingRegistrations={loadingRegistrations}
        loadingScreen={loadingScreen}
        registrations={dataRegistrations}
      />
      <ToastContainer />
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={handleCloseDialog}
        open={openDialog}
      >
        <DialogTitle id="alert-dialog-title">Atenção</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {textDialog}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleConfirmButton} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Styled.Container>
  );
});
