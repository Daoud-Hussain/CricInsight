import React, { useEffect, useState } from 'react';
import { useStripe } from '@stripe/stripe-js';

const PaymentCompletion = () => {
    const stripe = useStripe();
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (!stripe) {
            return;
        }

        // Retrieve the "payment_intent_client_secret" query parameter from the URL
        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case 'succeeded':
                    setStatus('Payment successful!');
                    break;
                case 'processing':
                    setStatus('Your payment is processing.');
                    break;
                case 'requires_payment_method':
                    setStatus('Your payment was not successful, please try again.');
                    break;
                default:
                    setStatus('Something went wrong.');
                    break;
            }
        });
    }, [stripe]);

    return (
        <div className="payment-completion">
            <h2>Payment Status</h2>
            <p>{status}</p>
        </div>
    );
};

export default PaymentCompletion;