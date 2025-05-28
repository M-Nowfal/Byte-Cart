import Link from 'next/link';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-black">
      <h1 className="text-3xl font-bold mb-6">ByteCart Terms of Service</h1>
      <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p className="mb-2">
          By accessing or using ByteCart ("the Platform"), you agree to be bound by these Terms of Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Account Registration</h2>
        <p className="mb-2">
          You must provide accurate information when creating an account and are responsible for maintaining the confidentiality of your credentials.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Product Listings</h2>
        <p className="mb-2">
          All products are sold as-described. We reserve the right to correct pricing errors and limit quantities.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Returns & Refunds</h2>
        <p className="mb-2">
          Returns must be made within 30 days of purchase. See our <span className="text-primary">Return Policy</span> for details.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
        <p className="mb-2">
          ByteCart shall not be liable for any indirect, incidental, or consequential damages arising from use of the Platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Changes to Terms</h2>
        <p className="mb-2">
          We may modify these terms at any time. Continued use after changes constitutes acceptance.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
        <p>
          Questions? Email <span className="text-primary">legal@bytecart.com</span>
        </p>
      </section>
    </div>
  );
}

export default TermsOfService;