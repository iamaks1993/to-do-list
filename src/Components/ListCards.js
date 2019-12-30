import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import NoDataFound from './TabNoDataFound';
import { IconButton } from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import moment from 'moment';
import ReactTooltip from 'react-tooltip'

import CardMedia from "@material-ui/core/CardMedia";
import EventNoteIcon from '@material-ui/icons/EventNote';
const useStyles = makeStyles({
    card: {
        maxWidth: "100%",
        marginBottom: "10px"
    }
});

export default function ImgMediaCard(props) {

    const classes = useStyles();
    const { tabType } = props;
    const { todoSearchFor } = props.state;

    function getDataBasedOnRequestType(tabType,todoSearchFor) {

        const dateFormat = "DD/MM/YYYY";
        let tabTypeBasedData =  (tabType == 'all') ? props.state.allTodoData : props.state.allTodoData.filter((obj) => obj.todoType === tabType);
        if(todoSearchFor == "today") {
            tabTypeBasedData = tabTypeBasedData.filter((obj) => moment(obj.txtWhen).format(dateFormat) == moment().format("DD/MM/YYYY"));
        } else if (todoSearchFor == "upcoming") {
             tabTypeBasedData = tabTypeBasedData.filter((obj) => moment(obj.txtWhen).format(dateFormat) > moment().format("DD/MM/YYYY"));
        } else {
            tabTypeBasedData = tabTypeBasedData.filter((obj) => moment(obj.txtWhen).format(dateFormat) < moment().format("DD/MM/YYYY"));
        }
        return tabTypeBasedData;
    }

    //console.log(getDataBasedOnRequestType(tabType,todoSearchFor));

    const tabTypeBasedData = getDataBasedOnRequestType(tabType,todoSearchFor);
    if (tabTypeBasedData.length > 0) {

        const { count } = props;
        console.log(props);

        return (
            //Looping through all data
            //props.state.allTodoData.map((item, index) =>
            tabTypeBasedData.map((item, index) =>

                    <Grid item xs={12} md={12} key={index.toString()}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                image="/images/contemplative-reptile.jpg"
                                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.txtWhatToDo}  {item.txtWhenDiffFormat}

                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.txtWhereToDo}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <IconButton size="small"
                                    onClick={()=> props.handleChangeTodoStatus(item.todoType,item.counterId)}
                                >
                                    {item.todoType === 'active' ? <CheckIcon data-for='handleChangeTodoStatus' data-tip='Click to complete'/> : <UndoIcon data-for='handleChangeTodoStatus' data-tip='Click to undo'/> }
                                
                                </IconButton>
                                
                                <IconButton size="small"
                                    onClick={()=> props.handleRemoval(item.counterId)}
                                >
                                    <DeleteIcon data-for='handleChangeTodoStatus' data-tip='Click to delete'/>
                                </IconButton>
                                <ReactTooltip place="bottom" id='handleChangeTodoStatus' getContent={(dataTip) => `${dataTip}`}/>
                            </CardActions>
                        </Card>
                    </Grid>
            )
        );
    }
    return <NoDataFound tabType={tabType} />;
}
