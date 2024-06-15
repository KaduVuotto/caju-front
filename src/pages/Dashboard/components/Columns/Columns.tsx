import * as Styled from "./styles";
import { RegistrationCard } from "../RegistrationCard/RegistrationCard";
import { DataListItem } from "~/types/interface";
import * as React from "react";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  registrations?: DataListItem[];
};

export const Columns = React.memo(({ registrations }: Props) => {
  return (
    <Styled.Container>
      {allColumns.map((collum, index) => {
        return (
          <Styled.Column status={collum.status} key={index}>
            <>
              <Styled.TitleColumn status={collum.status}>
                {collum.title}
              </Styled.TitleColumn>
              <Styled.CollumContent>
                {registrations?.map((registration, index) => {
                  if (collum.status === registration.status) {
                    return (
                      <RegistrationCard
                        item={registration}
                        key={registration.id}
                      />
                    );
                  }
                  return <div key={index}></div>;
                })}
              </Styled.CollumContent>
            </>
          </Styled.Column>
        );
      })}
    </Styled.Container>
  );
});
