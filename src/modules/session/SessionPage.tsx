import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle, Stack,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow, TextField
} from "@mui/material";
import {getSessions} from "../../http/session-api";
import {PageModel} from "../../models/dto/page-model";
import {SessionDTO} from "../../models/dto/session-dto";
import {useNavigate} from "react-router-dom";
import {StaticDatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {getBookingBySessionId} from "../../http/booking-api";
import {BookingDTO} from "../../models/dto/booking.dto";

export const SessionPage: React.FC = () => {

    const [data, setData] = useState<PageModel<SessionDTO>>();
    const [selectedSession, setSelectedSession] = useState<SessionDTO>();
    const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());

    const [page, setPage] = useState<number>(0);
    const pageSize = 10;
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
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
        })();
    }, [page, selectedDate]);

    const pageChanged = (_: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        console.log('Page Selected >>: ', page);
        setPage(page);
    };

    const sessionSelected = (elem: SessionDTO) => {
        console.log('Selected Session >>: ', elem);
        setSelectedSession(elem);
    };

    const rowsPerPageChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const selectedRowsPerPage = event.target.value;
        console.log('Rows per page Selected >>: ', selectedRowsPerPage);
    };

    const cancelSessionSelection = () => {
        setSelectedSession(undefined);
    };

    const confirmSessionSelection = () => {
        if (selectedSession) {
            console.log('Confirm selected session >>: ', selectedSession);
            navigate(`/booking?selectedSessionId=${selectedSession.id}`);
        }
    };

    return <>
        <div className="flex h-screen">
            <Stack spacing={2} style={{width: "100%"}}>
                <StaticDatePicker
                    displayStaticWrapperAs="mobile"
                    value={selectedDate}
                    onChange={(newValue) => {
                        setSelectedDate(newValue || dayjs());
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Table>
                    <TableHead>
                        <TableRow key={0}>
                            <TableCell colSpan={2}>Select a session that you would like to train</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.content.map(session => <TableRow
                            key={session.id}>
                            <TableCell style={{paddingLeft: 50, paddingRight: 50}}>{`${dayjs(session.dateTime).format("HH:mm A")}`}</TableCell>
                            <TableCell>
                                <SessionSelectionButton sessionDTO={session} onClick={() => sessionSelected(session)}/>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination count={data?.totalElements || -1} page={page} rowsPerPage={pageSize}
                                             rowsPerPageOptions={[pageSize]}
                                             onRowsPerPageChange={rowsPerPageChanged}
                                             onPageChange={pageChanged}/>
                        </TableRow>
                    </TableFooter>
                </Table>
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