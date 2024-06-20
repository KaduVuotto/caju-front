import * as Yup from "yup";
import { validateCpf } from "./validateCpf";

export const validationSchemaNewAdmission = Yup.object().shape({
  name: Yup.string()
    .required("Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 3 caracteres")
    .matches(
      /^(?![\d])[A-Za-zÀ-ÿ ']{2,}(?: [A-Za-zÀ-ÿ ']+)+$/,
      "Nome deve conter pelo menos um espaço, no mínimo duas letras e a primeira letra não pode ser um número!"
    ),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  cpf: Yup.string()
    .required("CPF é obrigatório")
    .test("valid-cpf", "CPF inválido", (value) => validateCpf(value)),
  admissionDate: Yup.date()
    .required("Data de admissão é obrigatória")
    .max(new Date(), "Data de admissão não pode ser no futuro")
    .typeError("Data de admissão inválida"),
});
