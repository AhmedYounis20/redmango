import { jwtDecode } from "jwt-decode";
import { userModel } from "../Interfaces";

const withAdminAuthorization = (WrappedComponent: any) => {
  return (props: any) => {
    console.log("HOC Called");
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      window.location.replace("/login");
      return null;
    }
    else {
        const  userData : userModel = jwtDecode<userModel>(accessToken);
        if(!userData || userData.role.toLowerCase() !== 'customer'.toLowerCase()){
            window.location.replace("/accessdenied");
            return null;
        }

    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuthorization;