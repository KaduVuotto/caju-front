import * as Styled from "./styles";
import { RegistrationCard } from "../RegistrationCard/RegistrationCard";
import { DataRegistrationsItem } from "~/types/interface";
import { memo } from "react";
import { initialStateRegistration } from "~/utils/initialStateRegistration";
import { DialogFrom, RegistrationStatus } from "~/types/emuns";

const allColumns = [
  { status: RegistrationStatus.REVIEW, title: "Pronto para revisar" },
  { status: RegistrationStatus.APPROVED, title: "Aprovado" },
  { status: RegistrationStatus.REPROVED, title: "Reprovado" },
];

type Props = {
  errorRegistrations: string;
  handleOpenDialog: (
    from: DialogFrom,
    item: DataRegistrationsItem,
    newStatus?: RegistrationStatus
  ) => void;
  loadingRegistrations: boolean;
  loadingScreen: boolean;
  registrations: DataRegistrationsItem[];
};

export const Columns = memo(
  ({
    errorRegistrations,
    handleOpenDialog,
    loadingRegistrations,
    loadingScreen,
    registrations,
  }: Props) => {
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
                          errorRegistrations={errorRegistrations}
                          handleOpenDialog={handleOpenDialog}
                          item={registration}
                          key={index}
                          loadingRegistrations={
                            loadingRegistrations || loadingScreen
                          }
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
