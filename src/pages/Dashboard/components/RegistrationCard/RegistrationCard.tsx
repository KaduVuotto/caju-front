import { Button } from "~/components/Buttons/Button";
import * as Styled from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";
import { DataRegistrationsItem } from "~/types/interface";
import { RegistrationStatus } from "~/types/emuns";
import { memo } from "react";
import { Skeleton, Typography } from "@mui/material";

type Props = {
  item: DataRegistrationsItem;
  changeStatus: (
    item: DataRegistrationsItem,
    newStatus: string
  ) => Promise<void>;
  loadingRegistrations: boolean;
  loadingScreen: boolean;
  errorRegistrations: string;
};

export const RegistrationCard = memo(
  ({
    item,
    changeStatus,
    errorRegistrations,
    loadingRegistrations,
    loadingScreen,
  }: Props) => {
    const loading = loadingRegistrations || loadingScreen;

    return (
      <Styled.Card>
        <Styled.IconAndText>
          {loading ? null : <HiOutlineUser />}
          <Typography variant="h5">
            {loading ? <Skeleton width={"20vw"} /> : `${item.employeeName}`}
          </Typography>
        </Styled.IconAndText>
        <Styled.IconAndText>
          {loading ? null : <HiOutlineMail />}
          <Typography variant="body1">
            {loading ? <Skeleton width={"20vw"} /> : `${item.email}`}
          </Typography>
        </Styled.IconAndText>
        <Styled.IconAndText>
          {loading ? null : <HiOutlineCalendar />}
          <Typography variant="body1">
            {loading ? <Skeleton width={"20vw"} /> : `${item.admissionDate}`}
          </Typography>
        </Styled.IconAndText>
        <Styled.Actions>
          {item.status !== RegistrationStatus.REVIEW && (
            <Button
              loading={loading}
              onClick={() => {
                changeStatus(item, RegistrationStatus.REVIEW);
              }}
              small
              bgcolor="#ff8858"
            >
              Revisar novamente
            </Button>
          )}
          {item.status !== RegistrationStatus.APPROVED && (
            <Button
              loading={loading}
              onClick={() => changeStatus(item, RegistrationStatus.APPROVED)}
              small
              bgcolor="rgb(155, 229, 155)"
            >
              Aprovar
            </Button>
          )}
          {item.status !== RegistrationStatus.REPROVED && (
            <Button
              loading={loading}
              onClick={() => changeStatus(item, RegistrationStatus.REPROVED)}
              small
              bgcolor="rgb(255, 145, 154)"
            >
              Reprovar
            </Button>
          )}
          <Button
            loading={loading}
            onClick={() => changeStatus(item, RegistrationStatus.REVIEW)}
            small
            bgcolor="rgb(255, 145, 154)"
          >
            Excluir
          </Button>
        </Styled.Actions>
        {errorRegistrations && (
          <p style={{ color: "red" }}>{errorRegistrations}</p>
        )}
      </Styled.Card>
    );
  }
);
