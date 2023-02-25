import { LocalizationProvider } from '@mui/x-date-pickers';
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useOrientation, useWindowSize } from 'react-use';
import { useEffect, useState } from 'react';
import { Box, Card, Zoom } from '@mui/material';

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

    /**
     * Enforce portrait mode on phone, neglect on wider screen devices
     */
    const [isPhone, setIsPhone] = useState<boolean>(false)
    const [isPortrait, setIsPortrait] = useState<boolean>(false)

    const state = useOrientation();
    const { width, height } = useWindowSize();

    useEffect(() => {
        if (width !== null && state !== null) {
            setIsPhone((state.type === "portrait-primary" && width < 600) || (state.type === "landscape-primary" && width < 900));
            setIsPortrait(state.type === "portrait-primary");
        }
    }, [width, height, state])

    return (
        <>
            <ThemeProvider theme={theme}>
                <SnackbarProvider autoHideDuration={4000}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {isPhone && !isPortrait ? <>
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                                <Zoom in timeout={700}>
                                    <Card elevation={5} style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
                                        <div style={{ margin: 30, textAlign: 'center' }}>
                                            For <strong>MOBILE</strong> user, please put your phone <strong>UPRIGHT</strong> <br />
                                            For <strong>DESKTOP</strong> user, please <strong>ENLARGE</strong> browser window
                                        </div>
                                    </Card>
                                </Zoom>
                            </Box>
                        </> : <>
                            <RouterProvider router={router} />
                        </>}
                    </LocalizationProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
