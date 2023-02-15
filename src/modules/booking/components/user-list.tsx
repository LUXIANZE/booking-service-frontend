import { Button, Grid, List, ListItem, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserByIdentity, getUsersByDeviceId } from "../../../http/user-api";
import { BaseUserDTO } from "../../../models/dto/base-user.dto";
import { getLoggedInIdentity, isLoggedIn } from "../../../utils/auth";
import { getDeviceId } from "../../../utils/device";
import '../../shared/css/scroll.css';

export interface SelectUserProps {
    selectedUser?: BaseUserDTO
    onUserSelected: (user: BaseUserDTO) => void;
}

export const UserList: React.FC<SelectUserProps> = ({ selectedUser, onUserSelected }) => {
    const [users, setUsers] = useState<BaseUserDTO[]>([]);

    useEffect(() => {
        (async () => {
            const deviceId = getDeviceId();
            const userRes = await getUsersByDeviceId(deviceId);

            let users: BaseUserDTO[] = [];

            if (userRes && userRes.status === 200) {
                users = userRes.data;
            }

            if (isLoggedIn()) {
                const identity = getLoggedInIdentity();
                const res = await getUserByIdentity(identity);

                if (res && res.status === 200) {
                    users = [res.data, ...users];
                }
            } else if (typeof selectedUser === 'undefined') {
                onUserSelected(users[0])
            }

            console.log('Users >>: ', users);
            setUsers(users);
        })();

        // eslint-disable-next-line
    }, [selectedUser]);

    return <>
        <Paper className={'no-scrollbar'} style={{ maxHeight: 300, overflow: "scroll" }}>
            <List>
                {users.map(user =>
                    <ListItem key={user.id}>
                        <Grid container spacing={1} >
                            <Grid item xs >
                                {`I/C No. : ${user.identity}`}
                            </Grid>
                            <Grid item xs display="flex" justifyContent="right" alignItems="center">
                                {selectedUser?.id === user.id ? <>
                                    <Button disabled variant="contained" style={{ width: 110 }}>Selected</Button>
                                </> : <>
                                    <Button variant="outlined" onClick={() => onUserSelected(user)} style={{ width: 110 }}>Select</Button>
                                </>}
                            </Grid>
                        </Grid>
                    </ListItem>)}
            </List>
        </Paper>
    </>;
};