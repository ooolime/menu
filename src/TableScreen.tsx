import { FC } from "react";
import { Link, useSearchParams } from "react-router-dom";

type Props = {
  data?: any;
};

const TableScreen: FC<Props> = ({ data }) => {
  let [searchParams] = useSearchParams();
  let monitorNumber = searchParams.get("monitor");

  const currentMonitor = data?.find(
    (item: any) => item?.id === monitorNumber
  )?.data;

  return (
    <div>
      <Link to="/">Home</Link>
      <pre>{JSON.stringify(currentMonitor, null, 2)}</pre>
    </div>
  );
};

export default TableScreen;
