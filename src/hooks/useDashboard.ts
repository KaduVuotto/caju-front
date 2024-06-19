import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import routes from "~/router/routes";
import { deleteAdmission } from "~/services/deleteAdmission";
import { getAllAdmissions } from "~/services/getAllAdmissions";
import { getCpf } from "~/services/getCpf";
import { updateStatus } from "~/services/updateStatus";
import { DialogFrom, RegistrationStatus } from "~/types/emuns";
import { DataRegistrationsItem } from "~/types/interface";
import { initialStateRegistration } from "~/utils/initialStateRegistration";
import { validateCpf } from "~/utils/validateCpf";

export const useDashboard = () => {
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);

  const [dataRegistrations, setDataRegistrations] = useState<
    DataRegistrationsItem[]
  >(initialStateRegistration);
  const [loadingRegistrations, setLoadingRegistrations] =
    useState<boolean>(false);
  const [errorRegistrations, setErrorRegistrations] = useState<string>("");

  const [cpf, setCpf] = useState<string>("");
  const [errorCpf, setErrorCpf] = useState<string>("");

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [textDialog, setTextDialog] = useState<string>("");

  const [cardRegistration, setCardRegistration] =
    useState<DataRegistrationsItem>(initialStateRegistration[0]);
  const [statusCardRegistration, setStatusCardRegistration] =
    useState<RegistrationStatus>(RegistrationStatus.REVIEW);
  const [dialogFrom, setDialogFrom] = useState("");

  const cpfIsValid = cpf.replace(/\D/g, "").length === 11;

  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newAdmission);
  };

  const handleCloseDialog = () => {
    setStatusCardRegistration(RegistrationStatus.REVIEW);
    setCardRegistration(initialStateRegistration[0]);
    setDialogFrom("");
    setOpenDialog(false);
  };

  const handleOpenDialog = (
    from: DialogFrom,
    item: DataRegistrationsItem,
    newStatus?: RegistrationStatus
  ) => {
    if (from === DialogFrom.STATUS) {
      setTextDialog("Deseja realmente alterar o status do registro?");
      setDialogFrom(DialogFrom.STATUS);
    } else {
      setTextDialog("Deseja realmente excluir o registro?");
      setDialogFrom(DialogFrom.DELETE);
    }
    newStatus && setStatusCardRegistration(newStatus);
    setCardRegistration(item);
    setOpenDialog(true);
  };

  const handleConfirmButton = () => {
    if (dialogFrom === DialogFrom.STATUS) {
      changeStatus(cardRegistration, statusCardRegistration);
    } else {
      deleteCard(cardRegistration);
    }
    handleCloseDialog();
  };

  const refresh = useCallback(async () => {
    setLoadingScreen(true);
    try {
      const data = await getAllAdmissions();
      setDataRegistrations(data);
      toast.success("Atualização da página realizada com sucesso!");
    } catch (err) {
      toast.error("Falha ao buscar admissões, tente novamente!");
    } finally {
      setTimeout(() => setLoadingScreen(false), 800);
    }
  }, []);

  const changeStatus = useCallback(
    async (item: DataRegistrationsItem, newStatus: RegistrationStatus) => {
      setErrorRegistrations("");
      setLoadingRegistrations(true);
      try {
        await updateStatus(item, newStatus);
        const data = await getAllAdmissions();
        setDataRegistrations(data);
        toast.success("Status alterado com sucesso!");
      } catch (err) {
        toast.error("Falha ao atualizar o status, tente novamente!");
      } finally {
        setTimeout(() => setLoadingRegistrations(false), 800);
      }
    },
    []
  );

  const deleteCard = useCallback(async (item: DataRegistrationsItem) => {
    setLoadingRegistrations(true);
    try {
      await deleteAdmission(item);
      const data = await getAllAdmissions();
      setDataRegistrations(data);
      toast.success("Registro excluído alterado com sucesso!");
    } catch (err) {
      toast.error("Falha ao excluir o registro, tente novamente!");
    } finally {
      setTimeout(() => setLoadingRegistrations(false), 800);
    }
  }, []);

  const handleCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCpf(value);
    if (value.replace(/\D/g, "").length === 11) {
      searchCpf(value);
    }
  };

  const searchCpf = useCallback(async (value: string) => {
    const isValidCPF = validateCpf(value);
    setErrorCpf("");

    if (isValidCPF) {
      setLoadingScreen(true);
      try {
        const data = await getCpf(value);
        if (data.length === 0) {
          toast.error("CPF não encontrado!");
        } else {
          setDataRegistrations(data);
          toast.success("Busca realizada!");
        }
      } catch (err) {
        toast.error("Falha ao buscar CPF, tente novamente!");
      } finally {
        setTimeout(() => setLoadingScreen(false), 800);
      }
    } else {
      setErrorCpf("Informe um CPF válido!");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {}, [dataRegistrations]);

  return {
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
  };
};
