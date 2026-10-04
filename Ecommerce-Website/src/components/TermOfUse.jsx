export default function TermOfUse(){
    return(
        <div className="container mx-auto my-12 p-8 bg-white shadow-lg rounded-lg">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">Terms of Use</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: {(new Date).toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose max-w-none">
            <p>Welcome to Exclusive! These terms and conditions outline the rules and regulations for the use of Exclusive's Website, located at <button className="text-amber-800">https://exclusive.vercel.app</button>. By accessing this website, we assume you accept these terms and conditions. Do not continue to use [Your Website Name] if you do not agree to all of the terms and conditions stated on this page.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">1. Intellectual Property Rights</h2>
            <p>Other than the content you own, under these Terms, Exclusive and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">2. Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Publishing any Website material in any other media.</li>
                <li>Selling, sublicensing, and/or otherwise commercializing any Website material.</li>
                <li>Publicly performing and/or showing any Website material.</li>
                <li>Using this Website in any way that is or may be damaging to this Website.</li>
                <li>Using this Website in any way that impacts user access to this Website.</li>
                <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity.</li>
                <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this Website.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">3. User Accounts</h2>
            <p>If you create an account on our Website, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">4. Products and Services</h2>
            <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Website. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products. All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.</p>

             <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">5. Purchases and Payment</h2>
             <p>We accept the following forms of payment:  Visa, Mastercard, PayPal. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Website. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">6. Limitation of Liability</h2>
            <p>In no event shall Exclusive, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website, whether such liability is under contract. Exclusive, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">7. Indemnification</h2>
            <p>You hereby indemnify to the fullest extent Exclusive from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">8. Governing Law & Jurisdiction</h2>
            <p>These Terms will be governed by and interpreted in accordance with the laws of the State of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">9. Changes to These Terms</h2>
            <p>We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the “Last Updated” date of these Terms of Use. It is your responsibility to periodically review these Terms of Use to stay informed of updates.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">10. Contact Us</h2>
            <p>In order to resolve a complaint regarding the Website or to receive further information regarding use of the Website, please contact us at:</p>
            <ul className="list-none space-y-2">
                <li><strong>By email:</strong> exclusive@gmail.com</li>
            </ul>
        </div>
    </div>

    )
}