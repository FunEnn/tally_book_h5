import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "zarm";
import zhCN from "zarm/lib/config-provider/locale/zh_CN";
import "zarm/dist/zarm.css";
import routes from '@/router'

function App() {
  return (
    <ConfigProvider primaryColor={"#007fff"} locale={zhCN}>
      <Routes>
        {routes.map((route) => (
          <Route
            exact
            key={route.path}
            path={route.path}
            element={<route.component />}
          ></Route>
        ))}
      </Routes>
    </ConfigProvider>
  );
}

export default App;
