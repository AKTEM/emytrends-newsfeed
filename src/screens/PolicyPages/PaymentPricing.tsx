import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { Footer } from "../../components/shared/Footer";
import { PromoBanner } from "../../components/shared/PromoBanner";
import { BackButton } from "../../components/shared/BackButton";

export const PaymentPricing = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col min-h-screen w-full">
      <PromoBanner />
      <HeaderWithDropdown />
      
      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-4xl mx-auto w-full">
        <BackButton className="mb-6" />
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Payment & Pricing</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <p className="text-lg">
            KurtHair offers secure, flexible payment options to make purchasing your premium hair 
            extensions easy and convenient. We believe in transparent pricing with no hidden fees.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Accepted Payment Methods</h2>
            <p>We accept the following payment methods:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="font-semibold">Visa</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="font-semibold">Mastercard</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="font-semibold">American Express</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="font-semibold">Discover</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="font-semibold">PayPal</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="font-semibold">Apple Pay</span>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Buy Now, Pay Later</h2>
            <p>
              We've partnered with flexible payment solutions to help you spread your purchase over time:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Afterpay:</strong> Split your purchase into 4 interest-free payments, 
                paid every 2 weeks
              </li>
              <li>
                <strong>Klarna:</strong> Pay in 4 interest-free installments or choose monthly 
                financing options
              </li>
              <li>
                <strong>Affirm:</strong> Monthly payments with transparent rates and no hidden fees
              </li>
            </ul>
            <p className="text-sm bg-green-50 p-4 rounded-lg border border-green-200">
              <strong>No Credit Impact:</strong> Checking your eligibility for Buy Now, Pay Later 
              options does not affect your credit score.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Pricing Transparency</h2>
            <p>
              All prices displayed on our website are in <strong>USD (US Dollars)</strong> and include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The complete cost of the product</li>
              <li>Any applicable taxes will be calculated at checkout based on your location</li>
              <li>Shipping costs are displayed separately and calculated based on your selected method</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Currency & International Orders</h2>
            <p>
              For international customers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prices are charged in USD; your bank will convert to your local currency</li>
              <li>Exchange rates are determined by your financial institution</li>
              <li>International transaction fees may apply depending on your bank</li>
              <li>Customs duties and import taxes are the customer's responsibility</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Secure Transactions</h2>
            <p>
              Your payment security is our top priority:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>SSL Encryption:</strong> All transactions are protected with 256-bit 
                SSL encryption
              </li>
              <li>
                <strong>PCI Compliant:</strong> We adhere to Payment Card Industry Data Security 
                Standards
              </li>
              <li>
                <strong>Fraud Protection:</strong> Advanced fraud detection to protect your information
              </li>
              <li>
                <strong>No Stored Data:</strong> We never store your full credit card information 
                on our servers
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Discount Codes & Promotions</h2>
            <p>
              To apply a discount code:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Add items to your cart and proceed to checkout</li>
              <li>Enter your promo code in the designated field</li>
              <li>Click "Apply" to see your discount reflected</li>
            </ol>
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Only one promotional code can be applied per order. Discount 
              codes cannot be combined with other offers unless specifically stated.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Price Matching</h2>
            <p>
              We're confident in our competitive pricing. If you find the exact same product at a 
              lower price from an authorized retailer, contact us within 7 days of purchase, and 
              we'll review your request for a price adjustment.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Gift Cards</h2>
            <p>
              KurtHair gift cards are available in various denominations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Available in $25, $50, $100, $150, and $200 values</li>
              <li>Gift cards never expire</li>
              <li>Can be combined with other payment methods</li>
              <li>Non-refundable and cannot be exchanged for cash</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Payment Issues</h2>
            <p>
              If you experience any payment issues:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verify your card details are entered correctly</li>
              <li>Ensure your billing address matches your card statement</li>
              <li>Check that your card hasn't expired</li>
              <li>Contact your bank to ensure no holds or restrictions</li>
              <li>Try an alternative payment method</li>
            </ul>
          </section>

          <section className="space-y-4 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900">Payment Support</h2>
            <p>
              Having trouble with payment? Our team is here to help:
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
