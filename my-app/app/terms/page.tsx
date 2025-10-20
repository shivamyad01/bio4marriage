import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - Bio4Marriage',
  description: 'Read our Terms of Service to understand the rules and guidelines for using Bio4Marriage.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="prose max-w-none">
        <section className="mb-12">
          <p className="text-gray-700 mb-6">
            Welcome to Bio4Marriage. These Terms of Service ("Terms") govern your access to and use of the Bio4Marriage 
            website, applications, and services (collectively, the "Service"). Please read these Terms carefully before 
            using the Service.
          </p>
          <p className="text-gray-700">
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of 
            these Terms, you may not access the Service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Account Registration</h2>
          <p className="text-gray-700 mb-4">
            To access certain features of the Service, you may be required to create an account. When creating an 
            account, you agree to provide accurate, current, and complete information. You are responsible for 
            maintaining the confidentiality of your account credentials and for all activities that occur under your 
            account.
          </p>
          <p className="text-gray-700">
            You must be at least 18 years old to use the Service. By using the Service, you represent and warrant 
            that you are at least 18 years of age.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. User Content</h2>
          <p className="text-gray-700 mb-4">
            The Service allows you to create, upload, and share content, including biodata information, photos, and 
            other materials ("User Content"). You retain all rights in, and are solely responsible for, the User 
            Content you create and share through the Service.
          </p>
          <p className="text-gray-700">
            By creating, uploading, or sharing User Content, you grant Bio4Marriage a worldwide, non-exclusive, 
            royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative 
            works of, display, and perform the User Content in connection with the Service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Prohibited Conduct</h2>
          <p className="text-gray-700 mb-4">
            When using the Service, you agree not to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe the rights of any third party, including intellectual property rights</li>
            <li>Upload or share content that is unlawful, harmful, defamatory, or otherwise objectionable</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
            <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
            <li>Use any automated means to access the Service or collect data from the Service</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payments and Subscriptions</h2>
          <p className="text-gray-700 mb-4">
            Certain features of the Service may require payment of fees. You agree to pay all applicable fees and 
            taxes. All fees are non-refundable except as required by law or as otherwise stated in these Terms.
          </p>
          <p className="text-gray-700">
            If you purchase a subscription, your subscription will automatically renew at the end of each billing 
            cycle unless you cancel before the end of the current billing period. You may cancel your subscription 
            at any time through your account settings.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
          <p className="text-gray-700 mb-4">
            The Service and its original content, features, and functionality are owned by Bio4Marriage and are 
            protected by international copyright, trademark, patent, trade secret, and other intellectual property 
            or proprietary rights laws.
          </p>
          <p className="text-gray-700">
            You may not copy, modify, create derivative works of, publicly display, publicly perform, republish, 
            download, store, or transmit any of the material on our Service, except as permitted by these Terms 
            or with our prior written permission.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Termination</h2>
          <p className="text-gray-700 mb-4">
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice 
            or liability, under our sole discretion, for any reason whatsoever and without limitation, including but 
            not limited to a breach of these Terms.
          </p>
          <p className="text-gray-700">
            All provisions of these Terms which by their nature should survive termination shall survive termination, 
            including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations 
            of liability.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
          <p className="text-gray-700 mb-4">
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. BIO4MARRIAGE MAKES NO REPRESENTATIONS OR 
            WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE SERVICE OR THE INFORMATION, CONTENT, 
            MATERIALS, OR PRODUCTS INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICE.
          </p>
          <p className="text-gray-700">
            YOU EXPRESSLY AGREE THAT YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. TO THE FULL EXTENT PERMISSIBLE BY 
            APPLICABLE LAW, BIO4MARRIAGE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, 
            IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
          <p className="text-gray-700">
            IN NO EVENT SHALL BIO4MARRIAGE, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, 
            BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT 
            LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR 
            ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD 
            PARTY ON THE SERVICE; (III) ANY CONTENT OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE, 
            OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING 
            NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF 
            SUCH DAMAGE.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
          <p className="text-gray-700">
            These Terms shall be governed and construed in accordance with the laws of the State of California, 
            United States, without regard to its conflict of law provisions. Our failure to enforce any right or 
            provision of these Terms will not be considered a waiver of those rights.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to These Terms</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
            is material, we will provide at least 30 days' notice prior to any new terms taking effect. What 
            constitutes a material change will be determined at our sole discretion.
          </p>
          <p className="text-gray-700">
            By continuing to access or use our Service after those revisions become effective, you agree to be bound 
            by the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, please contact us at:
          </p>
          <address className="not-italic mt-2">
            <p className="text-gray-700">Bio4Marriage Inc.</p>
            <p className="text-gray-700">123 Marriage Lane</p>
            <p className="text-gray-700">San Francisco, CA 94107</p>
            <p className="text-gray-700">Email: <a href="mailto:legal@bio4marriage.com" className="text-pink-600 hover:underline">legal@bio4marriage.com</a></p>
          </address>
        </section>
      </div>
    </div>
  );
}
