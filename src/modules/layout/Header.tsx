import React from "react";
import {Button, Grid} from "@mui/material";

export interface HeaderProps {
    empty?: boolean;
}

export const Header: React.FC<HeaderProps> = ({empty}) => {

    return typeof empty === 'undefined' ? <>
        <Grid container spacing={0}>
            <Grid item xs={4}><Button style={{width: '100%'}}>left</Button></Grid>
            <Grid item xs={4}><Button style={{width: '100%'}}>center</Button></Grid>
            <Grid item xs={4}><Button style={{width: '100%'}}>right</Button></Grid>
        </Grid>
    </> : <>
        <Grid container spacing={0}>
            <Grid item xs={12}/>
        </Grid>
    </>
}