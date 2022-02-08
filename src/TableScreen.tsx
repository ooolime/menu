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

  return (
    <div className="page">
      <div className="page__bg-image-conatiner">
        <img className="page__bg-image" src={currentMonitorSettings?.img} />
      </div>
      <Link to="/">Home</Link>
      <Typography variant="h2" gutterBottom component="div" textAlign="center">
        {currentMonitorSettings?.title}
      </Typography>
      {/* <pre>{JSON.stringify(settings, null, 2)}</pre> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Наименование</TableCell>
            <TableCell align="right">Выход</TableCell>
            <TableCell align="right">Цена</TableCell>
            <TableCell align="right">Ккал</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentMonitor?.slice(1)?.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
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
