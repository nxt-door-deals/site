import { toast } from "react-toastify";

const sessionExpiredToast = () =>
  toast("Your session has expired. Please log in", {
    draggablePercent: 60,
    position: "top-center",
  });

export { sessionExpiredToast };
