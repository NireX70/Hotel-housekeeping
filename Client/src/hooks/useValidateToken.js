import { useDispatch } from "react-redux";
import { authActions } from "../store/context";
import { useEffect } from "react";
import axios from "axios";

const useValidateToken = () => {
  const dispatch = useDispatch();
  const storedToken = sessionStorage.getItem("token");
  useEffect(() => {
    if (storedToken) {
      const validateToken = async (token) => {
        const response = await axios.get("http://localhost:5000/user-auth", {
          headers: { Authorization: "Bearer " + token },
        });
        if (response.data.ok) {
          dispatch(
            authActions.update({
              token: storedToken,
            })
          );
        } else {
          clearSession();
        }
      };
      validateToken(storedToken);
    } else {
      clearSession();
    }
  }, [storedToken]);

  const clearSession = () => {
    sessionStorage.removeItem("token");
    dispatch(authActions.restore());
  };
};

export default useValidateToken;
