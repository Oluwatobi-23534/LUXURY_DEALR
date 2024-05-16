// /* global google */

// import { useCreateOrderMutation } from "./slices/orderApiSlice";
// import { useUpdateUserOrdersMutation } from "./slices/userApiSlice"; // Import the hook for updating user orders

// // Define the tokenization specification for the payment gateway
// const tokenizationSpecification = {
//   type: "PAYMENT_GATEWAY",
//   parameters: {
//     gateway: "example",
//     gatewayMerchantId: "gatewayMerchantId",
//   },
// };

// // Define the card payment method
// const cardPaymentMethod = {
//   type: "CARD",
//   tokenizationSpecification: tokenizationSpecification,
//   parameters: {
//     allowedCardNetworks: ["VISA", "MASTERCARD"],
//     allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
//   },
// };

// // Define the Google Pay configuration
// const googlePayConfiguration = {
//   apiVersion: 2,
//   apiVersionMinor: 0,
//   allowedPaymentMethods: [cardPaymentMethod],
// };

// let googlePayClient;

// // Function to initialize Google Pay client
// function onGooglePayLoaded() {
//   googlePayClient = new google.payments.api.PaymentsClient({
//     environment: "TEST",
//   });

//   // Check if Google Pay is ready
//   googlePayClient
//     .isReadyToPay(googlePayConfiguration)
//     .then((res) => {
//       if (res.result) {
//         // If Google Pay is ready, create and add the button
//         createAndAddButton();
//       } else {
//         // Handle the case where Google Pay is not ready
//         console.log("Google Pay is not ready");
//       }
//     })
//     .catch((err) => console.error("isReadyToPay error: ", err));
// }

// // Function to create and add the Google Pay button
// function createAndAddButton() {
//   const googlePayButton = googlePayClient.createButton({
//     onClick: onGooglePayButtonClicked,
//   });

//   // Add the Google Pay button to the 'buy-now' element
//   document.getElementById("buy-now").appendChild(googlePayButton);
// }

// // Function to handle Google Pay button click
// function onGooglePayButtonClicked() {
//   // Define the payment data request
//   const paymentDataRequest = { ...googlePayConfiguration };
//   paymentDataRequest.merchantInfo = {
//     merchantId: "BCR2DN4T66NOBS25",
//     merchantName: "Luxury Dealr",
//   };

//   paymentDataRequest.transactionInfo = {
//     totalPriceStatus: "FINAL",
//     totalPrice: selectedItem.price,
//     currencyCode: "NGN", // Nigerian Naira
//     countryCode: "NG", // Nigeria
//   };

//   // Load the payment data
//   googlePayClient
//     .loadPaymentData(paymentDataRequest)
//     .then((paymentData) => {
//       // Process the payment data
//       processPaymentData(paymentData);
//     })
//     .catch((error) => console.error("loadPaymentData error: ", error));
// }

// // Function to process the payment data
// function processPaymentData(paymentData) {
//   // Send the payment data to your server
//   useCreateOrderMutation.mutate(paymentData, {
//     onSuccess: (data) => {
//       // If the order was successfully created, update the user's order history
//       useUpdateUserOrdersMutation.mutate(data);
//     },
//   });
// }
