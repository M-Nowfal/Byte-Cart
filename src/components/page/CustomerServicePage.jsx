import { Truck, ShieldCheck, CreditCard, MessageSquare, Mail, Phone } from 'lucide-react';

const CustomerServicePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Service</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're here to help you with any questions or concerns about your Byte Cart experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <ServiceCard 
          icon={<Truck size={40} className="text-blue-500" />}
          title="Shipping & Delivery"
          description="Track your order or learn about our shipping policies"
        />
        <ServiceCard 
          icon={<ShieldCheck size={40} className="text-green-500" />}
          title="Returns & Refunds"
          description="Easy 30-day return policy for all products"
        />
        <ServiceCard 
          icon={<CreditCard size={40} className="text-purple-500" />}
          title="Payment Options"
          description="Secure payment methods we accept"
        />
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FAQItem 
            question="How long does delivery take?"
            answer="Most orders arrive within 3-5 business days. Express shipping options are available at checkout."
          />
          <FAQItem 
            question="Can I change or cancel my order?"
            answer="You can modify your order within 1 hour of placement. Contact us immediately for assistance."
          />
          <FAQItem 
            question="What payment methods do you accept?"
            answer="We accept all major credit cards, UPI, net banking, and popular digital wallets."
          />
          <FAQItem 
            question="How do I track my order?"
            answer="You'll receive a tracking number via email once your order ships. You can also check in your account."
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Need More Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactMethod 
            icon={<MessageSquare size={24} className="text-pink-500" />}
            title="Live Chat"
            description="Chat instantly with our support team"
            action="Start Chat"
          />
          <ContactMethod 
            icon={<Mail size={24} className="text-blue-500" />}
            title="Email Us"
            description="We'll respond within 24 hours"
            action="support@bytecart.com"
          />
          <ContactMethod 
            icon={<Phone size={24} className="text-green-500" />}
            title="Call Us"
            description="24/7 customer support"
            action="+91 98765 43210"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow shadow-gray-400">
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <details className="group bg-white p-4 rounded-lg border border-gray-200">
    <summary className="flex justify-between items-center cursor-pointer">
      <span className="font-medium text-gray-900">{question}</span>
      <span className="text-gray-500 group-open:hidden">+</span>
      <span className="text-gray-500 hidden group-open:inline">−</span>
    </summary>
    <p className="mt-3 text-gray-600">{answer}</p>
  </details>
);

const ContactMethod = ({ icon, title, description, action }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center mb-4">
      <div className="mr-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <button className="inline-block px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700 transition-colors btn border-0">
      {action}
    </button>
  </div>
);

export default CustomerServicePage;