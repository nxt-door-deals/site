import React from "react";

const TabManager = (props) => {
  return (
    <div className="px-16 lg:px-96">
      <div
        className={`flex justify-center items-center w-full ${props.tabStyle.borderColor}`}
      >
        {props.tabs.map(({ label, value }) => (
          <div
            key={value}
            className={`text-sm lg:text-lg font-semibold cursor-pointer px-5 py-3 rounded-xl border-2 ${
              props.tabStyle.borderColor
            } mr-2 ${
              value === props.activeTab
                ? `lg:font-bold text-white tracking-wide ` +
                  props.tabStyle.borderColor +
                  " " +
                  props.tabStyle.backgroundColor
                : props.tabStyle.textColor
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
