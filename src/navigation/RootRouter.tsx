import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../modules/shared/Loader/components/Loader";
import ProductDetailScreen from "../modules/productDetail/productDetail.screen";
import AboutUs from "../modules/aboutUs/aboutUs.screen";

const HomeScreen = React.lazy(() => import("../modules/home/HomeScreen"));

const PromotionDetailScreen = React.lazy(
  () => import("../modules/promotionDetail/PromotionDetailScreen")
);

const StoreScreen = React.lazy(
  () => import("../modules/store/store.screen")
);

const ExchangeScreen = React.lazy(
  () => import("../modules/exchangeProducts/exchange.screen")
);

const UserProfileScreen = React.lazy(
  () => import("../modules/userProfile/UserProfileScreen")
);

const HighlightedScreen = React.lazy(
  () => import("../modules/highlightedCampaigns/HighlightedCampaignScreen")
);

const CheckOut = React.lazy(
  () => import("../modules/checkout/checkout.screen")
);

const Address = React.lazy(
  () => import("../modules/address/address.screen")
);

const RecommendedProducts = React.lazy(
  () => import("../modules/recommendedProducts/RecommendedProductsScreen")
);

const RootRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <HomeScreen />
            {/* <Loader /> */}
          </React.Suspense>
        }
      />
      <Route
        path="/home"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <HomeScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/promotion-detail"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <PromotionDetailScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/store"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <StoreScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/exchange-products"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <ExchangeScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/product-detail"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <ProductDetailScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/user-profile"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <UserProfileScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/aboutus"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <AboutUs />
          </React.Suspense>
        }
      />
      <Route
        path="/highlighted-campaigns"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <HighlightedScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/checkout"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <CheckOut />
          </React.Suspense>
        }
      />

      <Route
        path="/address/*"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <Address />
          </React.Suspense>
        }
      />

      <Route
        path="/recommended-products"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <RecommendedProducts />
          </React.Suspense>
        }
      />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default RootRouter;
