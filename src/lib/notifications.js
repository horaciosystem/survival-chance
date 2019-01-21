import { toast } from "react-toastify"

const toasterSettings = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
}

export function success(message) {
  toast.success(message, toasterSettings)
}
