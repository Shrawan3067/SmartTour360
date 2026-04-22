import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Personal information (name, email, phone number, address)</li>
                <li>Account credentials (username, password)</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Travel preferences and booking history</li>
                <li>Communications with our customer support team</li>
              </ul>
              <p className="text-gray-600">
                We also automatically collect certain information about your device and usage patterns, such as IP address, browser type, and pages visited.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Process and fulfill your bookings</li>
                <li>Communicate with you about your bookings and account</li>
                <li>Provide customer support</li>
                <li>Improve our services and develop new features</li>
                <li>Send you promotional communications (with your consent)</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="text-gray-600">
                We will not use your information for purposes other than those described in this policy without your consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li><strong>Service Providers:</strong> Third-party companies that perform services on our behalf (payment processors, email services, analytics providers)</li>
                <li><strong>Travel Partners:</strong> Hotels, tour operators, and other service providers necessary to fulfill your bookings</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
              <p className="text-gray-600">
                We do not sell your personal information to third parties for their marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure payment processing through PCI-compliant processors</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication systems</li>
                <li>Secure data storage and backup systems</li>
              </ul>
              <p className="text-gray-600">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Privacy Rights</h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              </ul>
              <p className="text-gray-600">
                To exercise these rights, please contact us at privacy@smarttour360.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Remember your preferences and login information</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Personalize content and advertisements</li>
                <li>Improve website functionality and user experience</li>
              </ul>
              <p className="text-gray-600">
                You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Services</h2>
              <p className="text-gray-600 mb-4">
                Our website may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
              </p>
              <p className="text-gray-600">
                Third-party services we use include:
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Payment gateways (Razorpay, Stripe)</li>
                <li>Analytics tools (Google Analytics)</li>
                <li>Social media platforms (Facebook, Instagram, Twitter)</li>
                <li>Email marketing services (Mailchimp)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-600">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfer</h2>
              <p className="text-gray-600">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Policy Updates</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600"><strong>Email:</strong> privacy@smarttour360.com</p>
                <p className="text-gray-600"><strong>Address:</strong> 123 Heritage Lane, Cultural District, Mumbai, Maharashtra 400001, India</p>
                <p className="text-gray-600"><strong>Phone:</strong> +91 1800-123-4567</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Effective Date</h2>
              <p className="text-gray-600">
                This Privacy Policy is effective as of January 1, 2024, and was last updated on April 15, 2024.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
