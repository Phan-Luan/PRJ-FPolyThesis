import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/20';
import img3 from '../../../../assets/images/icon/08.png';
import img4 from '../../../../assets/images/icon/09.png';
import img5 from '../../../../assets/images/icon/10.png';
import img6 from '../../../../assets/images/icon/11.png';
import img7 from '../../../../assets/images/icon/12.png';
import img8 from '../../../../assets/images/icon/13.png';

export const Header = () => {
  return (
    <>
      <Col sm={12}>
        <Card>
          <Card.Body className=" profile-page p-0">
            <div className="profile-header">
              <div className="position-relative">
                <img loading="lazy" src={imageUrl} alt="profile-bg" className="rounded img-fluid" />
                <ul className="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0">
                  <li>
                    <Link to="#" className="material-symbols-outlined">
                      edit
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="material-symbols-outlined">
                      settings
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="user-detail text-center mb-3">
                <div className="profile-img">
                  <img loading="lazy" src={imageUrl} alt="profile-img1" className="avatar-130 img-fluid" />
                </div>
                <div className="profile-detail">
                  <h3>Bni Cyst</h3>
                </div>
              </div>
              <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                <div className="social-links">
                  <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                    <li className="text-center pe-3">
                      <Link to="#">
                        <img loading="lazy" src={img3} className="img-fluid rounded" alt="facebook" />
                      </Link>
                    </li>
                    <li className="text-center pe-3">
                      <Link to="#">
                        <img loading="lazy" src={img4} className="img-fluid rounded" alt="Twitter" />
                      </Link>
                    </li>
                    <li className="text-center pe-3">
                      <Link to="#">
                        <img loading="lazy" src={img5} className="img-fluid rounded" alt="Instagram" />
                      </Link>
                    </li>
                    <li className="text-center pe-3">
                      <Link to="#">
                        <img loading="lazy" src={img6} className="img-fluid rounded" alt="Google plus" />
                      </Link>
                    </li>
                    <li className="text-center pe-3">
                      <Link to="#">
                        <img loading="lazy" src={img7} className="img-fluid rounded" alt="You tube" />
                      </Link>
                    </li>
                    <li className="text-center md-pe-3 pe-0">
                      <Link to="#">
                        <img loading="lazy" src={img8} className="img-fluid rounded" alt="linkedin" />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="social-info">
                  <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                    <li className="text-center ps-3">
                      <h6>Posts</h6>
                      <p className="mb-0">690</p>
                    </li>
                    <li className="text-center ps-3">
                      <h6>Followers</h6>
                      <p className="mb-0">206</p>
                    </li>
                    <li className="text-center ps-3">
                      <h6>Following</h6>
                      <p className="mb-0">100</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};