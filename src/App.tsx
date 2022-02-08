import * as React from "react";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import useGoogleSheets from "use-google-sheets";
import TableScreen from "./TableScreen";
import { Monitor } from "@mui/icons-material";
import "./App.css";

export default function App() {
  const { data, loading } = useGoogleSheets({
    apiKey: "AIzaSyACnGlwY8ysf2XWl9IFZDI6iTx1VNtzZxc",
    sheetId: "1Z23qOoj4SAVfolPrAUsTuboHanDKlM5viX_ntBrdyYA",
  });

  const settings = data?.find((item: any) => item?.id === "settings")?.data;

  return (
    <div className="layout">
      {loading ? (
        <CircularProgress />
      ) : (
        <Routes>
          <Route path="*" element={<Layout />}>
            <Route index element={<Home settings={settings} />} />
            <Route path="table" element={<TableScreen data={data} />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

function Layout() {
  return <Outlet />;
}

function Home({ settings }: { settings: any }) {
  let navigate = useNavigate();
  return (
    <div>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {settings?.slice(1)?.map((item: any) => {
          return (
            <Button
              startIcon={<Monitor />}
              onClick={() => navigate(`/table?monitor=${item?.monitor}`)}
            >
              {item?.title}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
