import React from "react";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";

export const BottomNavigationBar: React.FC = () => {
    return <>
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
            <BottomNavigation
                showLabels
            >
                <BottomNavigationAction label={"1"}/>
                <BottomNavigationAction label={"2"}/>
                <BottomNavigationAction label={"3"}/>
            </BottomNavigation>
        </Paper>
    </>;
};