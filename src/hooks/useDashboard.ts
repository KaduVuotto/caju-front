import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import routes from "~/router/routes";
import { deleteAdmission } from "~/services/deleteAdmission";
import { getAllAdmissions } from "~/services/getAllAdmissions";
import { getCpf } from "~/services/getCpf";
import { updateStatus } from "~/services/updateStatus";
import { DataRegistrationsItem } from "~/types/interface";
import { initialStateRegistration } from "~/utils/initialStateRegistration";
import { validateCpf } from "~/utils/validateCpf";

export const useDashboard = () => {
  const [dataRegistrations, setDataRegistrations] = useState<
    DataRegistrationsItem[]
  >(initialStateRegistration);
  const [loadingRegistrations, setLoadingRegistrations] =
    useState<boolean>(false);
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const [errorRegistrations, setErrorRegistrations] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [errorCpf, setErrorCpf] = useState<string>("");

  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newAdmission);
  };

  const cpfIsValid = cpf.replace(/\D/g, "").length === 11;

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
    async (item: DataRegistrationsItem, newStatus: string) => {
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
    dataRegistrations,
    loadingRegistrations,
    errorRegistrations,
    changeStatus,
    refresh,
    loadingScreen,
    deleteCard,
    goToNewAdmissionPage,
    handleCpf,
    cpf,
    errorCpf,
    searchCpf,
    cpfIsValid,
  };
};
