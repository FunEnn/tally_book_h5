import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "zarm";
import MainLayout from "../../components/MainLayout";
import s from "./style.module.less";
import { Button } from "zarm";
import { get } from "../../utils";

const User = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState(""); // 用户
  const [avatar, setAvatar] = useState(""); // 头像
  const [signature, setSignature] = useState(""); // 个签
  const token = localStorage.getItem("token"); // 登录令牌
  if (!token) {
    navigate("/login");
  }
  // 获取用户信息
  const getUserInfo = async () => {
    const { data } = await get("/user/get_userinfo");
    setUserName(data.username);
    setAvatar(data.avatar);
    setSignature(data.signature);
  };
  // 退出登录
  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    getUserInfo(); // 初始化请求
  }, []);

  return (
    <MainLayout path={"/user"}>
      <div className={s.user}>
        <div className={s.head}>
          <div className={s.info}>
            <span className={s.name}>昵称：{username}</span>
            <span>
              <img
                style={{ width: 30, height: 30, verticalAlign: "-10px" }}
                src={signature}
                alt=""
              />
              <b>{signature}</b>
            </span>
          </div>
          <img
            className={s.avatar}
            style={{ width: 80, height: 80, borderRadius: 50 }}
            src={avatar}
            alt="用户头像"
          />
        </div>
      </div>
      <div className={s.content}>
        <List>
          <List.Item
            hasArrow
            title="用户信息修改"
            onClick={() => navigate("/userinfo")}
            style={{ padding: 10 }}
            prefix={
              <img
                style={{ width: 20, verticalAlign: "-7px" }}
                src="//s.yezgea02.com/1615974766264/gxqm.png"
                alt=""
              />
            }
          />
          <List.Item
            hasArrow
            title="重制密码"
            onClick={() => navigate("/account")}
            style={{ padding: 10 }}
            prefix={
              <img
                style={{ width: 20, verticalAlign: "-7px" }}
                src="//s.yezgea02.com/1615974766264/zhaq.png"
                alt=""
              />
            }
          />
          <List.Item
            hasArrow
            title="关于我"
            onClick={() => navigate("/about")}
            style={{ padding: 10 }}
            prefix={
              <img
                style={{ width: 20, verticalAlign: "-7px" }}
                src="//s.yezgea02.com/1615975178434/lianxi.png"
                alt=""
              />
            }
          />
        </List>
      </div>
      <Button className={s.logout} block theme="danger" onClick={logout}>
        退出登录
      </Button>
    </MainLayout>
  );
};

export default User;
