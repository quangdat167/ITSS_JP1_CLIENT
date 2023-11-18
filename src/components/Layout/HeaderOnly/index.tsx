import Header from '../Components/Header';
import Container from 'react-bootstrap/Container';
interface HeaderOnlyProps {
    children?: any;
}

function HeaderOnly({ children }: HeaderOnlyProps) {
    return (
        <div>
            <Header />
            <Container fluid>{children}</Container>
        </div>
    );
}

export default HeaderOnly;
