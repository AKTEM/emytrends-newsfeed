import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { Footer } from "../../components/shared/Footer";
import { PromoBanner } from "../../components/shared/PromoBanner";
import { BackButton } from "../../components/shared/BackButton";

export const ReturnExchange = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col min-h-screen w-full">
      <PromoBanner />
      <HeaderWithDropdown />
      
      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-4xl mx-auto w-full">
        <BackButton className="mb-6" />
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Return & Exchanges</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <p className="text-lg">
            We want you to love your KurtHair products. If your purchase doesn't meet your expectations, 
            we're here to help with easy returns and exchanges.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Return Policy</h2>
            <p>
              You may return eligible items within <strong>14 days</strong> of delivery for a full refund or exchange. 
              To qualify for a return:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Items must be in original, unopened packaging</li>
              <li>Products must be unworn and unaltered</li>
              <li>All original tags and labels must be attached</li>
              <li>Items must be free from odors, pet hair, and any signs of use</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Exchange Process</h2>
            <p>
              Want to exchange for a different shade, length, or texture? We make it simple:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Email us at <strong>alma.lawson@example.com</strong> with your order number</li>
              <li>Specify the item you wish to exchange and the replacement you'd like</li>
              <li>We'll confirm availability and provide shipping instructions</li>
              <li>Once we receive your return, we'll ship your new item within 2-3 business days</li>
            </ol>
            <p className="text-sm bg-amber-50 p-4 rounded-lg border border-amber-200">
              <strong>Pro Tip:</strong> Not sure which shade is right for you? Contact our hair specialists 
              for a free color consultation before making an exchange.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">How to Initiate a Return</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Log into your KurtHair account and navigate to "Order History"</li>
              <li>Select the order containing the item(s) you wish to return</li>
              <li>Click "Request Return" and follow the prompts</li>
              <li>Print your prepaid return label (where applicable)</li>
              <li>Pack items securely and drop off at the designated carrier location</li>
            </ol>
            <p>
              <strong>Don't have an account?</strong> No problem! Simply email our customer service team 
              with your order details.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Return Shipping</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Defective or incorrect items:</strong> Free return shipping provided</li>
              <li><strong>Change of mind:</strong> Customer is responsible for return shipping costs</li>
              <li><strong>Exchanges:</strong> Original shipping is non-refundable; new shipping charges may apply</li>
            </ul>
            <p>
              We recommend using a trackable shipping method and purchasing shipping insurance for items over $100.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Items Not Eligible for Return</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hair extensions that have been opened, worn, or washed</li>
              <li>Custom-colored or specially ordered products</li>
              <li>Hair care products with broken seals</li>
              <li>Items marked as "Final Sale"</li>
              <li>Gift cards</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Processing Time</h2>
            <p>
              Please allow the following timeframes for processing:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Return inspection:</strong> 3-5 business days after receipt</li>
              <li><strong>Refund processing:</strong> 5-7 business days after approval</li>
              <li><strong>Exchange shipment:</strong> 2-3 business days after return receipt</li>
            </ul>
          </section>

          <section className="space-y-4 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900">Need Assistance?</h2>
            <p>
              Our dedicated customer care team is here to help with any return or exchange questions:
            </p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> alma.lawson@example.com</li>
              <li><strong>Phone:</strong> (603) 555-0123</li>
              <li><strong>Live Chat:</strong> Available on our website during business hours</li>
            </ul>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
