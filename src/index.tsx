import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LandingPage } from "./screens/LandingPage";
import { AuthPage } from "./screens/AuthPage";
import { OurWorldPage } from "./screens/OurWorldPage";
import { ShopPage } from "./screens/ShopPage";
import { ShopAllPage } from "./screens/ShopAllPage";
import { PonytailPage } from "./screens/PonytailPage";
import { LearnPage } from "./screens/LearnPage";
import { ChoosingYourShadePage } from "./screens/LearnPage/ChoosingYourShade";
import { ChoosingYourLengthPage } from "./screens/LearnPage/ChoosingYourLength";
import { CareGuidePage } from "./screens/LearnPage/CareGuide";
import { ProductDetailsPage } from "./screens/ProductDetailsPage";
import { CheckoutPage } from "./screens/CheckoutPage";
import { MyAccount } from "./screens/Dashboard/MyAccount";
import { Orders } from "./screens/Dashboard/Orders";
import { OrderDetails } from "./screens/Dashboard/OrderDetails";
import { PackageHistory } from "./screens/Dashboard/PackageHistory";
import { Wishlist } from "./screens/Dashboard/Wishlist";
import { Payment } from "./screens/Dashboard/Payment";
import { AddressBook } from "./screens/Dashboard/AddressBook";
import { SecuritySettings } from "./screens/Dashboard/SecuritySettings";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/our-world" element={<OurWorldPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/all" element={<ShopAllPage />} />
          <Route path="/shop/ponytail" element={<PonytailPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/shade" element={<ChoosingYourShadePage />} />
          <Route path="/learn/length" element={<ChoosingYourLengthPage />} />
          <Route path="/learn/care-guide" element={<CareGuidePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage isAvailable={true} />} />
          <Route path="/product/:id/sold-out" element={<ProductDetailsPage isAvailable={false} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/dashboard" element={<MyAccount />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/orders/:orderId" element={<OrderDetails />} />
          <Route path="/dashboard/orders/:orderId/tracking" element={<PackageHistory />} />
          <Route path="/dashboard/wishlist" element={<Wishlist />} />
          <Route path="/dashboard/payment" element={<Payment />} />
          <Route path="/dashboard/address-book" element={<AddressBook />} />
          <Route path="/dashboard/security" element={<SecuritySettings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
