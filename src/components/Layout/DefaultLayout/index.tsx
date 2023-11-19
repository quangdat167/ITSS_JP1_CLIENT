import Container from "react-bootstrap/Container";
import Header from "../Components/Header";
import DrawerLeft from "./Drawer";
import Footer from "./Footer";
interface DefaultLayoutProps {
    children?: any;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div>
            <Header />
            <DrawerLeft />
            <Container fluid style={{ minHeight: 600, margin: "56px 0 0 240px" }}>
                {children}
            </Container>
            {/* <Footer /> */}
        </div>
    );
}

export default DefaultLayout;
