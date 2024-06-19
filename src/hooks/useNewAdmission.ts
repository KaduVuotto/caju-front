import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { postNewAdmission } from "~/services/postNewAdmission";
import { v4 as uuidv4 } from "uuid";
import { getCpf } from "~/services/getCpf";

export const useNewAdmission = () => {
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const [errorScreen, setErrorScreen] = useState<string>("");

  const history = useHistory();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const handleSubmit = async (values: {
    name: string;
    email: string;
    cpf: string;
    admissionDate: string;
  }) => {
    setLoadingScreen(true);
    setErrorScreen("");
    try {
      const data = await getCpf(values.cpf);
      const isValidData =
        data.lenght === 0 ||
        data[0].cpf !== values.cpf ||
        data[0].name !== values.name ||
        data[0].admissionDate !== values.admissionDate ||
        data[0].employeeName !== values.name;

      if (isValidData) {
        await postNewAdmission({
          cpf: values.cpf.replace(/\D/g, ""),
          employeeName: values.name,
          admissionDate: values.admissionDate.replace("-", "/"),
          email: values.email,
          status: "REVIEW",
          id: uuidv4(),
        });
        setTimeout(() => {
          setLoadingScreen(false);
          goToHome();
        }, 800);
      } else {
        setTimeout(() => {
          setLoadingScreen(false);
          setErrorScreen("Falha ao cadastrar admissão, CPF já cadastrado!");
        }, 800);
      }
    } catch (err) {
      setTimeout(() => {
        setLoadingScreen(false);
        setErrorScreen("Falha ao cadastrar admissão, tente novamente!");
      }, 800);
    }
  };

  useEffect(() => {}, []);

  return {
    goToHome,
    handleSubmit,
    errorScreen,
    loadingScreen,
  };
};
