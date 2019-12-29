import React from "react";
import EventNoteIcon from '@material-ui/icons/EventNote';
import Grid from "@material-ui/core/Grid";


export default function NoDataFound(props) {

    return (
        <>

            <Grid item xs={12} md={12} >
                <EventNoteIcon />
                <div>No Task for {props.tabType.charAt(0).toUpperCase() + props.tabType.slice(1)}</div>
            </Grid>
        </>
    );

}