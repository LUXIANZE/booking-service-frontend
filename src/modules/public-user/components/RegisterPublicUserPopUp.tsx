import React from "react";
import {Box, Modal} from "@mui/material";

export interface RegisterPublicUserPopUpProps {
    visible?: boolean;
    close: () => void;
}
export const RegisterPublicUserPopUp: React.FC<RegisterPublicUserPopUpProps> = ({visible, close}) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return <Modal open={!!visible} onClose={close}>
        <Box sx={style}>

        </Box>
    </Modal>;
};