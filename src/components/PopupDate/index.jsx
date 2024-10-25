import React, { useState } from "react";
import { Popup, Button, DatePicker } from "zarm";
import "zarm/dist/zarm.min.css";
import dayjs from "dayjs";

const PopupDate = ({ onDateSelect, trigger, mode = "month" }) => {
  const [show, setShow] = useState(false);
  const [now, setNow] = useState(new Date());

  const choseMonth = (item) => {
    console.log(item);
    setNow(item);
    setShow(false);
    if (mode == "month") {
      onDateSelect(dayjs(item).format("YYYY-MM"));
    } else if (mode == "date") {
      onDateSelect(dayjs(item).format("YYYY-MM-DD"));
    }
  };

  const handleVisibleChange = (newVisible) => {
    setShow(newVisible);
  };

  return (
    <>
      {React.cloneElement(trigger, {
        onClick: () => handleVisibleChange(!show),
      })}
      <Popup
        visible={show}
        onMaskClick={() => setShow(false)}
        direction="bottom"
      >
        <DatePicker
          visible={show}
          value={now}
          mode={mode}
          onConfirm={choseMonth}
          onCancel={() => setShow(false)}
          columnType={["year", "month"]}
        />
      </Popup>
    </>
  );
};

export default PopupDate;
