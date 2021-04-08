const navStylePurple = {
  navBgColor: "lg:bg-white",
  navOverlayBgColor: "bg-white",
  navOverlayTextColor: "text-brand-purple",
  hrStyle: "border-brand-purple bg-brand-purple border-dotted",
  navShadow: "lg:shadow-navshadow",
  faIconTextcolor: "text-white",
};

const footerGradientClassPurple =
  "from-footer-gradient-from to-footer-gradient-to";

const navStyleBlue = {
  navTextColor: "text-blue-800",
  navOverlayTextColor: "text-blue-800",
  navShadow: "lg:altNavShadow",
  faIconTextcolor: "text-white",
};

const footerGradientClassBlue =
  "from-alt-footer-gradient-from to-alt-footer-gradient-to";

// Styles for the Select component
const selectStylePurple = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted #1E3A8A",
    color: state.isSelected ? "#FFFFFF" : "#6D28D9",
    backgroundColor: state.isSelected ? "purple" : null,
    padding: 10,
    fontSize: 12,
  }),
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
    border: "none",
    backgroundColor: "transparent",
    color: "#6D28D9",
  }),
};

// Styles for the blue select component
const selectStyleBlue = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted #1E3A8A",
    color: state.isSelected ? "#FFFFFF" : "blue",
    padding: 10,
    fontSize: 12,
  }),
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
    border: "none",
  }),
};

export {
  navStylePurple,
  footerGradientClassPurple,
  navStyleBlue,
  footerGradientClassBlue,
  selectStylePurple,
  selectStyleBlue,
};
