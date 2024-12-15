import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "@/components/NavBar";
import "zarm/dist/zarm.min.css"; // 引入 Zarm 的样式
import { ConfigProvider } from "zarm";

import routes from "@/router";
function App() {
  return (
    <ConfigProvider primaryColor={"#007fff"}>
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
