import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { Footer } from "../../components/shared/Footer";
import { PromoBanner } from "../../components/shared/PromoBanner";
import { BackButton } from "../../components/shared/BackButton";

export const RefundPolicy = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col min-h-screen w-full">
      <PromoBanner />
      <HeaderWithDropdown />
      
      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-4xl mx-auto w-full">
        <BackButton className="mb-6" />
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <p className="text-lg">
            At KurtHair, we are committed to ensuring your complete satisfaction with every purchase. 
            We understand that choosing the perfect hair extensions is important, and we want you to feel 
            confident in your decision.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Eligibility for Refunds</h2>
            <p>
              We offer refunds on eligible items within <strong>14 days</strong> of delivery, provided the following conditions are met:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The product must be unused, unworn, and in its original packaging</li>
              <li>All tags and protective seals must be intact</li>
              <li>The product must not have been washed, styled, or altered in any way</li>
              <li>Original proof of purchase or order confirmation must be provided</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Non-Refundable Items</h2>
            <p>
              For hygiene and safety reasons, the following items are not eligible for refunds:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hair extensions that have been opened, tried on, or removed from their sealed packaging</li>
              <li>Customized or color-matched products</li>
              <li>Hair care products (shampoos, conditioners, serums)</li>
              <li>Styling tools and accessories</li>
              <li>Sale or clearance items marked as final sale</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Refund Process</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact our customer service team at <strong>alma.lawson@example.com</strong> within 14 days of receiving your order</li>
              <li>Provide your order number and reason for the refund request</li>
              <li>Our team will review your request and provide a Return Merchandise Authorization (RMA) number if approved</li>
              <li>Ship the item(s) back using the provided instructions</li>
              <li>Once we receive and inspect the returned item(s), we will process your refund</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Refund Timeline</h2>
            <p>
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Approved refunds:</strong> Will be processed within 5-7 business days</li>
              <li><strong>Credit card refunds:</strong> May take an additional 3-5 business days to appear on your statement</li>
              <li><strong>Original shipping costs:</strong> Are non-refundable unless the return is due to our error</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Damaged or Defective Items</h2>
            <p>
              If you receive a damaged or defective product, please contact us immediately with photos of the damage. 
              We will arrange for a replacement or full refund at no additional cost to you.
            </p>
          </section>

          <section className="space-y-4 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            <p>
              If you have any questions about our refund policy, please don't hesitate to reach out:
            </p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> alma.lawson@example.com</li>
              <li><strong>Phone:</strong> (603) 555-0123</li>
              <li><strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST</li>
            </ul>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
