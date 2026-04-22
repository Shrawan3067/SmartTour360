import React from 'react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Please read these terms carefully before using our services.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing or using SmartTour360 services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Your continued use of our services after such modifications constitutes your acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Description</h2>
              <p className="text-gray-600 mb-4">
                SmartTour360 provides a platform for booking travel experiences, including heritage tours, cultural experiences, and destination management services. We act as an intermediary between travelers and service providers.
              </p>
              <p className="text-gray-600">
                We strive to provide accurate and up-to-date information about destinations, pricing, and availability. However, we do not guarantee the accuracy, completeness, or reliability of any information on our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-600 mb-4">
                To access certain features of our services, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p className="text-gray-600 mb-4">
                You agree to provide accurate, current, and complete information during registration. You must notify us immediately of any unauthorized use of your account or any other breach of security.
              </p>
              <p className="text-gray-600">
                We reserve the right to terminate or suspend your account at any time for violation of these terms or for any other reason at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Bookings and Payments</h2>
              <p className="text-gray-600 mb-4">
                All bookings are subject to availability and confirmation. Payment must be made in full at the time of booking unless otherwise specified. We accept various payment methods as listed on our platform.
              </p>
              <p className="text-gray-600 mb-4">
                Cancellation policies vary by destination and package type. Please review the specific cancellation policy for your booking before confirming your reservation.
              </p>
              <p className="text-gray-600">
                Prices displayed on our platform are inclusive of taxes unless otherwise stated. We reserve the right to modify prices at any time without prior notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cancellation and Refunds</h2>
              <p className="text-gray-600 mb-4">
                Cancellation requests must be made through your dashboard or by contacting our customer support team. Refunds will be processed according to the specific cancellation policy of your booking.
              </p>
              <p className="text-gray-600 mb-4">
                Standard cancellation policy:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Full refund for cancellations made 48+ hours before travel date</li>
                <li>50% refund for cancellations made 24-48 hours before travel date</li>
                <li>No refund for cancellations made within 24 hours of travel date</li>
              </ul>
              <p className="text-gray-600">
                Refund processing time is typically 7-10 business days from the date of cancellation approval.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Responsibilities</h2>
              <p className="text-gray-600 mb-4">
                As a user of our services, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Provide accurate and complete information for bookings</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Respect local customs and traditions at destinations</li>
                <li>Follow safety guidelines provided by tour operators</li>
                <li>Not engage in fraudulent or deceptive activities</li>
                <li>Not use our platform for any illegal purpose</li>
              </ul>
              <p className="text-gray-600">
                Violation of these responsibilities may result in account termination and legal action.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                All content on our platform, including text, graphics, logos, images, and software, is the property of SmartTour360 or its content suppliers and is protected by intellectual property laws.
              </p>
              <p className="text-gray-600">
                You may not use, reproduce, distribute, or create derivative works of our content without our express written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                SmartTour360 shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services.
              </p>
              <p className="text-gray-600">
                Our total liability to you for all claims shall not exceed the amount you paid for the specific service giving rise to the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy Policy</h2>
              <p className="text-gray-600">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-600">
                These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600"><strong>Email:</strong> legal@smarttour360.com</p>
                <p className="text-gray-600"><strong>Address:</strong> 123 Heritage Lane, Cultural District, Mumbai, Maharashtra 400001, India</p>
                <p className="text-gray-600"><strong>Phone:</strong> +91 1800-123-4567</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Amendments</h2>
              <p className="text-gray-600">
                We reserve the right to amend these terms at any time. All amendments will be posted on this page, and your continued use of our services constitutes acceptance of the amended terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
