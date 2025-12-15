// import "./App.css";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hook";
import AppRoute from "./routes";
import { setAuth } from "./app/features/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(
        setAuth({
          accessToken: token,
          user: JSON.parse(user),
        })
      );
    }
  }, [dispatch]);

  return (
    <>
      <AppRoute />
    </>
  );
}

export default App;
