import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import useGoogleSheets from "use-google-sheets";
import TableScreen from "./TableScreen";

export default function App() {
  const { data, loading } = useGoogleSheets({
    apiKey: "AIzaSyACnGlwY8ysf2XWl9IFZDI6iTx1VNtzZxc",
    sheetId: "1Z23qOoj4SAVfolPrAUsTuboHanDKlM5viX_ntBrdyYA",
  });

  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <Routes>
          <Route path="*" element={<Layout />}>
            <Route index element={<Home />} />
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

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <ul>
        <li>
          <Link to="/table?monitor=1">Monitor 1</Link>
        </li>
        <li>
          <Link to="/table?monitor=2">Monitor 2</Link>
        </li>
        <li>
          <Link to="/table?monitor=3">Monitor 3</Link>
        </li>
        <li>
          <Link to="/table?monitor=4">Monitor 4</Link>
        </li>
      </ul>
    </div>
  );
}
