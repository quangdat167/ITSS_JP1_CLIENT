import { faFacebookSquare, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';

function Footer() {
    return (
        <Container fluid className="mt-5 bg-danger-subtle">
            <div className="min-height-200 d-flex justify-content-evenly">
                <div className="d-flex flex-column justify-content-center align-items-start">
                    <div className="fs-5">Đặng Quang Đạt</div>
                    <div className="fs-6">Email: datvg167@gmail.com</div>
                </div>
                <div className="ms-3 d-flex align-items-center fs-1 gap-3">
                    <a href="http://www.facebook.com/dangquangdatt">
                        <FontAwesomeIcon icon={faFacebookSquare} style={{ color: '#1887f2' }} />
                    </a>

                    <a href="https://github.com/quangdat167">
                        <FontAwesomeIcon icon={faGithubSquare} style={{ color: '#000' }} />
                    </a>
                </div>
            </div>
        </Container>
    );
}

export default Footer;
