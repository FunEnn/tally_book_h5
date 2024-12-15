import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Popup } from "zarm";
import { Icon } from "zarm";
import cx from "classnames";
import { get } from "../../utils/index";
import s from "./style.module.less";

const PopupType = ({
  trigger,
  direction = "bottom",
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  const popperRef = useRef(null);
  const [active, setActive] = useState("all"); // 激活的 type
  const [expense, setExpense] = useState([]); // 支出类型标签
  const [income, setIncome] = useState([]); // 收入类型标签

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };
  const choseType = (item) => {
    setActive(item.id);
    setVisible(false);
    // 父组件传入的 onSelect，为了获取类型
    onSelect(item);
  };
  // useEffect(async () => {
  //   // 请求标签接口放在弹窗内，这个弹窗可能会被复用，所以请求如果放在外面，会造成代码冗余。
  //   const {
  //     data: { list },
  //   } = await get("/type/list");
  //   setExpense(list.filter((i) => i.type == 1));
  //   setIncome(list.filter((i) => i.type == 2));
  // }, []);

  return (
    <>
      {React.cloneElement(trigger, {
        onClick: () => handleVisibleChange(!visible),
      })}
      <Popup
        ref={popperRef}
        visible={visible}
        onMaskClick={() => handleVisibleChange(false)}
        direction={direction}
      >
        <div>{}</div>
      </Popup>
    </>
  );
};

export default PopupType;
