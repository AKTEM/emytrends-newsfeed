import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./screens/LandingPage";
import { AuthPage } from "./screens/AuthPage";
import { OurWorldPage } from "./screens/OurWorldPage";
import { ShopPage } from "./screens/ShopPage";
import { LearnPage } from "./screens/LearnPage";
import { ChoosingYourShadePage } from "./screens/LearnPage/ChoosingYourShade";
import { ChoosingYourLengthPage } from "./screens/LearnPage/ChoosingYourLength";
import { CareGuidePage } from "./screens/LearnPage/CareGuide";
import { ProductDetailsPage } from "./screens/ProductDetailsPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/our-world" element={<OurWorldPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/shade" element={<ChoosingYourShadePage />} />
        <Route path="/learn/length" element={<ChoosingYourLengthPage />} />
        <Route path="/learn/care-guide" element={<CareGuidePage />} />
        <Route path="/product/:id" element={<ProductDetailsPage isAvailable={true} />} />
        <Route path="/product/:id/sold-out" element={<ProductDetailsPage isAvailable={false} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
