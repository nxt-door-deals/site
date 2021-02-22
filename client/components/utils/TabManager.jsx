import React from "react";

const TabManager = (props) => {
  return (
    <div className="px-16 lg:px-96">
      <div className="flex justify-center items-center w-full  border-ad-purple">
        {props.tabs.map(({ label, value }) => (
          <div
            key={value}
            className={`text-sm lg:text-lg font-semibold cursor-pointer px-5 py-3 rounded-xl border-2 border-ad-purple mr-2 ${
              value === props.activeTab
                ? "lg:font-bold text-white border-ad-purple bg-ad-purple tracking-wide"
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
