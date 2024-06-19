import { IconButton } from "~/components/Buttons/IconButton";
import * as Styled from "./styles";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { TextField } from "~/components/TextField/TextField";
import { Button } from "~/components/Buttons/Button";
import { memo } from "react";
import { useNewAdmission } from "~/hooks/useNewAdmission";
import { Formik, Form } from "formik";
import { validationSchemaNewAdmission } from "~/utils/validationSchemaNewAdmission";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NewAdmission = memo(() => {
  const {
    goToHome,
    handleClickOpen,
    handleClose,
    handleConfirm,
    loadingScreen,
    openDialog,
  } = useNewAdmission();

  return (
    <Styled.Container>
      <Styled.Card>
        <IconButton onClick={goToHome} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        {loadingScreen ? (
          <Styled.ProgressContainer>
            <CircularProgress color="success" />
          </Styled.ProgressContainer>
        ) : (
          <Formik
            initialValues={{ name: "", email: "", cpf: "", admissionDate: "" }}
            validationSchema={validationSchemaNewAdmission}
            onSubmit={(values) => {
              if (values.cpf.replace(/\D/g, "").length === 11) {
                handleClickOpen(values);
              }
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <TextField
                  label="Nome"
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <Styled.Error name="name" component="div" />
                <Styled.Divisor />

                <TextField
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Styled.Error name="email" component="div" />
                <Styled.Divisor />

                <TextField
                  label="CPF"
                  type=""
                  id="cpf"
                  name="cpf"
                  cpfMask
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Styled.Error name="cpf" component="div" />
                <Styled.Divisor />

                <TextField
                  label="Data de admissão"
                  type="date"
                  value={values.admissionDate}
                  id="admissionDate"
                  name="admissionDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Styled.Error name="admissionDate" component="div" />
                <Styled.Divisor />

                <Button type="submit">Cadastrar</Button>
              </Form>
            )}
          </Formik>
        )}
      </Styled.Card>
      <ToastContainer />
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Atenção</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja realizar o cadastro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Styled.Container>
  );
});
