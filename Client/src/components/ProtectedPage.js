import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const ProtectedPage = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        {/* Header */}
        <div className="flex justify-between items-center bg-primary p-5">
          <h1 className="text-2xl text-white">MARKET PLACE</h1>
          <div className="bg-white py-2 px-5 flex rounded gap-1 items-center">
            <i className="ri-user-3-fill cursor-pointer"></i>
            <span className="underline cursor-pointer">{user.name}</span>
            <i
              className="ri-logout-box-r-line ml-10 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">{children}</div>
      </div>
    )
  );
};

export default ProtectedPage;
