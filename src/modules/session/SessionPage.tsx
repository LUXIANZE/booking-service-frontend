import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    List,
    ListItem,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {getSessions} from "../../http/session-api";
import {PageModel} from "../../models/dto/page-model";
import {SessionDTO} from "../../models/dto/session-dto";
import {StaticDatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {getBookingBySessionId} from "../../http/booking-api";
import {BookingDTO} from "../../models/dto/booking.dto";
import {useSnackbar} from 'notistack';
import {AxiosError} from "axios";
import {payment} from "../../http/payment-api";

import '../shared/scroll.css';

export const SessionPage: React.FC = () => {

    const [data, setData] = useState<PageModel<SessionDTO>>();
    const [selectedSession, setSelectedSession] = useState<SessionDTO>();
    const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());

    const page = 0;
    const pageSize = 1000; // Since we are using pagination, this is assuming not exceeding 1000 sessions per day
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        (async () => {
            try {
                const response = await getSessions(
                    page,
                    pageSize,
                    [
                        {
                            fieldName: 'dateTime',
                            sort: 'DESC'
                        },
                        {
                            fieldName: 'totalSlots',
                            sort: 'DESC'
                        }
                    ],
                    selectedDate.toDate()
                );

                if (response && response.status === 200) {
                    console.log('API Response >>: ', response.data);
                    setData(response.data);
                }
            } catch (e) {
                console.error(e);
                if (e instanceof AxiosError) {
                    const errorMessage = e.response?.data.message || "";
                    enqueueSnackbar(errorMessage, {variant: "error"});
                }
            }

        })();
    }, [enqueueSnackbar, page, pageSize, selectedDate]);

    const sessionSelected = async (elem: SessionDTO) => {
        console.log('Selected Session >>: ', elem);
        setSelectedSession(elem);
    };

    const cancelSessionSelection = () => {
        setSelectedSession(undefined);
    };

    const confirmSessionSelection = async () => {
        if (selectedSession) {
            console.log('Confirm selected session >>: ', selectedSession);
            const res = await payment();
            if (res && res.status === 200) {
                window.location.href = res.data;
            } else {

            }
        }
    };

    return <>
        <div className="flex h-screen">
            <Stack spacing={2} style={{width: "100%"}}>
                <Typography variant="h6" style={{margin: "30px auto"}} gutterBottom>Please select a date for your
                    training</Typography>
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={selectedDate}
                    onChange={(newValue) => {
                        setSelectedDate(newValue || dayjs());
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    showToolbar={false}
                />
                {data && !data.empty && <Paper className={'no-scrollbar'} style={{maxHeight: 300, overflow: "scroll"}}>
                    <List>
                        {data.content.map(session =>
                            <ListItem key={session.id} style={{padding: "20px 20px"}}>
                                <Grid container spacing={2}>
                                    <Grid xs display="flex" justifyContent="center" alignItems="center">
                                        {`${dayjs(session.dateTime).format("HH:mm A")}`}
                                    </Grid>
                                    <Grid xs display="flex" justifyContent="center" alignItems="center">
                                        <SessionSelectionButton sessionDTO={session}
                                                                onClick={() => sessionSelected(session)}/>
                                    </Grid>
                                </Grid>
                            </ListItem>)}
                    </List>
                </Paper>}
            </Stack>


        </div>
        <Dialog open={!!selectedSession} onClose={cancelSessionSelection}>
            <DialogTitle>Confirm to book this training session?</DialogTitle>
            {selectedSession && <>
                <DialogContent>{`${dayjs(selectedSession.dateTime).format("DD MMM YYYY, HH:mm A")}`}</DialogContent>
            </>}
            <DialogActions>
                <Button onClick={cancelSessionSelection}>Cancel</Button>
                <Button onClick={confirmSessionSelection}>Confirm</Button>
            </DialogActions>
        </Dialog>
    </>;
};

interface SessionSelectionButtonProps {
    sessionDTO: SessionDTO;
    onClick: () => void;
}

const SessionSelectionButton: React.FC<SessionSelectionButtonProps> = ({sessionDTO, onClick}) => {
    const [bookingPage, setBookingPage] = useState<PageModel<BookingDTO>>();

    useEffect(() => {
        (async () => {
            const response = await getBookingBySessionId(sessionDTO.id);

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