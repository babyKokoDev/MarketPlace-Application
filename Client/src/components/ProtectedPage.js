import React, { useState } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apicalls/users";

const ProtectedPage = ({children}) => {
    const [user, setUser] = useState(null);

    const validateToken = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.success) {
                setUser(response.data);
            } else {
                message.error(error.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };
    useEffect(() => {
        validateToken();
    }, []);


    return (
        <div>
            {user && 
              (
                <div className="p-5">
                    {user.name}
                    {children}
                </div>
              )
            }
        </div>
    )
};

export default ProtectedPage;
