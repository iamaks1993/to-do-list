import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EventNoteIcon from '@material-ui/icons/EventNote';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import NoDataFound from './TabNoDataFound';
import { IconButton } from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';




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

    const [state, setState] = useState({

        ...props.state
    
      });
    //Get records count of clicked tab data
    var tabTypeBasedCount = props.state.allTodoData.filter((obj) => obj.todoType === tabType).length;
    if ((props.state.allTodoData.length > 0 && tabType == 'all')
        || (tabTypeBasedCount > 0)) {

        const { count } = props;
        console.log(props);

        return (
            //Looping through all data
            props.state.allTodoData.map((item, index) =>

           
                <Grid item xs={12} md={12} key={index.toString()}>
                    <Card className={classes.card}>

                        <CardActionArea>
                            {/*<CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image="/images/contemplative-reptile.jpg"
                                            title="Contemplative Reptile"
                             /> */ }
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
                                {item.todoType === 'active' ? <CheckIcon /> : <UndoIcon /> }
                               
                            </IconButton>
                            <IconButton size="small"
                                onClick={()=> props.handleRemoval(item.counterId)}
                            >
                                <DeleteIcon title="Delete Todo"/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>

            )
        );
    }
    return <NoDataFound tabType={tabType} />;
}
