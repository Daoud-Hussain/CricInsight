import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
    const [clientSecret, setClientSecret] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const createPaymentIntent = async (amount) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/stripe/create-payment-intent', {
                amount: amount,
                currency: 'usd'
            });
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.error('Error:', error);
            setPaymentStatus('Failed to initiate payment');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (event) => {
        event.preventDefault();
        
        if (!clientSecret) {
            return;
        }

        setLoading(true);
        const stripe = await stripePromise;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-completion`,
            },
        });

        if (error) {
            setPaymentStatus(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="payment-form">
            <h2>Payment Details</h2>
            <form onSubmit={handlePayment}>
                <div className="form-group">
                    <label>Amount</label>
                    <input 
                        type="number" 
                        min="1"
                        onChange={(e) => createPaymentIntent(e.target.value)}
                    />
                </div>
                {clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentElement />
                        <button 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Pay Now'}
                        </button>
                    </Elements>
                )}
                {paymentStatus && (
                    <div className="payment-status">
                        {paymentStatus}
                    </div>
                )}
            </form>
        </div>
    );
};

export default PaymentForm;