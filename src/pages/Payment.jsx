import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from 'react-helmet-async';
// Replace with your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);

        const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success`,
            },
        });

    if (paymentError) {
        setError(error.message);
        setProcessing(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || processing} className="w-full mt-4">
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}

export default function Payment() {
    const location = useLocation();
    const [clientSecret, setClientSecret] = useState(location.state?.client_secret || '');  
    const [campaignType, setCampaignType] = useState(location.state?.campaignType || '');  
    const [amount, setAmount] = useState(location.state?.amount || '');  
    
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Complete Your Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-lg font-semibold">{campaignType} Campaign</p>
            <p className="text-xl text-green-600">${amount/100}</p>
          </div>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </CardContent>
      </Card>
    </div>
  );
}