import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { deleteAdmission } from "~/services/deleteAdmission";
import { getAllAdmissions } from "~/services/getAllAdmissions";
import { getCpf } from "~/services/getCpf";
import { updateStatus } from "~/services/updateStatus";
import { DataRegistrationsItem } from "~/types/interface";
import { initialStateRegistration } from "~/utils/initialStateRegistration";

export const useDashboard = () => {
  const [dataRegistrations, setDataRegistrations] = useState<
    DataRegistrationsItem[]
  >(initialStateRegistration);
  const [loadingRegistrations, setLoadingRegistrations] =
    useState<boolean>(false);
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const [errorRegistrations, setErrorRegistrations] = useState<string>("");
  const [errorScreen, setErrorScreen] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [errorCpf, setErrorCpf] = useState<string>("");

  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const refresh = useCallback(async () => {
    setLoadingScreen(true);
    setErrorScreen("");
    try {
      const data = await getAllAdmissions();
      setDataRegistrations(data);
    } catch (err) {
      setErrorScreen("Falha ao buscar admissões, tente novamente!");
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
      } catch (err) {
        setErrorRegistrations("Falha ao atualizar o status, tente novamente!");
      } finally {
        setTimeout(() => setLoadingRegistrations(false), 800);
      }
    },
    []
  );

  const deleteCard = useCallback(async (item: DataRegistrationsItem) => {
    setErrorRegistrations("");
    setLoadingRegistrations(true);
    try {
      await deleteAdmission(item);
      const data = await getAllAdmissions();
      setDataRegistrations(data);
    } catch (err) {
      setErrorRegistrations("Falha ao atualizar o status, tente novamente!");
    } finally {
      setTimeout(() => setLoadingRegistrations(false), 800);
    }
  }, []);

  const handleCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
    console.log("cpf", cpf);
  };

  const searchCPF = useCallback(async () => {
    setLoadingScreen(true);
    setErrorScreen("");
    setErrorCpf("");
    try {
      const data = await getCpf(cpf);
      console.log("data", data);
      if (data.length === 0) {
        setErrorCpf("CPF não encontrado!");
      } else {
        setDataRegistrations(data);
      }
      console.log("dataRegistrations", dataRegistrations);
    } catch (err) {
      setErrorCpf("Falha ao buscar CPF, tente novamente!");
    } finally {
      setTimeout(() => setLoadingScreen(false), 800);
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
    errorScreen,
    deleteCard,
    goToNewAdmissionPage,
    handleCpf,
    cpf,
    errorCpf,
    searchCPF,
  };
};
