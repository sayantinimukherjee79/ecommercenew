import React from 'react';

function TermsAndConditions({ show, onClose }) {
  if (!show) return null;

  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div 
        onClick={e => e.stopPropagation()} 
        className="max-w-4xl w-full bg-white p-6 md:p-12 rounded-lg shadow-md max-h-[80vh] overflow-y-auto"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Terms and Conditions
        </h1>

        {/* Sections */}
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            Welcome to ThemeHunk! Please read these terms and conditions carefully
            before using our website or services. By accessing or using our website,
            you agree to be bound by these terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Use of Website</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to use the website only for lawful purposes and in a way that does
            not infringe the rights of others or restrict their use of the website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Account Responsibility</h2>
          <p className="text-gray-700 leading-relaxed">
            If you create an account, you are responsible for maintaining the confidentiality
            of your account credentials and for all activities under your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            All content on this website, including text, graphics, logos, and images, is
            owned by ThemeHunk or its content suppliers and is protected by copyright laws.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            ThemeHunk shall not be liable for any damages arising from the use or inability
            to use our website or services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these terms at any time. Your continued use of
            the website constitutes acceptance of the updated terms.
          </p>
        </section>

        {/* Close Button */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-blue-950 text-white rounded hover:bg-blue-900 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default TermsAndConditions;
