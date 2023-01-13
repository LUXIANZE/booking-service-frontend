import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {getSessions} from "../../http/session-api";
import {PageModel} from "../../models/dto/page-model";
import {SessionDTO} from "../../models/dto/session-dto";
import {useNavigate} from "react-router-dom";

export const SessionPage: React.FC = () => {

    const [data, setData] = useState<PageModel<SessionDTO>>();
    const [selectedSession, setSelectedSession] = useState<SessionDTO>();
    const [page, setPage] = useState<number>(0);
    const pageSize = 10;
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await getSessions(page, pageSize, [
                {
                    fieldName: 'dateTime',
                    sort: 'DESC'
                },
                {
                    fieldName: 'slots',
                    sort: 'DESC'
                }
            ]);
            if (response && response.status === 200) {
                console.log('API Response >>: ', response.data);
                setData(response.data);
            }
        })();
    }, [page]);

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
            <Table>
                <TableHead>
                    <TableRow key={0}>
                        <TableCell colSpan={2}>Select a session that you would like to train</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.content.map(session => <TableRow onClick={() => sessionSelected(session)}
                                                                   key={session.id}>
                        <TableCell>{`${new Date(session.dateTime).toDateString()}, ${new Date(session.dateTime).toLocaleTimeString()}`}</TableCell>
                        <TableCell>{session.slots + ' slots'}</TableCell>
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
        </div>
        <Dialog open={!!selectedSession} onClose={cancelSessionSelection}>
            <DialogTitle>Confirm to book this training session?</DialogTitle>
            {selectedSession && <>
                <DialogContent>{`${new Date(selectedSession.dateTime).toDateString()}, ${new Date(selectedSession.dateTime).toLocaleTimeString()}`}</DialogContent>
                <DialogContent>{selectedSession.slots + ' slots'}</DialogContent>
            </>}
            <DialogActions>
                <Button onClick={cancelSessionSelection}>Cancel</Button>
                <Button onClick={confirmSessionSelection}>Confirm</Button>
            </DialogActions>
        </Dialog>
    </>;
};