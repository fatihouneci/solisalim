import React from "react";

const EmptyList = () => {
  return (
    <div className="max-w-7xl mx-auto my-5">
      <h4 className="text-center text-2xl">Aucuns articles</h4>
      <div className="flex items-center justify-center">
        <img
          style={{ width: "100%", height: "300px", objectFit: "contain" }}
          src="/assets/images/not-found.png"
          alt="Not-found"
        />
      </div>
    </div>
  );
};

export default EmptyList;
