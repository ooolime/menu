import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "./Slider";

type Props = {
  data?: any;
};

const TableScreen: FC<Props> = ({ data }) => {
  let [searchParams] = useSearchParams();
  let monitorNumber = searchParams.get("monitor");
  let isSlider = searchParams.get("slider");

  const currentMonitor = data?.find(
    (item: any) => item?.id === monitorNumber
  )?.data;

  const settings = data?.find((item: any) => item?.id === "settings")?.data;

  const currentMonitorSettings = settings?.find(
    (item: any) => item?.monitor === monitorNumber
  );

  return isSlider ? (
    <Slider data={currentMonitor} />
  ) : (
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
        {moment().format("dddd, D MMMM YYYY г.")}
      </Typography>
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
          {currentMonitor?.slice(1)?.map((row: any, index: number) => {
            const isSubtitle = !row?.price && !row?.weight && !row?.kkal;
            return isSubtitle ? (
              <TableRow key={row.name + index}>
                <TableCell className="table-subtitle" colSpan={5}>
                  {row.name}
                </TableCell>
              </TableRow>
            ) : (
              <TableRow
                key={row.name + index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.kkal}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableScreen;
