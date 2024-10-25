import React, { useState, useEffect } from "react";
import { get, REFRESH_STATE, LOAD_STATE } from "@/utils"; // Pull 组件需要的一些常量
import { Icon, Pull, Grid } from "zarm";
import dayjs from "dayjs";
import PopupType from "@/components/PopupType";
import PopupDate from "@/components/PopupDate";
import { useRef } from "react";
import { Button } from "zarm";
import { Popup } from "zarm";

import MainLayout from "../../components/MainLayout";
import s from "./style.module.less";
import BillItem from "../../components/BillItem";

const Home = () => {
  const typeRef = useRef(); // 账单类型 ref
  const [currentSelect, setCurrentSelect] = useState({}); // 当前筛选类型
  const [currentTime, setCurrentTime] = useState(dayjs().format("YYYY-MM")); // 当前筛选时间
  const monthRef = useRef(); // 月份筛选 ref
  const [page, setPage] = useState(1); // 分页
  const [list, setList] = useState([]); // 账单列表
  const [totalPage, setTotalPage] = useState(0); // 分页总数
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载状态
  // 获取账单方法
  const getBillList = async () => {
    const { data } = await get(
      `/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${
        currentSelect.id || "all"
      }`
    );
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
  // 添加账单弹窗
  const toggle = () => {
    typeRef.current && typeRef.current.show();
  };

  // 筛选类型
  const select = (item) => {
    setRefreshing(REFRESH_STATE.loading);
    // 触发刷新列表，将分页重制为 1
    setPage(1);
    setCurrentSelect(item);
  };

  // 选择月份弹窗
  const monthToggle = () => {
    monthRef.current && monthRef.current.show();
  };

  // 筛选月份
  const selectMonth = (item) => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentTime(item);
  };

  useEffect(() => {
    getBillList(); // 初始化
  }, [page, currentSelect, currentTime]);

  const handleDateSelect = (item) => {
    selectMonth(item);
  };
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
          <PopupType
            trigger={
              <Button className={s.left} size="sm">
                <span className={s.title}>
                  {currentSelect.name || "全部类型"}
                  <Icon className={s.arrow} type="ArrowDown" />
                </span>
              </Button>
            }
            direction="bottom"
            onSelect={select}
          />
          <PopupDate
            onDateSelect={handleDateSelect}
            trigger={
              <Button className={s.right} size="sm">
                <span className={s.time} onClick={monthToggle}>
                  {currentTime}
                  <Icon className={s.arrow} type="arrow-bottom" />
                </span>
              </Button>
            }
          />
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
