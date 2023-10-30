import { useProductDetailsHooks } from '../hooks/hooks';

import dynamic from 'next/dynamic';

const ProductErrorScreen = dynamic(
  () => import('@/modules/products/components/product-error-screen'),
);
const ProductDetailsSkeletonLoader = dynamic(
  () => import('./loader/product-details-skeleton-loader'),
);
const ProductDetailsBackBtn = dynamic(() => import('./product-details-back-btn'));
const ProductDetailsHero = dynamic(() => import('./product-details-hero'));
const ProductDetailsInfo = dynamic(() => import('./product-details-info'));
const ProductDetailsRelated = dynamic(() => import('./product-details-related'));

type ProductDetailsProps = {
  isErrorFetchingProduct?: unknown;
};

const ProductDetails = ({ isErrorFetchingProduct }: ProductDetailsProps) => {
  const {
    // API DATA
    isLoadingProductDetails,
    isLoadingProductCategory,
    // STATE
    dynamicProductDetails,
    // FUNCTIONS
    handleDynamicProductDetails,
  } = useProductDetailsHooks();

  // LOADING STATE
  if (isLoadingProductDetails || isLoadingProductCategory) {
    return <ProductDetailsSkeletonLoader />;
  }

  // ERROR STATE
  if (isErrorFetchingProduct) {
    return <ProductErrorScreen />;
  }

  return (
    <div className="w-[90%] lg:w-[85%] m-auto pb-10">
      <div className="relative flex flex-col laptop:flex-row laptop:gap-10 items-center laptop:h-full laptop:mt-20">
        {/* BACK BUTTON */}
        <ProductDetailsBackBtn />

        {/* PRODUCT HERO */}
        <ProductDetailsHero
          dynamicProductDetails={dynamicProductDetails}
          handleDynamicProductDetails={handleDynamicProductDetails}
        />

        {/* PRODUCT DETAILS */}
        <ProductDetailsInfo dynamicProductDetails={dynamicProductDetails} />
      </div>

      {/* RELATED PRODUCTS */}
      <ProductDetailsRelated />
    </div>
  );
};

export default ProductDetails;
