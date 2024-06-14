import * as Styled from "./styles";
import { RegistrationCard } from "../RegistrationCard/RegistrationCard";
import { DataListItem } from "~/types/interface";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  registrations?: DataListItem[];
};

export const Columns = ({ registrations }: Props) => {
  return (
    <Styled.Container>
      {allColumns.map((collum) => {
        return (
          <Styled.Column status={collum.status} key={collum.title}>
            <>
              <Styled.TitleColumn status={collum.status}>
                {collum.title}
              </Styled.TitleColumn>
              <Styled.CollumContent>
                {registrations?.map((registration) => {
                  if (collum.status === registration.status) {
                    return (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                      />
                    );
                  }
                  return <></>;
                })}
              </Styled.CollumContent>
            </>
          </Styled.Column>
        );
      })}
    </Styled.Container>
  );
};
