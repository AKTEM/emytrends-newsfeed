import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminProvider } from "./contexts/AdminContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";
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
import { AdminLoginPage } from "./screens/AdminPage";
import { AdminDashboardLayout, AdminDashboardHome, AdminProducts, AdminProductForm, AdminBlogs, AdminBlogForm, AdminAnalytics, AdminOrders, AdminSettings } from "./screens/AdminDashboard";
import { ProtectedAdminRoute } from "./components/admin/ProtectedAdminRoute";
import { BlogPage, BlogPostPage } from "./screens/BlogPage";
import { RefundPolicy, ReturnExchange, ShippingDelivery, PaymentPricing } from "./screens/PolicyPages";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <AdminProvider>
          <WishlistProvider>
            <CartProvider>
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
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/dashboard" element={<MyAccount />} />
                <Route path="/dashboard/orders" element={<Orders />} />
                <Route path="/dashboard/orders/:orderId" element={<OrderDetails />} />
                <Route path="/dashboard/orders/:orderId/tracking" element={<PackageHistory />} />
                <Route path="/dashboard/wishlist" element={<Wishlist />} />
                <Route path="/dashboard/payment" element={<Payment />} />
                <Route path="/dashboard/address-book" element={<AddressBook />} />
                <Route path="/dashboard/security" element={<SecuritySettings />} />
                
                {/* Blog Routes */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                
                {/* Policy Routes */}
                <Route path="/policies/refund" element={<RefundPolicy />} />
                <Route path="/policies/return-exchange" element={<ReturnExchange />} />
                <Route path="/policies/shipping" element={<ShippingDelivery />} />
                <Route path="/policies/payment" element={<PaymentPricing />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboardLayout />
                    </ProtectedAdminRoute>
                  }
                >
                  <Route path="dashboard" element={<AdminDashboardHome />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/new" element={<AdminProductForm />} />
                  <Route path="products/edit/:id" element={<AdminProductForm />} />
                  <Route path="blogs" element={<AdminBlogs />} />
                  <Route path="blogs/new" element={<AdminBlogForm />} />
                  <Route path="blogs/edit/:id" element={<AdminBlogForm />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Routes>
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
        </AdminProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
