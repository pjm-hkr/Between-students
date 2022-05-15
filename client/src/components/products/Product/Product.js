import React, { Fragment, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';
import Loading from '../../../pages/Loading/Loading';
import styles from './Product.module.css';
import useLoading from '../../../hooks/useLoading';
import UnknownRoute from '../../../pages/UnknownRoute';
import formatDate from '../../../utils/dateFormatter';
import {
  clearCurrentProduct,
  setCurrentProduct
} from '../../../context/product/ProductState';

const Product = () => {
  // Get the product ID from the url parameters
  const { productId } = useParams();

  const [productState, productDispatch] = useProducts();

  const { products, currentProduct } = productState;

  const navigate = useNavigate();

  useEffect(() => {
    if (products) {
      setCurrentProduct(productDispatch, productId);
    }
    return () => {
      clearCurrentProduct(productDispatch);
    };
  }, [productDispatch, productId, currentProduct, products]);

  const handleClick = () => {
    const path = currentProduct.productImage;
    <Link to={path}></Link>;
  };

  const loading = useLoading(1000);

  if (loading || !products) return <Loading />;

  const date = formatDate(currentProduct.createdAt);

  if (currentProduct === undefined) return <UnknownRoute />;

  return (
    <Fragment>
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <img
            src={currentProduct.productImage}
            alt={currentProduct.title}
            className={styles.productImage}
            onClick={<Link to={currentProduct.productImage}></Link>}
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.productHeading}>
            <div className={styles.productTitle}>{currentProduct.title}</div>
            <div className={styles.productCategory}>{currentProduct.category}</div>
          </div>
          <div className={styles.productMeta}>
            <div className={styles.productCost}>{currentProduct.cost} kr</div>
            <div className={styles.productDate}>{date}</div>
          </div>
          <hr />
          <div className={styles.productDescription}>{currentProduct.description}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
