import React from "react";

const TabManager = (props) => {
  return (
    <div className="px-28 lg:px-96">
      <div className="flex justify-center items-center w-full border-b-2 border-ad-purple">
        {props.tabs.map(({ label, value }) => (
          <div
            key={value}
            className={`text-lg font-semibold cursor-pointer p-3 rounded-tl-xl rounded-tr-xl ${
              value === props.activeTab
                ? "font-bold text-xl text-white border-b-2 rounded-tl-xl rounded-tr-xl border-ad-purple bg-ad-purple tracking-wide"
                : "text-ad-purple"
            }`}
            onClick={() => props.setActiveTab(value)}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabManager;
