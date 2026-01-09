import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { Footer } from "../../components/shared/Footer";
import { PromoBanner } from "../../components/shared/PromoBanner";
import { BackButton } from "../../components/shared/BackButton";

export const ShippingDelivery = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col min-h-screen w-full">
      <PromoBanner />
      <HeaderWithDropdown />
      
      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-4xl mx-auto w-full">
        <BackButton className="mb-6" />
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Shipping & Deliveries</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <p className="text-lg">
            At KurtHair, we're committed to getting your premium hair extensions to you as quickly and 
            safely as possible. All orders are carefully packaged to ensure your products arrive in 
            perfect condition.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Shipping Options</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Method</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Delivery Time</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Standard Shipping</td>
                    <td className="border border-gray-200 px-4 py-3">5-7 Business Days</td>
                    <td className="border border-gray-200 px-4 py-3">$7.99</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">Express Shipping</td>
                    <td className="border border-gray-200 px-4 py-3">2-3 Business Days</td>
                    <td className="border border-gray-200 px-4 py-3">$14.99</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3">Priority Overnight</td>
                    <td className="border border-gray-200 px-4 py-3">1 Business Day</td>
                    <td className="border border-gray-200 px-4 py-3">$24.99</td>
                  </tr>
                  <tr className="bg-amber-50">
                    <td className="border border-gray-200 px-4 py-3 font-semibold">FREE Shipping</td>
                    <td className="border border-gray-200 px-4 py-3">5-7 Business Days</td>
                    <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">Orders $150+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Processing Time</h2>
            <p>
              All orders are processed within <strong>1-2 business days</strong> (Monday-Friday, excluding holidays). 
              Orders placed after 2:00 PM EST will be processed the next business day.
            </p>
            <p className="text-sm bg-blue-50 p-4 rounded-lg border border-blue-200">
              <strong>Note:</strong> During peak seasons (holidays, sales events), processing times may be 
              extended by 1-2 additional business days.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">International Shipping</h2>
            <p>
              We currently ship to the following countries:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Canada:</strong> 7-14 business days ($19.99)</li>
              <li><strong>United Kingdom:</strong> 10-15 business days ($24.99)</li>
              <li><strong>Australia:</strong> 12-18 business days ($29.99)</li>
              <li><strong>European Union:</strong> 10-15 business days ($24.99)</li>
            </ul>
            <p className="text-sm text-gray-600">
              <strong>Important:</strong> International customers are responsible for any customs duties, 
              taxes, or fees imposed by their country.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Order Tracking</h2>
            <p>
              Once your order ships, you'll receive an email with your tracking number. You can also 
              track your order by:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Logging into your account and visiting "Order History"</li>
              <li>Clicking the tracking link in your shipping confirmation email</li>
              <li>Contacting our customer service team with your order number</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Delivery Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All packages require a signature upon delivery for orders over $200</li>
              <li>We ship to residential and business addresses</li>
              <li>P.O. Box delivery is available for Standard Shipping only</li>
              <li>We cannot ship to APO/FPO addresses at this time</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Lost or Damaged Packages</h2>
            <p>
              If your package is lost or arrives damaged:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact us within <strong>48 hours</strong> of the expected delivery date</li>
              <li>Provide photos of any damage to the packaging or products</li>
              <li>We will file a claim with the carrier and work to resolve the issue promptly</li>
              <li>Replacement shipments or refunds will be issued once the claim is processed</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Address Changes</h2>
            <p>
              Need to change your shipping address? Please contact us immediately after placing your order. 
              Once an order has shipped, we cannot modify the delivery address.
            </p>
          </section>

          <section className="space-y-4 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900">Shipping Questions?</h2>
            <p>
              Our customer care team is ready to assist:
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
