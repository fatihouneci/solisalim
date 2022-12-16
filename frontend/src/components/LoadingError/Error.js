import React from "react";

const Message = ({ variant, children }) => {
  return (
    <div
      className={`text-center text-red-500 bg-red-100 border border-red-200 shadow rounded p-4 alert ${variant}`}
    >
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: "alert-info",
};

export default Message;
