import toast from "react-hot-toast";

export const logoutUser = (dispatch, navigate) => {
  localStorage.clear();
  dispatch({ type: "USER_DATA", payload: {} });
  toast.success("Logged Out");
  navigate("/");
};
