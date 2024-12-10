import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='secondary' variant='dark' expand='lg' collapseOnSelect className='flex-column'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              Westcoast Boardgames
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
          <Navbar.Brand className='shipping text-center col-sm-9' >
              Free Shipping on orders over $100
          </Navbar.Brand>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar bg='secondary' variant='dark'collapseOnSelect className='flex-column'>
        <div className='col-sm-10 col-md-6' >
        <SearchBox />
        </div>
      </Navbar>
      <Navbar bg='primary' variant='dark' className='flex-column'>
       <Navbar.Collapse id='basic-navbar-nav'>
        <LinkContainer  to = '/search/social deduction/category' style={{ marginLeft: '5px', marginRight:'5px' }}  className='extra-links'><Nav.Link>Social Deduction Games</Nav.Link></LinkContainer > 
        <div className='link-seperator'>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</div>
        <LinkContainer  to = '/search/kids/category'style={{ marginLeft: '5px', marginRight:'5px' }} className='extra-links'><Nav.Link>Great for kids</Nav.Link></LinkContainer >
        <div className='link-seperator'>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</div>
        <LinkContainer  to = '/search/strategy/category'style={{ marginLeft: '5px', marginRight:'5px' }} className='extra-links'><Nav.Link>Strategy Games</Nav.Link></LinkContainer >
        <div className='link-seperator'>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</div>
        <LinkContainer  to = '/search/new player/category'style={{ marginLeft: '5px', marginRight:'5px' }} className='extra-links'><Nav.Link>Great for New Players</Nav.Link></LinkContainer >
        <div className='link-seperator'>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</div>
        <LinkContainer  to = '/search/party/category'style={{ marginLeft: '5px', marginRight:'5px' }} className='extra-links'><Nav.Link>Great for Parties</Nav.Link></LinkContainer >
       </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
