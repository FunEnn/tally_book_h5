import React, { useState } from "react";
import { get, REFRESH_STATE, LOAD_STATE } from "@/utils"; // Pull 组件需要的一些常量
import { Icon, Pull, Grid } from "zarm";
import dayjs from "dayjs";
import MainLayout from "../../components/MainLayout";
import s from "./style.module.less";
import BillItem from "../../components/BillItem";
import { useEffect } from "react";

const Home = () => {
  const MyIcon = Icon.createFromIconfont(
    "//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js"
  );
  const [currentTime, setCurrentTime] = useState(dayjs().format("YYYY-MM")); // 当前筛选时间
  const [page, setPage] = useState(1); // 分页
  const [list, setList] = useState([]); // 账单列表
  const [totalPage, setTotalPage] = useState(0); // 分页总数
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载状态
  // 获取账单方法
  const getBillList = async () => {
    const { data } = await get(
      `/bill/list?page=${page}&page_size=5&date=${currentTime}`
    );
    console.log(currentTime)
    // 下拉刷新，重制数据
    if (page == 1) {
      setList(data.list);
    } else {
      setList(list.concat(data.list));
    }
    setTotalPage(data.totalPage);
    // 上滑加载状态
    setLoading(LOAD_STATE.success);
    setRefreshing(REFRESH_STATE.success);
  };
  // 请求列表数据
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading);
    if (page != 1) {
      setPage(1);
    } else {
      getBillList();
    }
  };

  const loadData = () => {
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    getBillList(); // 初始化
  }, [page]);

  return (
    <MainLayout>
      <div className={s.home}>
        <div className={s.header}>
          <span className={s.expense}>
            总支出：<b>¥ 200</b>
          </span>
          <span className={s.income}>
            总收入：<b>¥ 500</b>
          </span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left}>
            <span className={s.title}>
              类型 <MyIcon className={s.arrow} type="ArrowDown" />
            </span>
          </div>
          <div className={s.right}>
            <span className={s.time}>
              2022-06
              <MyIcon className={s.arrow} type="arrow-bottom" />
            </span>
          </div>
        </div>
      </div>
      <div className={s.contentWrap}>
        {list.length ? (
          <Pull
            animationDuration={200}
            stayTime={400}
            refresh={{
              state: refreshing,
              handler: refreshData,
            }}
            load={{
              state: loading,
              distance: 200,
              handler: loadData,
            }}
          >
            {list.map((item, index) => (
              <BillItem key={index} bill={item} />
            ))}
          </Pull>
        ) : null}
      </div>
    </MainLayout>
  );
};

export default Home;
