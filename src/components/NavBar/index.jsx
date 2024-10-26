import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { TabBar } from "zarm";

import s from "./style.module.less";
import CustomIcon from "../CustomIcon";

const NavBar = ({ showNav, path }) => {
  const [activeKey, setActiveKey] = useState(path || "/");
  const navigate = useNavigate();

  const changeTab = (path) => {
    setActiveKey(path);
    navigate(path);
  };

  return (
    <TabBar
      visible={showNav}
      activeKey={activeKey}
      onChange={changeTab}
      className={s.tab}
    >
      <TabBar.Item
        itemKey="/"
        title="账单"
        icon={<CustomIcon type="zhangdan" />}
      />
      <TabBar.Item
        itemKey="/data"
        title="统计"
        icon={<CustomIcon type="tongji" />}
      />
      <TabBar.Item
        itemKey="/user"
        title="我的"
        icon={<CustomIcon type="wode" />}
      />
    </TabBar>
  );
};

NavBar.propTypes = {
  showNav: PropTypes.bool,
};

export default NavBar;
