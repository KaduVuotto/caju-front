import { useCallback, useEffect, useState } from "react";
import { deleteAdmission } from "~/services/deleteAdmission";
import { getAllAdmissions } from "~/services/getAllAdmissions";
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
        setLoadingRegistrations(false);
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
      setLoadingRegistrations(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  return {
    dataRegistrations,
    loadingRegistrations,
    errorRegistrations,
    changeStatus,
    refresh,
    loadingScreen,
    errorScreen,
    deleteCard,
  };
};
