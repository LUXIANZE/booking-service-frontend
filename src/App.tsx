import { LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarProvider } from "notistack";

function App() {
    return (
        <>
            <SnackbarProvider autoHideDuration={4000}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <RouterProvider router={router} />
                </LocalizationProvider>
            </SnackbarProvider>
        </>
    );
}

export default App;
