import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "../Payment.css";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ totalAmount, selectedItemsDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [cardType, setCardType] = useState("");
  const [upiId, setUpiId] = useState("");

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const transformData = (items) => {
    const orderDate = getCurrentDateTime();
    return {
      customerId: "testuser3",
      orderDate: orderDate,
      itemsOrdered: items.map((item) => ({
        itemId: item.itemId,
        itemName: item.itemName,
        quantity: item.quantity,
        pricePerQuantity: item.price.toString(),
        discount: item.discount,
        categoryId: item.categoryId,
      })),
    };
  };

  const handleSubmit = async () => {
    const transformedData = transformData(selectedItemsDetails);

    try {
      const response = await fetch('https://0jdz7xjgnd.execute-api.us-east-2.amazonaws.com/DEV/API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: transformedData })
      });

      console.log("successfully posted");

      if (response.ok) {
        const responseData = await response.json();
        const responseBody = JSON.parse(responseData.body);
        localStorage.setItem("orderId",responseBody.id);
        console.log('Order successfully posted:', responseData);
      } else {
        console.error('Failed to post order:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting order:', error);
    }

    const paymentMethod = (selectedPaymentMethod === 'card') ? cardType : 'UPI';

    try{
      const response2 = await fetch('https://b8a97zi99b.execute-api.us-east-2.amazonaws.com/DEV/API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body: JSON.stringify({
            paymentStatus: "Completed",
            paymentMethod: paymentMethod,
            paymentDate: getCurrentDateTime(),
            OrderId: localStorage.getItem("orderId"),
          })
        })
      });
      console.log("Payment response",response2);
      const responseData2 = await response2.json();
      const responseBody2 = JSON.parse(responseData2.body);
      console.log(responseBody2);
      localStorage.setItem("transactionId",responseBody2.TransactionId);
    }
    catch{
      console.error('Error posting payment: ', error);
    }

    console.log(localStorage.getItem("transactionId"));

    const currentDateTime = getCurrentDateTime();

    selectedItemsDetails.forEach(async (item) => {
      const itemPriceGST = (parseFloat(item.quantity) * (item.price + (item.price * 0.05))).toFixed(2);
      const additionalData = {
        DateTime: getCurrentDateTime(),
        OrderId: localStorage.getItem("orderId"),
        TransactionId: localStorage.getItem("transactionId"), // Random transaction ID for example
        CategoryId: item.categoryId,
        ItemId: item.itemId,
        CookId: item.CookId, // Assuming CookId is static or retrieved elsewhere
        quantity: item.quantity,
        pricePerQuantity: item.price.toFixed(2),
        discount: item.discount,
        CookRevenue: (itemPriceGST * 0.9).toFixed(2),
        AppRevenue: (itemPriceGST * 0.1).toFixed(2)
      };
      console.log("Revenue data", additionalData);
      try {
        const response3 = await fetch('https://w8s0cgm2j7.execute-api.us-east-2.amazonaws.com/DEV/API', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ body: additionalData })
        });
        if (!response3.ok) {
          console.error('Failed to post additional data:', response3.statusText);
        } else {
          console.log("Additional data response", await response3.json());
        }
      } catch (error) {
        console.error('Error posting additional data:', error);
      }
      const response4 = await fetch(
        "https://akshayapatra-itemfunction.azurewebsites.net/api/Akshayapatra-original-table?code=5X7nqsMQ4U3LV9VEOkjc1v6ecdsZcseWv5Y_jistQq5LAzFu2NwLHA%3D%3D",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: item.itemId,
            ItemsSold: item.quantity,
          }),
        }
      );
      console.log(response4);
    });

    const itemCounts = localStorage.getItem("itemCounts");

    const updatedItemCounts = {};
    for (const key in itemCounts) {
      if (itemCounts.hasOwnProperty(key)) {
        updatedItemCounts[key] = 0; // Assign 1 to each value
      }
    }

    localStorage.setItem("itemCounts", JSON.stringify(updatedItemCounts));
  };

  useEffect(() => {
    if (paymentResult === "success") {
      handleSubmit();
      const timer = setTimeout(() => {
        navigate("/orderConfirmation");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [paymentResult, navigate]);

  const handleCardPayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Test User",
        },
      });

      if (error) {
        setError("Payment failed: " + error.message);
        setPaymentResult("fail");
        if (
          error.code === "card_declined" &&
          error.decline_code === "generic_decline"
        ) {
          setError("Payment failed: Invalid card information.");
          setPaymentResult("fail");
        }
      } else {
        console.log("Payment Method:", paymentMethod);
        setPaymentResult("success");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Payment failed: " + error.message);
      setPaymentResult("fail");
    } finally {
      setLoading(false);
    }
  };

  const handleUPIPayment = () => {
    if (upiId.endsWith("@okbank")) {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        setPaymentResult("success");
        setLoading(false);
      }, 2000);
    } else {
      setPaymentResult("fail");
      setError("Payment failed: Enter a Valid UPI Id.");
    }
  };

  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);
  };


  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleUPIIdChange = (event) => {
    setUpiId(event.target.value);
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form">
        {paymentResult === "success" && (
          <div className="payment-success">
            <div className="success-animation">
              <svg
                className="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
            Payment successful!
          </div>
        )}
        {paymentResult === "fail" && (
          <div className="payment-error">{error}</div>
        )}
        {paymentResult !== "success" && (
          <div>
            <div className="total-amount-display">To Pay: ₹{totalAmount}</div>
            <select
              className="payment-method-select"
              value={selectedPaymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="card">Card</option>
              <option value="upi">UPI</option>
            </select>
            {selectedPaymentMethod === "card" && (
              <div>
                <select
                  className="card-type-select"
                  value={cardType}
                  onChange={handleCardTypeChange}
                >
                  <option value="">Select Card Type</option>
                  <option value="CreditCard">Credit Card</option>
                  <option value="DebitCard">Debit Card</option>
                </select>
                {cardType && (
                  <form onSubmit={handleCardPayment}>
                    <div className="card-element-container">
                      <CardElement className="card-element" />
                    </div>
                    <button
                      type="submit"
                      className="payment-button"
                      disabled={!stripe || loading}
                    >
                      {loading ? "Processing..." : "Pay with Card"}
                    </button>
                    {error && <div className="payment-error">{error}</div>}
                  </form>
                )}
              </div>
            )}
            {selectedPaymentMethod === "upi" && (
              <div>
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={handleUPIIdChange}
                  className="upi-input"
                />
                <button
                  onClick={handleUPIPayment}
                  className="payment-button"
                  disabled={loading || !upiId}
                >
                  {loading ? "Processing..." : "Pay with UPI"}
                </button>
                {error && <div className="payment-error">{error}</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
