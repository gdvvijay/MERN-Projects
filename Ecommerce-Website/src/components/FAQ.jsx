import {Link} from 'react-router-dom'

export default function FAQ(){
    return(
         <div className="container mx-auto my-12 p-8 bg-white shadow-lg rounded-lg">

        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-center mb-12">Find answers to the most common questions below. If you can't find what you're looking for, feel free to contact us.</p>

        <div className="space-y-8">

           
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Ordering</h2>
                <div className="space-y-4">
                    <details className="group bg-gray-50 p-4 rounded-lg cursor-pointer">
                        <summary className="flex justify-between items-center font-medium text-gray-900">
                            How do I place an order?
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                            To place an order, simply browse our products, select the items you wish to purchase and add them to your cart. Once you're ready, proceed to checkout, where you will need to enter your shipping and payment information.
                        </p>
                    </details>
                    <details className="group bg-gray-50 p-4 rounded-lg cursor-pointer">
                        <summary className="flex justify-between items-center font-medium text-gray-900">
                           Can I modify or cancel my order after it has been placed?
                           <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                            If you need to modify or cancel your order, please contact our customer support team as soon as possible at [your email address]. We can make changes if the order has not yet been processed for shipping.
                        </p>
                    </details>
                    <details className="group bg-gray-50 p-4 rounded-lg cursor-pointer">
                        <summary className="flex justify-between items-center font-medium text-gray-900">
                           How do I use a discount code?
                           <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                            You can apply your discount code at checkout. Simply enter the code into the "Discount Code" or "Promo Code" box and click "Apply." The discount will be reflected in your order total.
                        </p>
                    </details>
                </div>
            </div>

            
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Shipping</h2>
                <div className="space-y-4">
                    <details className="group bg-gray-50 p-4 rounded-lg cursor-pointer">
                        <summary className="flex justify-between items-center font-medium text-gray-900">
                            What shipping options do you offer?
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                            We offer several shipping options, including Standard, Expedited, and Next-Day Shipping. You can select your preferred method at checkout. Shipping costs and delivery times vary by location and the selected shipping method.
                        </p>
                    </details>
                    <details className="group bg-gray-50 p-4 rounded-lg cursor-pointer">
                        <summary className="flex justify-between items-center font-medium text-gray-900">
                           How can I track my order?
                           <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                            Once your order has shipped, you will receive a confirmation email containing a tracking number. You can use this number on the carrier's website to track the status of your delivery.
                        </p>
                    </details>
                </div>
            </div>
            
             
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Returns & Exchanges</h2>
                <div className="space-y-4">
                    <details className="group bg-gray-50 p-4 rounded-lg cursor-pointer">
                        <summary className="flex justify-between items-center font-medium text-gray-900">
                           What is your return policy?
                           <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                           We accept returns within 30 days of purchase for a full refund or exchange. Items must be in their original condition, unused, and with all tags attached. Please visit our Returns page for detailed instructions on how to start a return.
                        </p>
                    </details>
                    <details className="group bg-gray-50 p-4 rounded-lg cursor-pointer">
                        <summary className="flex justify-between items-center font-medium text-gray-900">
                           How long does it take to process a refund?
                           <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                           Once we receive your returned item, please allow 5-7 business days for the refund to be processed. The refund will be credited to your original method of payment.
                        </p>
                    </details>
                </div>
            </div>

           
            <div className="text-center pt-8">
                 <h2 className="text-2xl font-semibold mb-4 text-gray-700">Still have questions?</h2>
                 <p className="text-gray-600">If you cannot find an answer to your question in our FAQ, you can always contact us. We will answer you shortly!</p>
                 <Link to="/contact" className="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition">Contact Us</Link>
            </div>

        </div>
    </div>
    )
}