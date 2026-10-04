export default function PrivacyPolicy(){
    return(
         <div className="container mx-auto my-12 p-8 bg-white shadow-lg rounded-lg">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: {(new Date).toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose max-w-none">
            <p>Welcome to Exclusive! We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and disclose your information when you use our website.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">1. Information We Collect</h2>
            <p>We may collect personal information that you provide to us directly, as well as information that is automatically collected when you visit our website. The types of information we may collect include:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, shipping address, and billing address.</li>
                <li><strong>Payment Information:</strong> Credit card details and other payment information. Please note, that we do not store your full credit card information on our servers.</li>
                <li><strong>Account Information:</strong> If you create an account, we will collect your username, password, and other information you provide.</li>
                <li><strong>Technical Information:</strong> IP address, browser type, operating system, and other technical details about your device.</li>
                <li><strong>Usage Information:</strong> Information about how you use our website, such as the pages you visit, the products you view, and your search queries.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">2. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>To process and fulfill your orders, including to send you confirmations and shipping notifications.</li>
                <li>To communicate with you about your orders, account, and our services.</li>
                <li>To provide customer support and respond to your inquiries.</li>
                <li>To personalize your experience on our website, such as by showing you products you might be interested in.</li>
                <li>To improve our website and services.</li>
                <li>For marketing and promotional purposes, such as sending you newsletters and special offers, with your consent.</li>
                <li>To prevent fraudulent transactions and protect the security of our website.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">3. Information Sharing and Disclosure</h2>
            <p>We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>With Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, shipping, and marketing.</li>
                <li><strong>For Legal Reasons:</strong> We may disclose your information if we are required to do so by law or in response to a valid legal request, such as a court order or subpoena.</li>
                <li><strong>To Protect Our Rights:</strong> We may disclose your information to protect the rights, property, or safety of our company, our customers, or others.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">4. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to collect information about your browsing activities on our website. Cookies are small data files that are stored on your device. You can control the use of cookies at the individual browser level. For more information about our use of cookies, please see our Cookie Policy.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">5. Data Security</h2>
            <p>We take the security of your personal information seriously and have implemented appropriate technical and organizational measures to protect it from unauthorized access, disclosure, alteration, and destruction.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">6. Your Rights</h2>
            <p>You have certain rights regarding your personal information, including the right to:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Access the personal information we hold about you.</li>
                <li>Correct any inaccurate personal information.</li>
                <li>Request the deletion of your personal information.</li>
                <li>Object to the processing of your personal information.</li>
                <li>Withdraw your consent at any time.</li>
            </ul>
            <p>To exercise these rights, please contact us using the contact information provided below.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">7. Children's Privacy</h2>
            <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe that your child has provided us with personal information, please contact us.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">8. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We encourage you to review this Privacy Policy periodically for any changes.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-none space-y-2">
                <li><strong>By email:</strong> exclusive@gmail.com</li>
                
            </ul>
        </div>
    </div>

    )
}