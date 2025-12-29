import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";

import Women from "./pages/Women";
import WomenDefault from "./pages/WomenDefault";
import WomenShirt from "./pages/WomenShirt";
import WomenPants from "./pages/WomenPants";
import WomenSkirt from "./pages/WomenSkirt";
import WomenShoes from "./pages/WomenShoes";

import Men from "./pages/Men";
import MenDefault from "./pages/MenDefault";
import ManPants from "./pages/ManPants";
import ManShirt from "./pages/ManShirt";
import ManOuter from "./pages/ManOuter";
import ManShoes from "./pages/ManShoes";

import Sundries from "./pages/Sundries";
import SundriesDefault from "./pages/SundriesDefault";
import SundriesWfashion from "./pages/SundriesWfashion";
import SundriesMfashion from "./pages/SundriesMfashion";
import SundriesWbag from "./pages/SundriesWbag";
import SundriesMbag from "./pages/SundriesMbag";

import Golf from "./pages/Golf";
import GolfDefault from "./pages/GolfDefault";
import GolfWouter from "./pages/GolfWouter";
import GolfMouter from "./pages/GolfMouter";
import GolfWpants from "./pages/GolfWpants";
import GolfMpants from "./pages/GolfMpants";
import GolfAcc from "./pages/GolfAcc";

import Brand from "./pages/Brand";
import BrandDefault from "./pages/BrandDefault";
import BrandRouge from "./pages/BrandRouge";
import BrandSJYP from "./pages/BrandSJYP";
import BrandTommy from "./pages/BrandTommy";

import Search from "./components/Search";
import Login from "./pages/Login";
import Join from "./pages/Join";
import UserInfo from "./pages/UserInfo";
import Cart from "./pages/Cart";
import Logout from "./pages/Logout";
import Pay from "./pages/Pay";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import NonMember from "./pages/NonMember";
import ProductDetail from "./pages/ProductDetail";
import { useEffect } from "react";
import { useProductStore } from "./store/useProductStore";
import MainBrandLive from "./components/MainBrandLive";
import { useAuthStore } from "./store/authstore";
import Picklist from "./pages/Picklist";
import ScrollToTop from "./components/ScrollToTop";
import MemberInfor from "./components/MemberInfor";
import Breadcrumbs from "./components/Breadcrumbs";
import NonPay from "./pages/NonPay";
import MemberDelivery from "./pages/MemberDelivery";

function App() {
  const onFetchItem = useProductStore((state) => state.onFetchItem);
  useEffect(() => {
    onFetchItem();
  }, [onFetchItem]);

  const initAuth = useAuthStore((state) => state.initAuth);
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <div className="App">
      <Header />
      <ScrollToTop />
      <Breadcrumbs />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product-detail/:code" element={<ProductDetail />} />
        <Route path="/women" element={<Women />}>
          <Route index element={<WomenDefault />} />
          <Route path="women-shirt" element={<WomenShirt />} />
          <Route path="women-pants" element={<WomenPants />} />
          <Route path="women-skirt" element={<WomenSkirt />} />
          <Route path="women-shoes" element={<WomenShoes />} />
        </Route>
        <Route path="/men" element={<Men />}>
          <Route index element={<MenDefault />} />
          <Route path="man-pants" element={<ManPants />} />
          <Route path="man-shirt" element={<ManShirt />} />
          <Route path="man-outer" element={<ManOuter />} />
          <Route path="man-shoes" element={<ManShoes />} />
        </Route>
        <Route path="/sundries" element={<Sundries />}>
          <Route index element={<SundriesDefault />} />
          <Route path="sundries-women-fashion" element={<SundriesWfashion />} />
          <Route path="sundries-man-fashion" element={<SundriesMfashion />} />
          <Route path="sundries-women-bag" element={<SundriesWbag />} />
          <Route path="sundries-man-bag" element={<SundriesMbag />} />
        </Route>
        <Route path="/golf" element={<Golf />}>
          <Route index element={<GolfDefault />} />
          <Route path="golf-women-outer" element={<GolfWouter />} />
          <Route path="golf-man-outer" element={<GolfMouter />} />
          <Route path="golf-women-pants" element={<GolfWpants />} />
          <Route path="golf-man-pants" element={<GolfMpants />} />
          <Route path="golf-acc" element={<GolfAcc />} />
        </Route>

        <Route path="/brand" element={<Brand />}>
          <Route index element={<BrandDefault />} />
          <Route path="brand-rouge" element={<BrandRouge />} />
          <Route path="brand-sjyp" element={<BrandSJYP />} />
          <Route path="brand-tommy" element={<BrandTommy />} />
        </Route>

        <Route path="/brand" element={<Brand />}></Route>

        <Route path="*" element={<NotFound />} />

        <Route path="/search" element={<Search />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/nonmember" element={<NonMember />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/userinfo" element={<UserInfo />}></Route>
        <Route path="/userinfo/memberinfor" element={<MemberInfor />} />
        <Route path="/userinfo/memberdelivery" element={<MemberDelivery />} />
        <Route path="/picklist" element={<Picklist />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/pay" element={<Pay />}></Route>
        <Route path="/nonpay" element={<NonPay />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/brandlive" element={<MainBrandLive />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
