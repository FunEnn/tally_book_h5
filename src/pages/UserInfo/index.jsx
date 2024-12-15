import React, { useEffect, useState } from "react";
import { Button, FilePicker, Input, Toast } from "zarm";
import { useNavigate } from "react-router-dom";

import Header from "@/components/Header"; // 由于是内页，使用到公用头部
import axios from "axios"; // // 由于采用 form-data 传递参数，所以直接只用 axios 进行请求
import { get, post } from "@/utils";
import { baseUrl } from "config"; // 由于直接使用 axios 进行请求，统一封装了请求 baseUrl
import s from "./style.module.less";
import { imgUrlTrans } from "../../utils";

const UserInfo = () => {
  const navigate = useNavigate(); // 路由实例
  const [user, setUser] = useState({}); // 用户
  const [avatar, setAvatar] = useState(""); // 头像
  const [signature, setSignature] = useState(""); // 个签
  const [previewUrl, setPreviewUrl] = useState(""); // 添加本地预览URL状态
  const token = localStorage.getItem("token"); // 登录令牌
  // 获取用户信息
  const getUserInfo = async () => {
    const { data } = await get("/user/get_userinfo");
    setUser(data);
    setAvatar(data.avatar);
    setSignature(data.signature);
  };

  const handleSelect = async (file) => {
    try {
      if (file && file.file.size > 200 * 1024) {
        Toast.show("上传头像不得超过 200 KB！！");
        return;
      }

      // 创建本地预览URL
      const localUrl = URL.createObjectURL(file.file);
      setPreviewUrl(localUrl);

      let formData = new FormData();
      formData.append("file", file.file);
      
      const res = await axios({
        method: "post",
        url: `/upload`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        }
      });
      
      if(res.data) {
        const formatPath = res.data.replace(/\\/g, '/');
        setAvatar(formatPath);
        // 上传成功后释放本地URL
        URL.revokeObjectURL(localUrl);
      }
    } catch (error) {
      console.error("上传失败:", error);
      Toast.show("上传失败，请重试");
      // 发生错误时也需要释放本地URL
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }
  };

  // 编辑用户信息方法
  const save = async () => {
    const { data } = await post("/user/edit_userinfo", {
      signature,
      avatar,
    });

    Toast.show("修改成功");
    // 成功后回到个人中心页面
    navigate(-1);
  };

  useEffect(() => {
    getUserInfo(); // 初始化请求
  }, []);

  // 在组件卸载时清理本地URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      <Header title="用户信息" />
      <div className={s.userinfo}>
        <h1 style={{ marginBottom: 30 }}>个人资料</h1>
        <div className={s.item}>
          <div className={s.title}>头像</div>
          <div className={s.avatar}>
            <img 
              className={s.avatarUrl} 
              src={previewUrl || (avatar ? imgUrlTrans(avatar) : '//s.yezgea02.com/1615973940679/avatar.jpeg')} 
              alt="头像"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '//s.yezgea02.com/1615973940679/avatar.jpeg';
              }} 
            />
            <div className={s.desc}>
              <span>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</span>
              <FilePicker
                className={s.filePicker}
                onChange={handleSelect}
                accept="image/*"
              >
                <Button className={s.upload} theme="primary" size="xs">
                  点击上传
                </Button>
              </FilePicker>
            </div>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.title}>个性签名</div>
          <div className={s.signature}>
            <Input
              type="text"
              value={signature}
              placeholder="请输入个性签名"
              onChange={(e) => {
                setSignature(e.target.value), console.log(e.target.value);
              }}
            />
          </div>
        </div>
        <Button onClick={save} style={{ marginTop: 50 }} block theme="primary">
          保存
        </Button>
      </div>
    </>
  );
};

export default UserInfo;
