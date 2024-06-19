import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { postNewAdmission } from "~/services/postNewAdmission";
import { v4 as uuidv4 } from "uuid";
import { getCpf } from "~/services/getCpf";
import { toast } from "react-toastify";

export const useNewAdmission = () => {
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);

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
    handleSubmit,
    loadingScreen,
  };
};
