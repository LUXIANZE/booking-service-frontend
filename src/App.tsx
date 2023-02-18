import { LocalizationProvider } from '@mui/x-date-pickers';
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
    /** Color Palette = https://mycolor.space/?hex=%2300C9B7&sub=1 */
    const theme = createTheme({
        palette: {
            primary: {
                main: '#569D93'
            },
            secondary: {
                main: '#ECFDFA'
            }
        }
    })

    return (
        <>
            <ThemeProvider theme={theme}>
                <SnackbarProvider autoHideDuration={4000}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <RouterProvider router={router} />
                    </LocalizationProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
