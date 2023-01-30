import {LocalizationProvider} from '@mui/x-date-pickers';
import React from 'react';
import {RouterProvider} from "react-router-dom";
import {router} from "./router/routes";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function App() {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <RouterProvider router={router}/>
            </LocalizationProvider>
        </>
    );
}

export default App;
