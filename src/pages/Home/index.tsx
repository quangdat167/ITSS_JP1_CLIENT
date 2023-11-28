import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "redux/store";
import RouteConfig from "routes/Route";

function Home() {
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    return userInfo?.email ? (
        <Container className="mt-4">
            <Row className="g-2" xs={2} sm={2} md={3} lg={4} xl={5}></Row>
        </Container>
    ) : (
        <Navigate to={RouteConfig.SIGN_IN} />
    );
}

export default Home;
