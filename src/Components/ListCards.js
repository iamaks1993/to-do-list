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
import ReactTooltip from 'react-tooltip';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {lighten} from '@material-ui/core'
import CardMedia from "@material-ui/core/CardMedia";
import EventNoteIcon from '@material-ui/icons/EventNote';
import Avatar from 'react-avatar';
import FamilyIcon from '../images/svg/icons8-family-100.svg';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: "100%",
        marginBottom: "10px",
        alignItems: "center",
    },
    root: {
        padding: " 1rem 1.5rem",
        borderRadius: "10px",
        margin: "10px 0",
        // display: "flex",
        alignItems: "center",
        background: "#fff",
        boxShadow: "0 0 1px rgba(0, 0, 0, 0.13), 0 1px 3px rgba(0, 0, 0, 0.26)",
        transition : 'all 400ms ease',
        '&:hover' : {
            cursor : 'pointer',
            transition : 'all 400ms ease',
            background: `linear-gradient(
                90deg,
                ${lighten(theme.palette.primary.main, 0.5)} 0%,
                #fff 80.96%
              )`
        }
    },
    title: {
        fontSize: "1rem",
        fontWeight: "500",
        lineHeight: "1.6",
        transition: "all 900ms ease",
    },

    subTitle: {
        fontStyle: "0.85rem",
        color: "darken(30%)",
        transition: "all 900ms ease",
    },
    content : {
        textAlign: "left",
        flex: "1 1 auto",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: "15px",
        float : "left"
      },
     avtar : {
         fontSize : "50px",
         float : "left"
        //  borderRadius : "50%"
     }, 
     whenTime : {
        // clear : "both",
        fontSize : "13px",
        textAlign: "right",
     },
     cardActions : {
         float : "right",
         //marginTop: "10px",
     },
     textStrike : {
        textDecoration: "line-through"
     }
     
}));


export default function ImgMediaCard(props) {

    const classes = useStyles();
    const { tabType } = props;
    const { todoSearchFor } = props.state;


    function returnIcon(drpdTodoType) {

        let returnIcon = <BusinessIcon className = {classes.avtar}/>;
        if(drpdTodoType == "work") {
            returnIcon = <WorkIcon className = {classes.avtar}/>;
        } else if (drpdTodoType == "family") {
            returnIcon = <img src={FamilyIcon} width={50} height={50} className = {classes.avtar}/>; 
        }  else if (drpdTodoType == "personal") {
            returnIcon = <PermIdentityIcon className = {classes.avtar}/>;
        }
        return returnIcon;
    }

    

    function returnDataBasedOnTodoSearchFor(todoSearchFor,tabTypeBasedData) {

        var data = tabTypeBasedData;
        var filteredData = [];
        for (var i in data) {

            if (todoSearchFor == "today") { 

                if(moment(moment(data[i].txtWhen).format("YYYY-MM-DD")).isSame(moment().format("YYYY-MM-DD"))) {
                    filteredData.push(data[i]);
                }

            }  else if (todoSearchFor == "upcoming") { 

                if(moment(moment(data[i].txtWhen).format("YYYY-MM-DD")).isAfter(moment().format("YYYY-MM-DD"))) {
                    filteredData.push(data[i]);
                }

            } else {

                if(moment(moment(data[i].txtWhen).format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD"))) {
                    filteredData.push(data[i]);
                }
            }
        }
        return filteredData;
    }

    function getDataBasedOnRequestType(tabType, todoSearchFor) {

        const dateFormat = "DD/MM/YYYY";
        let tabTypeBasedData = (tabType == 'all') ? props.state.allTodoData : props.state.allTodoData.filter((obj) => obj.todoType === tabType);
        //  if (todoSearchFor == "today") {
        //      tabTypeBasedData = tabTypeBasedData.filter((obj) => moment(moment(obj.txtWhen).format("YYYY-MM-DD")).isSame(moment().format("YYYY-MM-DD")));
        //  } else if (todoSearchFor == "upcoming") {
        //      tabTypeBasedData = tabTypeBasedData.filter((obj) => moment(moment(obj.txtWhen).format("YYYY-MM-DD")).isAfter(moment().format("YYYY-MM-DD")));
        //  } else {
        //      tabTypeBasedData = tabTypeBasedData.filter((obj) => moment(moment(obj.txtWhen).format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD")));
        //  }
        // tabTypeBasedData.map((item, index) => 
        //     console.log(moment(moment(item.txtWhen).format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD")) + moment(item.txtWhen).format("YYYY-MM-DD") + "---" +moment().format("YYYY-MM-DD"))
        // )
        tabTypeBasedData = returnDataBasedOnTodoSearchFor(todoSearchFor,tabTypeBasedData);
        //console.log(returnDataBasedOnTodoSearchFor(todoSearchFor));
        //return false;
         return tabTypeBasedData;
    }

   // console.log(getDataBasedOnRequestType(tabType, todoSearchFor));
    const tabTypeBasedData = getDataBasedOnRequestType(tabType, todoSearchFor);

     console.log(tabTypeBasedData);
    // return false;
    if (tabTypeBasedData.length > 0) {

        const { count } = props;
        console.log(props);

        return (
            //Looping through all data
            //props.state.allTodoData.map((item, index) =>
            tabTypeBasedData.map((item, index) =>
                <Grid item xs={12} md={12} key={index.toString()}>
                     <div className={classes.root}>
                            
                                {returnIcon(item.drpdTodoType)}

                                <div className= {classes.content}>
                                    <Typography  gutterBottom variant="h5" component="h2" style={{textDecoration: item.todoType !== 'active' ? 'line-through' : 'none'}}>
                                        {item.txtWhatToDo} 
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.txtWhereToDo}
                                    </Typography>
                                </div>
                                <div className = {classes.cardActions}>
                                <IconButton size="small"
                                    onClick={()=> props.handleChangeTodoStatus(item.todoType,item.counterId)}
                                >
                                    {item.todoType === 'active' ? <CheckIcon color="primary" data-for='handleChangeTodoStatus' data-tip='Complete'/> : <UndoIcon color="primary" data-for='handleChangeTodoStatus' data-tip='Undo'/> }
                                </IconButton>
                                <IconButton size="small" color="secondary"
                                    onClick={()=> props.handleRemoval(item.counterId)}
                                >
                                    <DeleteIcon data-for='handleChangeTodoStatus' data-tip='Delete'/>
                                </IconButton>
                                <ReactTooltip place="bottom" id='handleChangeTodoStatus' getContent={(dataTip) => `${dataTip}`}/>
                                </div>
                                <div style = {{clear : "both"}}></div>
                                <div className = {classes.whenTime}>
                                    {item.txtWhenDiffFormat}
                                </div>
                     </div>
                </Grid>
            )
        );
    }
    return <NoDataFound tabType={tabType} />;
}
