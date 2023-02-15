import React from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { AnimatedResultIcon } from "../shared/components/animated-result-icon";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PaymentPage: React.FC<{ paymentStatus: 'success' | 'cancel' }> = ({ paymentStatus }) => {
    const navigation = useNavigate()
    return <div className="flex h-screen">
        <div style={{ margin: 'auto' }}>
            <Stack spacing={10}>
                {paymentStatus === 'success' ? <PaymentSuccess /> : <PaymentCancel />}
                <Button variant="contained" color="info" onClick={() => navigation('/')}>Back to home</Button>
            </Stack>
        </div>
    </div>;
};

const PaymentSuccess: React.FC = () => {
    return <AnimatedResultIcon
        icon={CheckCircleOutlineIcon}
        color='success'
        animation={{
            transitionDelay: 100,
            transitionDuration: 400
        }}
        caption="Payment Success" />
}

const PaymentCancel: React.FC = () => {
    return <AnimatedResultIcon
        icon={HighlightOffIcon}
        color='error'
        animation={{
            transitionDelay: 100,
            transitionDuration: 400
        }}
        caption="Payment Cancelled" />
}