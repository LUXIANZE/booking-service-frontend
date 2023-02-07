import React from "react";

export const PaymentPage: React.FC<{ paymentStatus: 'success' | 'cancel' }> = ({paymentStatus}) => {
    return paymentStatus === 'success' ? <>Payment Success</> : <>Payment Failed</>;
};