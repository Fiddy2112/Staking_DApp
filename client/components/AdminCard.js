import React from "react";

const AdminCard = ({ name, value }) => {
  return (
    <div className="p-4 rounded-md bg-black text-center">
      <div className="text-3xl font-mono py-2">{value}</div>
      <p className="text-base font-mono py-2">{name}</p>
    </div>
  );
};

export default AdminCard;
