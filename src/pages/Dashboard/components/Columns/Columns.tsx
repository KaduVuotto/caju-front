import * as Styled from "./styles";
import { RegistrationCard } from "../RegistrationCard/RegistrationCard";
import { DataRegistrationsItem } from "~/types/interface";
import { memo } from "react";
import { initialStateRegistration } from "~/utils/initialStateRegistration";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  registrations: DataRegistrationsItem[];
  changeStatus: (item: DataRegistrationsItem, newStatus: string) => Promise<void>;
  loadingRegistrations: boolean;
  loadingScreen: boolean;
  errorRegistrations: string;
};

export const Columns = memo(
  ({
    registrations,
    changeStatus,
    errorRegistrations,
    loadingRegistrations,
    loadingScreen,
  }: 
  Props) => {
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
                  {(loadingScreen
                    ? Array.from(initialStateRegistration)
                    : registrations
                  ).map((registration, index) => {
                    if (collum.status === registration.status) {
                      return (
                        <RegistrationCard
                          item={registration}
                          key={registration.id}
                          changeStatus={changeStatus}
                          errorRegistrations={errorRegistrations}
                          loadingRegistrations={loadingRegistrations}
                          loadingScreen={loadingScreen}
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
  }
);
