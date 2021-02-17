import React from "react";

const TabManager = (props) => {
  return (
    <div className="px-16 lg:px-96">
      <div className="flex justify-center items-center w-full border-b-2 border-ad-purple">
        {props.tabs.map(({ label, value }) => (
          <div
            key={value}
            className={`text-sm lg:text-lg font-semibold cursor-pointer p-3 rounded-tl-xl rounded-tr-xl border-2 border-b-0 border-ad-purple mr-1 ${
              value === props.activeTab
                ? "lg:font-bold text-white border-b-2 rounded-tl-xl rounded-tr-xl border-ad-purple bg-ad-purple tracking-wide"
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
