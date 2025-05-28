const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-black">
      <h1 className="text-3xl font-bold mb-6">ByteCart Privacy Policy</h1>
      <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
        <p className="mb-2">
          We collect personal information including name, email, address, payment details, and browsing behavior to provide our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. How We Use Information</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Process orders and payments</li>
          <li>Improve our products and services</li>
          <li>Send transactional emails and promotional offers (with consent)</li>
          <li>Prevent fraud and comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Data Sharing</h2>
        <p className="mb-2">
          We only share data with:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Payment processors to complete transactions</li>
          <li>Shipping carriers to deliver products</li>
          <li>When required by law enforcement</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Cookies</h2>
        <p className="mb-2">
          We use cookies to remember preferences and analyze site traffic. You can disable cookies in browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
        <p className="mb-2">
          You may:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Access, update, or delete your information</li>
          <li>Opt-out of marketing communications</li>
          <li>Request data portability</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Security</h2>
        <p className="mb-2">
          We implement SSL encryption, secure payment processing, and regular security audits to protect your data.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
        <p>
          For privacy concerns: <span className="text-primary">privacy@bytecart.com</span>
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;