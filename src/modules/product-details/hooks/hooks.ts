import {
  useGetProductByCategory,
  useGetProductDetails,
} from '@/services/products/products-queries';
import { Categories, Products } from '@/services/products/types';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useProductDetailsHooks = () => {
  const router = useRouter();
  const { id } = router?.query;

  const increaseCartQuantity = useCartStore(state => state.increaseCartQuantity);
  const decreaseCartQuantity = useCartStore(state => state.decreaseCartQuantity);

  const {
    data: productDetails,
    isLoading: isLoadingProductDetails,
    isError: isErrorProductDetails,
  } = useGetProductDetails(id);

  const {
    data: productCategory,
    isLoading: isLoadingProductCategory,
    isError: isErrorProductByCategory,
  } = useGetProductByCategory(productDetails?.category as Categories);

  //state
  const [dynamicProductDetails, setDynamicProductDetails] = useState(productDetails);
  const [productQuantity, setProductQuantity] = useState(1);

  // ROUND OF PRODUCT RATE
  const rate = Math.round(
    dynamicProductDetails?.rating?.rate || productDetails?.rating?.rate || 0,
  ) as number;

  // DYNAMIC PRODUCT DETAILS
  const handleDynamicProductDetails = (productDetails: Products) => {
    console.log('hello');
    setDynamicProductDetails(productDetails);
  };

  // DECREASE QUANTITY
  const decreaseProductQuantity = (id: number) => {
    setProductQuantity(prevCount => {
      if (prevCount === 1) {
        return 1;
      } else {
        return prevCount - 1;
      }
    });

    decreaseCartQuantity(id);
  };

  // ADD QUANTITY
  const increaseProductQuantity = () => {
    setProductQuantity(prevCount => prevCount + 1);
  };

  const handleAddToCart = (id: number) => {
    increaseCartQuantity(id);
  };

  return {
    // DATA
    rate,
    // STATE
    dynamicProductDetails,
    productQuantity,
    // API DATA
    productDetails,
    isLoadingProductDetails,
    productCategory,
    isLoadingProductCategory,
    // FUNCTIONS
    handleDynamicProductDetails,
    decreaseProductQuantity,
    increaseProductQuantity,
    // CART FUNCTIONS
    handleAddToCart,
  };
};
