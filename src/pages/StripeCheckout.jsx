import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./StripeCheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/orders/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51OzEQOSE7OLyUtjdrrbw8HtcVYvm1FIo0SiCPZcONLMaBvoZdFwxbjzsMZcCU3L6jjOEdnswXlE0Q3Y2fIlfs3c700pAcE09mc"
);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({
        totalPrice: currentOrder.totalPrice,
        selectedAddress: currentOrder.selectedAddress,
      }),
      headers: { "Content-Type": "application/json" },
      meta: {
        order_id: currentOrder.id,
      }, //this info goes to stripe and then to webhooks directly,
      //by this we can conclude that payment was successful,
      //even if client side is closed expectedly or unexpectedly after payment.
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} key={clientSecret} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}