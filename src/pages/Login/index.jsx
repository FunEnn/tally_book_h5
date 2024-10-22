import React, { useState, useCallback } from "react";
import { List, Input, Button, Checkbox } from "zarm";
import CustomIcon from "@/components/CustomIcon";
import Captcha from "react-captcha-code";
import cx from "classnames";
import s from "./style.module.less";
import { Toast } from "zarm/lib";
import { post } from "@/utils/index.js";
const Login = () => {
  const [username, setUsername] = useState(""); // 账号
  const [password, setPassword] = useState(""); // 密码
  const [verify, setVerify] = useState(""); // 验证码
  const [captcha, setCaptcha] = useState(""); // 验证码变化后存储值
  const [type, setType] = useState("login"); // 登录注册类型
  //  验证码变化，回调方法
  const handleChange = useCallback((captcha) => {
    console.log("captcha", captcha);
    setCaptcha(captcha);
  }, []);

  const onSubmit = async () => {
    if (!username) {
      Toast.show("请输入账号");
      return;
    }
    if (!password) {
      Toast.show("请输入密码");
      return;
    }
    try {
      //判断登录
      if (type === "login") {
        const { data } = await post("/user/login", {
          username,
          password,
        });
        //登录成功，将token存储到localStorage，并跳转到首页
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        //验证密码
        if (!verify) {
          Toast.show("请输入验证码");
          return;
        }
        //验证码
        if (verify !== captcha) {
          Toast.show("验证码错误");
          return;
        }
        const { data } = await post("/user/register", {
          username,
          password,
        });
        Toast.show("注册成功");
        setType("login");
      }
    } catch (err) {
      Toast.show(msg);
    }
  };

  return (
    <div className={s.auth}>
      <div className={s.head} />
      <div className={s.tab}>
        <span
          className={cx({ [s.avtive]: type == "login" })}
          onClick={() => setType("login")}
        >
          登录
        </span>
        <span
          className={cx({ [s.avtive]: type == "register" })}
          onClick={() => setType("register")}
        >
          注册
        </span>
      </div>
      <div className={s.form}>
        <List>
          <List.Item
            prefix={<CustomIcon type="zhanghao" />}
            style={{ marginBottom: 15, opacity: 0.5 }}
          >
            <Input
              placeholder="请输入账号"
              clearable
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </List.Item>
        </List>
        <List>
          <List.Item
            prefix={<CustomIcon type="mima" />}
            style={{ marginBottom: 15, opacity: 0.5 }}
          >
            <Input
              placeholder="请输入密码"
              clearable
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            />
          </List.Item>
        </List>
        {type == "register" ? (
          <List>
            <List.Item
              prefix={<CustomIcon type="mima" />}
              style={{ marginBottom: 15, opacity: 0.5 }}
            >
              <Input
                clearable
                type="text"
                placeholder="请输入验证码"
                onChange={(e) => setVerify(e.target.value)}
              />
              <Captcha charNum={4} onChange={handleChange} />
            </List.Item>
          </List>
        ) : null}
      </div>
      <div className={s.operation}>
        <div className={s.agree}>
          <Checkbox />
          <label className="text-light">
            阅读并同意
            <a href="/" style={{ color: "#1e90ff" }}>
              《条款》
            </a>
          </label>
        </div>
        <Button onClick={onSubmit} block theme="primary">
          {type == "login" ? "登录" : "注册"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
