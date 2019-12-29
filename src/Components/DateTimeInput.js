import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function App(props) {

  
  //const [selectedDate, handleDateChange] = useState(new Date("2018-01-01T00:00:00.000Z"));
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <DateTimePicker
          label="When?"
          clearable
          value={props.txtWhen}
          onChange={props.handleChange}
          fullWidth
          id = 'txtWhen'
        />
    </MuiPickersUtilsProvider>
  );
}
export default App;