import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {products.map((product) => (
       
        <Carousel.Item key={product._id} >
          <Link to={`/product/${product._id}`}>
          <div className='row'>
          <div className='col-md-4 col-lg-3'>
            <Image src={product.image} alt={product.name} fluid  className='carousel-image'/>
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
         
          </div>
          <div className='col-md-7 col-lg-8 d-none d-md-block' style={{marginTop:'40px', marginRight:'25px', marginLeft:'25px', color:'white' }} >
            <h4 className='carousel-text'>{product.description}</h4>
          </div>
        </div>
        </Link>
        </Carousel.Item>
        


      ))}

    </Carousel>
  );
};

export default ProductCarousel;
