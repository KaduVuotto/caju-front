import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { postNewAdmission } from "~/services/postNewAdmission";
import { v4 as uuidv4 } from "uuid";
import { getCpf } from "~/services/getCpf";
import { toast } from "react-toastify";
import { FormNewAdmission } from "~/types/interface";
import { initialStateForm } from "~/utils/initialStateForm";

export const useNewAdmission = () => {
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [form, setForm] = useState<FormNewAdmission>(initialStateForm);

  const history = useHistory();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const handleClickOpen = (values: FormNewAdmission) => {
    setOpenDialog(true);
    setForm(values);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    handleClose();
    handleSubmit(form);
  };

  const handleSubmit = async (values: FormNewAdmission) => {
    const formattedCpf = values.cpf.replace(/\D/g, "");
    const formattedAdmissionDate = values.admissionDate.replace(/-/g, "/");
    setLoadingScreen(true);
    try {
      const data = await getCpf(values.cpf);

      if (data.length === 0) {
        await postNewAdmission({
          cpf: formattedCpf,
          employeeName: values.name,
          admissionDate: formattedAdmissionDate,
          email: values.email,
          status: "REVIEW",
          id: uuidv4(),
        });
        setTimeout(() => {
          setLoadingScreen(false);
          goToHome();
          setForm(initialStateForm);
        }, 1200);
        toast.success("Cadastro realizado com sucesso!");
      } else {
        setTimeout(() => {
          setLoadingScreen(false);
          toast.error("Falha ao cadastrar admissão, CPF já cadastrado!");
        }, 800);
      }
    } catch (err) {
      setTimeout(() => {
        setLoadingScreen(false);
        toast.error("Falha ao cadastrar admissão, tente novamente!");
      }, 800);
    }
  };

  useEffect(() => {}, []);

  return {
    goToHome,
    handleClickOpen,
    handleClose,
    handleConfirm,
    loadingScreen,
    openDialog,
  };
};
