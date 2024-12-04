import React, { useEffect, useState } from "react";

const Notification = ({ poolDetail, i, notify }) => {
  const [percentage, setPercentage] = useState();
  useEffect(() => {
    const calcPercentage = () => {
      const amount = notify?.amount ?? 0;

      const percentageNew = (amount / 100) * 100;

      if (percentageNew === 0) {
        console.log("Token balance is zero, cannot calculate percentage");
      } else {
        setPercentage(percentageNew);
      }
    };

    const timer = setTimeout(calcPercentage, 3000);

    return () => clearTimeout(timer);
  }, [notify]);
  return <div key={i}></div>;
};

export default Notification;
