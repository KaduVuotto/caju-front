import { useEffect, useState } from "react";
import { getAllAdmissions } from "~/services/getAllAdmissions";
import { DataListItem } from "~/types/interface";

export const useDashboard = () => {
  const [dataList, setDataList] = useState<DataListItem[]>([]);

  const refresh = async () => {
    const data = await getAllAdmissions();
    setDataList(data);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {dataList};
};
