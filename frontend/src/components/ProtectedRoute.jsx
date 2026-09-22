import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const ProtectedRoute = ({ children, role }) => {


    const { user, loading } = useContext(AuthContext);



    // Wait until user loading complete

    if(loading){

        return (
            <div className="text-center mt-5">
                Loading...
            </div>
        );

    }




    // User not logged in

    if(!user){

        return <Navigate to="/login" replace />;

    }




    // Role checking

    if(role){


        const userRole = user.role?.replace(
            "ROLE_",
            ""
        );


        const requiredRole = role.replace(
            "ROLE_",
            ""
        );



        if(userRole !== requiredRole){

            return (
                <Navigate 
                to="/unauthorized"
                replace
                />
            );

        }


    }





    return children;


};


export default ProtectedRoute;