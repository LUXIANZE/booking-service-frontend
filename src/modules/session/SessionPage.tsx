import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    List,
    ListItem,
    Slide,
    Stack,
    TextField,
    Typography,
    Zoom
} from "@mui/material";
import { getSessions } from "../../http/session-api";
import { PageModel } from "../../models/dto/page-model";
import { SessionDTO } from "../../models/dto/session-dto";
import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { getBookingsBySessionId } from "../../http/booking-api";
import { BookingDTO } from "../../models/dto/booking.dto";
import { useSnackbar } from 'notistack';
import { AxiosError } from "axios";
import '../shared/css/scroll.css';
import { useNavigate } from "react-router-dom";

export const SessionPage: React.FC = () => {

    const [data, setData] = useState<PageModel<SessionDTO>>();
    const [selectedSession, setSelectedSession] = useState<SessionDTO>();
    const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());

    const page = 0;
    const pageSize = 1000; // Since we are using pagination, this is assuming not exceeding 1000 sessions per day
    const { enqueueSnackbar } = useSnackbar();
    const navigation = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await getSessions(
                    {
                        page: page,
                        size: pageSize,
                        sort: [
                            {
                                fieldName: 'dateTime',
                                sort: 'ASC'
                            },
                            {
                                fieldName: 'totalSlots',
                                sort: 'DESC'
                            }
                        ]
                    },
                    selectedDate.toDate()
                );

                if (response && response.status === 200) {
                    console.log('API Response >>: ', response.data);
                    setData(response.data);
                }
            } catch (e) {
                console.error(e);
                if (e instanceof AxiosError) {
                    const errorMessage = e.response?.data.message || "Server Error, Please try again in 5 minutes. If error persist, please contact +xxxxxxxxx";
                    enqueueSnackbar(errorMessage, { variant: "error" });
                }
            }
        })();
    }, [enqueueSnackbar, page, pageSize, selectedDate]);

    const sessionSelected = async (elem: SessionDTO) => {
        console.log('Selected Session >>: ', elem);
        setSelectedSession(elem);
    };

    const cancelBookSession = () => {
        setSelectedSession(undefined);
    };

    const bookSession = async () => {
        if (selectedSession) {
            console.log('Booking with selected session >>: ', selectedSession);
            navigation(`/booking?sessionId=${selectedSession.id}`);
        }
    };

    return <>
        <div className="flex h-screen">
            <Stack spacing={2} style={{ width: "100%" }}>
                <Slide in timeout={800}>
                    <Stack>
                        <Typography variant="h6" style={{ margin: "30px auto" }} gutterBottom>
                            Please select a date for your training
                        </Typography>
                        <Card style={{ margin: '0px 20px' }}>
                            <StaticDatePicker
                                displayStaticWrapperAs="desktop"
                                value={selectedDate}
                                onChange={(newValue) => {
                                    setSelectedDate(newValue || dayjs());
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                showToolbar={false}
                            />
                        </Card>
                    </Stack>
                </Slide>
                <Stack>{(data && !data.empty) ? <>
                    <div className={'no-scrollbar'} style={{ maxHeight: 400, overflow: "scroll" }}>
                        <List>
                            {data.content.map((session, index) =>
                                <ListItem key={session.id}>
                                    <Zoom in timeout={((index + 1) * 200) + 300}>
                                        <Card elevation={3} style={{ width: '100%' }}>
                                            <Grid container spacing={2} style={{ margin: '20px auto' }}>
                                                <Grid item xs display="flex" justifyContent="center" alignItems="center">
                                                    {`${dayjs(session.dateTime).format("HH:mm A")}`}
                                                </Grid>
                                                <Grid item xs display="flex" justifyContent="center" alignItems="center">
                                                    <SessionSelectionButton sessionDTO={session}
                                                        onClick={() => sessionSelected(session)} />
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Zoom>
                                </ListItem>)}
                        </List>
                    </div>
                </> : <>
                    <Zoom in timeout={500}>
                        <Card style={{ margin: '0px 20px' }}>
                            <Typography style={{ margin: "0px auto", padding: 40, textAlign: 'center' }}>No Sessions found on this date, please select another date</Typography>
                        </Card>
                    </Zoom>
                </>}
                </Stack>
            </Stack>
        </div>
        <Dialog open={!!selectedSession} onClose={cancelBookSession}>
            <DialogTitle>Confirm to book this training session?</DialogTitle>
            {selectedSession && <>
                <DialogContent>{`${dayjs(selectedSession.dateTime).format("DD MMM YYYY, HH:mm A")}`}</DialogContent>
            </>}
            <DialogActions>
                <Button onClick={cancelBookSession}>Cancel</Button>
                <Button onClick={bookSession}>Confirm</Button>
            </DialogActions>
        </Dialog>
    </>;
};

interface SessionSelectionButtonProps {
    sessionDTO: SessionDTO;
    onClick: () => void;
}

const SessionSelectionButton: React.FC<SessionSelectionButtonProps> = ({ sessionDTO, onClick }) => {
    const [bookingPage, setBookingPage] = useState<PageModel<BookingDTO>>();

    useEffect(() => {
        (async () => {
            // Because we only want to know the "totalElements" field of "Page" object, thus we can query 0 page size to reduce latency
            const response = await getBookingsBySessionId(
                {
                    page: 0,
                    size: 0,
                    sort: []
                },
                sessionDTO.id
            );

            if (response && response.status === 200) {
                setBookingPage(response.data);
            }

        })();
    }, [sessionDTO]);

    return bookingPage ?
        <Button
            variant="contained"
            disabled={bookingPage.totalElements >= sessionDTO.totalSlots}
            onClick={onClick}
        >
            {`${bookingPage.totalElements}/${sessionDTO.totalSlots} slots`}
        </Button> : <Button>Loading</Button>;
};