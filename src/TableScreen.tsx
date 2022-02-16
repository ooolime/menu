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

const splitArr = (arr: any[], number: number) => {
  if (number === 2) {
    const middle = Math.ceil(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return [left, right];
  }

  return [arr];
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

  const mapData = () => {
    let counter = 1;
    const data: any = [];
    currentMonitor?.slice(1)?.forEach((row: any, index: number) => {
      const isSubtitle = !row?.price && !row?.weight && !row?.kkal;
      if (isSubtitle) counter = 0;
      const number = counter;
      data.push({ ...row, number });
      counter++;
    });

    return data;
  };

  const fontSize = currentMonitorSettings?.fontsize || 18;
  const columns: number = currentMonitorSettings?.columns ? 2 : 1;
  const currentMonitorHead = currentMonitor[0];

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
        {"  "}
        <Typography
          className="main-table-subtitle"
          variant="h2"
          component={"span"}
        >
          ({moment().format("dddd, D MMMM YYYY г.")})
        </Typography>
      </Typography>

      <div
        className={`table-container${
          columns === 2 ? " table-container--2" : ""
        }`}
      >
        {splitArr(mapData(), columns)?.map((tableData: any, index: number) => {
          return (
            <Table
              className="main-table"
              style={{ fontSize: Number(fontSize) }}
              key={index}
            >
              <TableHead>
                <TableRow>
                  <TableCell>№</TableCell>
                  <TableCell>{currentMonitorHead?.name}</TableCell>
                  <TableCell align="right">
                    {currentMonitorHead?.weight}
                  </TableCell>
                  <TableCell align="right">
                    {currentMonitorHead?.kkal}
                  </TableCell>
                  <TableCell align="right">
                    {currentMonitorHead?.price}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData?.map((row: any, index: number) => {
                  const isSubtitle = !row?.price && !row?.weight && !row?.kkal;
                  return isSubtitle ? (
                    <TableRow key={row?.name + index}>
                      <TableCell className="table-subtitle" colSpan={5}>
                        {row?.name}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow
                      key={row?.name + index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell className="table-column-number">
                        {row?.number}
                      </TableCell>
                      <TableCell className="table-column-name">
                        {row?.name}
                      </TableCell>
                      <TableCell align="right" className="table-column-weight">
                        {row?.weight}
                      </TableCell>
                      <TableCell align="right" className="table-column-kkal">
                        {row?.kkal}
                      </TableCell>
                      <TableCell align="right" className="table-column-price">
                        {row?.price}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          );
        })}
      </div>
    </div>
  );
};

export default TableScreen;
