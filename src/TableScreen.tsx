import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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

  const settings = data?.find((item: any) => item?.id === "settings")?.data;

  const currentMonitorSettings = settings?.find(
    (item: any) => item?.monitor === monitorNumber
  );

  var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

  return (
    <div className="page">
      <div className="page__bg-image-conatiner">
        <img
          className="page__bg-image"
          src={currentMonitorSettings?.img}
          alt=""
        />
      </div>
      <Typography className="main-table-title" variant="h2">
        {currentMonitorSettings?.title}
      </Typography>
      <Typography className="main-table-subtitle" variant="h2">
        {utc}
      </Typography>
      {/* <pre>{JSON.stringify(settings, null, 2)}</pre> */}
      <Table className="main-table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Наименование</TableCell>
            <TableCell align="right">Выход</TableCell>
            <TableCell align="right">Цена</TableCell>
            <TableCell align="right">Ккал</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentMonitor?.slice(1)?.map((row: any, index: number) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.kkal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableScreen;
