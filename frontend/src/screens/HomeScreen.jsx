import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber,field, keyword, } = useParams();

  const { data, isFetching , error } = useGetProductsQuery({
    keyword,
    field,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <>

        <h1 className='text-center'>Check out these popular games!</h1>
        <ProductCarousel />
        <h1 className='text-center'>Latest Games</h1>
        </>

      ) : (
        <>
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
        <div className='text-center'>
        {field==="category"?(keyword==="social deduction"?(<h1>Social Deduction Games</h1>):
        keyword==="kids"?(<h1>Great for Kids</h1>):
        keyword==="strategy"?(<h1>Strategy Enthusiasts</h1>):
        keyword==="new player"?(<h1>Great for New Players</h1>):
        keyword==="party"?(<h1>Great for Parties</h1>):(<></>)):(<h1>Search Results</h1>)}
        </div>
        </>

        
      )}

      {isFetching  ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
