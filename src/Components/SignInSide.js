import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import DateAndTimePickers from './DateTimeInput';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import SimpleTabs from './Tabs';


const useStyles = makeStyles(theme => ({
  todo_time_comp_con: {
    // height: '480px',
    // maxWidth: '800px',
    // position: 'relative',
    //margin: '0 auto',
    //top: '61px !important',
    // margin: '0px 0px 0px 16px'
  },
  root: {
    // height: '480px',
    // maxWidth: '800px',
    // position: 'relative',
    // margin: '60px auto 0 auto',
    border: '1px solid blue',

    boxShadow: '5px 10px #888888'
  },
  containerFirstChild: {
    border: '1px solid blue',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  superContainer : {

    margin: "60px auto 0 auto",
    position: "relative",
    maxWidth: "800px",
    // backgroundColor : "transparent"
  }
}));

export default function SignInSide() {
  const classes = useStyles();
  //const [txtWhen, setTxtWhenDateChange] = useState(null);
  //const txtWhen = null;

  const [state, setState] = useState({
    txtWhereToDo: '',
    txtWhatToDo: '',
    drpdTodoType: '',
    txtWhen: null,
    allTodoData: [],
    counterId: 0,
    todoSearchFor: 'today'
  })
  const handleDateChange = date => {

    var dateTime = moment(date).format("DD-MM-YYYY hh:mm a");
    //dd/MM/yyyy hh:mm a
    setState({
      ...state,
      txtWhen: date,
      txtWhenDiffFormat: dateTime
    });
    console.log(state);
  };

  function handleRemoval(nodeId) {

    var data = state.allTodoData;
    data = data.filter(function (el) {
      return el.counterId !== nodeId;
    });
    setState({
      ...state,
      allTodoData: data
    });
    return;
  }

  function handleChange(event) {
    setState({ ...state, [event.target.id]: event.target.value });
  }

  function handleChangeTodoStatus(todoType, nodeId) {

    var data = state.allTodoData;
    for (var i in data) {
      if (data[i].counterId == nodeId) {
        console.log(data[i].todoType, "clicked");
        data[i].todoType = data[i].todoType == 'active' ? 'done' : 'active';
        break;
      }
    }
    console.log(data);
    setState({
      ...state,
      allTodoData: data
    });
    return;
  }

  function addTodoData(event) {
    event.preventDefault();

    let counter = state.counterId + 1;
    setState((state) => ({
      ...state,
      counterId: counter,
      allTodoData: [...state.allTodoData,
      {
        counterId: counter,
        txtWhereToDo: state.txtWhereToDo,
        txtWhatToDo: state.txtWhatToDo,
        drpdTodoType: state.drpdTodoType,
        txtWhen: state.txtWhen,
        txtWhenDiffFormat: state.txtWhenDiffFormat,
        isActive: true,
        todoType: 'active',
        todoStatus: ''
      },
    ],
    txtWhereToDo: '',
      txtWhatToDo: '',
      drpdTodoType: '',
      txtWhen: null,
    }));

    console.log(state);
    console.log(moment());
  }
  return (

    //alignItems="center"
    <>
      <Grid container className = {classes.superContainer}>
        <Grid container component="main" className={classes.todo_time_comp_con}
          justify="flex-start">
          <Select
            native
            id="todoSearchFor"
            name="todoSearchFor"
            onChange={handleChange}
            value={state.todoSearchFor}
          >
            <option value='today'>Today</option>
            <option value='upcoming'>Upcoming</option>
            <option value='previous'>Previous</option>
          </Select>
        </Grid>
        <Grid container component="main" className={classes.root}
        justify="center">
        <CssBaseline />
        {/* className={classes.image} */}
        <Grid item xs={false} sm={12} md={12}></Grid>
        <Grid item xs={false} sm={4} md={7}>
          <SimpleTabs state={state} handler={setState} handleRemoval={handleRemoval} handleChangeTodoStatus={handleChangeTodoStatus} />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <EventNoteIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              To Do
            </Typography>
            <form className={classes.form} onSubmit={addTodoData}>
              <Grid container spacing={5}>

                <FormControl required className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="drpdTodoType">Type</InputLabel>
                  <Select
                    native
                    id="drpdTodoType"
                    name="drpdTodoType"
                    onChange={handleChange}
                    value={state.drpdTodoType}
                  >
                    <option value="" />
                    <option value='family'>Family</option>
                    <option value='business'>Business</option>
                    <option value='personal'>Personal</option>
                    <option value='work'>Work</option>
                  </Select>
                </FormControl>

                <TextField
                  id="txtWhatToDo"
                  name="txtWhatToDo"
                  label="What i have to do?"
                  fullWidth
                  onChange={handleChange}
                  value={state.txtWhatToDo}
                />
                <TextField
                  id="txtWhereToDo"
                  name="txtWhereToDo"
                  label="Where?"
                  fullWidth
                  onChange={handleChange}
                  value={state.txtWhereToDo}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <DateTimePicker
                    // disablePast
                    label="When?"
                    clearable
                    fullWidth
                    name='txtWhen'
                    id='txtWhen'
                    value={state.txtWhen}
                    onChange={handleDateChange}
                    format="dd-MM-yyyy hh:mm a"
                  />
                </MuiPickersUtilsProvider>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add Task
                  </Button>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
      </Grid>
    </>
  );
}