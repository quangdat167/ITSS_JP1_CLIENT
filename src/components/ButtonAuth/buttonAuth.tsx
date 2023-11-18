import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "../../firebaseConfig/firebase";
import { Link } from "react-router-dom";
import RouteConfig from "routes/Route";

export default function ButtonAuth() {
    return (
        <Link to={RouteConfig.SIGN_IN} className="header-btn">
            <FontAwesomeIcon
                className="me-1 fs-5"
                icon={faCircleUser}
                style={{ color: "#ffffff" }}
            />
            Đăng nhập
        </Link>
    );
}
