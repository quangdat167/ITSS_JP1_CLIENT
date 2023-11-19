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
            <Container
                fluid
                style={{
                    padding: 8,
                    minHeight: 600,
                    margin: "56px 0 0 240px",
                    width: "calc(100vw - 240px)",
                }}
            >
                {children}
            </Container>
            {/* <Footer /> */}
        </div>
    );
}

export default DefaultLayout;
