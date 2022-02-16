import * as React from "react";
import { Box, Button, CircularProgress, Fab } from "@mui/material";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import useGoogleSheets from "use-google-sheets";
import TableScreen from "./TableScreen";
import { Monitor } from "@mui/icons-material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./App.css";

export default function App() {
  const { data, loading } = useGoogleSheets({
    apiKey: "AIzaSyACnGlwY8ysf2XWl9IFZDI6iTx1VNtzZxc",
    sheetId: "1Z23qOoj4SAVfolPrAUsTuboHanDKlM5viX_ntBrdyYA",
  });

  const handle = useFullScreenHandle();

  const toggleFullscreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  const settings = data?.find((item: any) => item?.id === "settings")?.data;

  const FullScreenButton = () => (
    <Fab
      className="full-screen"
      size="medium"
      aria-label="add"
      onClick={toggleFullscreen}
    >
      <FullscreenIcon />
    </Fab>
  );

  return (
    <FullScreen handle={handle}>
      <div className="layout">
        {loading ? (
          <CircularProgress />
        ) : (
          <Routes>
            <Route path="*" element={<Layout />}>
              <Route
                index
                element={
                  <>
                    <Home settings={settings} />
                    <FullScreenButton />
                  </>
                }
              />
              <Route path="table" element={<TableScreen data={data} />} />
            </Route>
          </Routes>
        )}
      </div>
    </FullScreen>
  );
}

function Layout() {
  return <Outlet />;
}

function Home({ settings }: { settings: any }) {
  let navigate = useNavigate();

  return (
    <div>
      {settings?.slice(1)?.map((item: any) => {
        const slider = item?.img === "slider" ? "&slider=true" : "";
        return (
          <Box m={1} key={item?.button + item?.monitor}>
            <Button
              startIcon={<Monitor />}
              variant="contained"
              style={{ width: 320 }}
              size="large"
              onClick={() =>
                navigate(`/table?monitor=${item?.monitor}${slider}`)
              }
            >
              {item?.button}
            </Button>
          </Box>
        );
      })}
    </div>
  );
}
