import { useCallback, useEffect, useState } from "react";
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
      setLoadingScreen(false);
    }
  }, []);

  const changeStatus = useCallback(
    async (item: DataRegistrationsItem, newStatus: string) => {
      setErrorRegistrations("");
      setLoadingRegistrations(true);
      try {
        const response = await updateStatus(item, newStatus);
        setDataRegistrations((prevState) =>
          prevState.map((itemList) =>
            itemList.id === item.id ? { ...response } : itemList
          )
        );
      } catch (err) {
        setErrorRegistrations("Falha ao atualizar o status, tente novamente!");
      } finally {
        setLoadingRegistrations(false);
      }
    },
    []
  );

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
  };
};
