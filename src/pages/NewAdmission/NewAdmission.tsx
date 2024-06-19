import { IconButton } from "~/components/Buttons/IconButton";
import * as Styled from "./styles";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { TextField } from "~/components/TextField/TextField";
import { Button } from "~/components/Buttons/Button";
import { memo } from "react";
import { useNewAdmission } from "~/hooks/useNewAdmission";
import { Formik, Form } from "formik";
import { validationSchemaNewAdmission } from "~/utils/validationSchemaNewAdmission";
import { CircularProgress, Typography } from "@mui/material";

export const NewAdmission = memo(() => {
  const { goToHome, handleSubmit, errorScreen, loadingScreen } =
    useNewAdmission();

  return (
    <Styled.Container>
      <Styled.Card>
        <IconButton onClick={goToHome} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        {loadingScreen ? (
          <Styled.ProgressContainer>
            <CircularProgress />
          </Styled.ProgressContainer>
        ) : (
          <Formik
            initialValues={{ name: "", email: "", cpf: "", admissionDate: "" }}
            validationSchema={validationSchemaNewAdmission}
            onSubmit={(values) => {
              if (values.cpf.replace(/\D/g, "").length === 11) {
                handleSubmit(values);
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
                  error={""}
                  value={values.name}
                />
                <Styled.Error name="name" component="div" />
                <Styled.Divisor />

                <TextField
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  error={""}
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
                  error={""}
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Styled.Error name="cpf" component="div" />
                <Styled.Divisor />

                <TextField
                  label="Data de admissão"
                  type="date"
                  error={""}
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
        {errorScreen && (
          <Styled.ErrorContainer>
            <Typography variant="body1" color={"red"}>
              {errorScreen}
            </Typography>
          </Styled.ErrorContainer>
        )}
      </Styled.Card>
    </Styled.Container>
  );
});
