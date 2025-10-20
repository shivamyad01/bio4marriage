import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Bio4Marriage',
  description: 'Learn how we protect your personal information and respect your privacy at Bio4Marriage.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="prose max-w-none">
        <section className="mb-12">
          <p className="text-gray-700 mb-6">
            At Bio4Marriage, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you use our services. Please read this privacy policy 
            carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Personal information such as name, email address, phone number, and date of birth</li>
            <li>Profile information including photos, education, and employment details</li>
            <li>Biodata content that you create using our platform</li>
            <li>Payment and billing information when you make a purchase</li>
          </ul>
          <p className="text-gray-700">
            We also automatically collect certain information when you visit our website, such as your IP address, 
            browser type, operating system, and usage data through cookies and similar technologies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
          <p className="text-gray-700 mb-4">
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties 
            except as described in this Privacy Policy. We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Service providers who perform services on our behalf</li>
            <li>Business partners to offer you certain products, services, or promotions</li>
            <li>Other parties when required by law or to protect our rights</li>
            <li>Other parties with your consent or at your direction</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational measures to protect the security of your personal 
            information. However, please be aware that no security measures are perfect or impenetrable, and we 
            cannot guarantee the security of your information.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Privacy Rights</h2>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>The right to access, update, or delete your information</li>
            <li>The right to object to or restrict our processing of your information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p className="text-gray-700">
            To exercise any of these rights, please contact us using the information provided below.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Children's Privacy</h2>
          <p className="text-gray-700">
            Our services are not intended for children under the age of 18. We do not knowingly collect personal 
            information from children under 18. If we learn that we have collected personal information from a child 
            under 18, we will take steps to delete such information as soon as possible.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>
          <p className="text-gray-700">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy 
            are effective when they are posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <address className="not-italic">
            <p className="text-gray-700">Bio4Marriage Inc.</p>
            <p className="text-gray-700">123 Marriage Lane</p>
            <p className="text-gray-700">San Francisco, CA 94107</p>
            <p className="text-gray-700">Email: <a href="mailto:privacy@bio4marriage.com" className="text-pink-600 hover:underline">privacy@bio4marriage.com</a></p>
          </address>
        </section>
      </div>
    </div>
  );
}
