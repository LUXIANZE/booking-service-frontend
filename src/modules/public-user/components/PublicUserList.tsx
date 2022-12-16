import React, {useState} from "react";
import {PublicUserDTO} from "../../../models/dto/public-user.dto";
import {Button, List, ListItem} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {RegisterPublicUserPopUp} from "./RegisterPublicUserPopUp";

export interface PublicUserListProps {
    publicUsers: PublicUserDTO[];
}

export const PublicUserList: React.FC<PublicUserListProps> = ({publicUsers}) => {
    if (publicUsers.length === 0) {
        return <UserButton/>;
    } else {
        return <List>
            {publicUsers.map(publicUser =>
                <ListItem>
                    <UserButton publicUser={publicUser}/>
                </ListItem>)
            }
            <ListItem>
                <UserButton/>
            </ListItem>
        </List>;
    }
};

interface UserButtonProps {
    publicUser?: PublicUserDTO;
}

const UserButton: React.FC<UserButtonProps> = ({publicUser}) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    if (publicUser) {
        return <Button variant={"contained"}>{publicUser.identity}</Button>;
    } else {
        return <>
            <Button onClick={openModal} variant={"contained"} endIcon={<AddIcon/>}>New User</Button>
            <RegisterPublicUserPopUp visible={modalVisible} close={closeModal}/>
        </>;
    }
};