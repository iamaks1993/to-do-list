import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import SignInSide from './Components/SignInSide';


class AddTaskForm extends Component {
  render() {
    return (<div className="App">
      <form>
        Type : <br /> 
         <select id='drpdTodoType' name='drpdTodoType'>
             <option value='family'>Family</option>
             <option value='business'>Business</option>
             <option value='personal'>Personal</option>
             <option value='work'>Work</option>
         </select>
         <br />
        <input type="text" name="txtWhatToDo" placeholder= "What i have to do?" required/>
        <br />
        <input type="text" name="txtWhereToDo" placeholder= "Where to do?" required/>
        <br /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>);

  }
}
class AddTaskButton extends Component {

  openTodoForm = () => {
    const { handleShowForm } = this.props;
    handleShowForm();

  }

  render() {
    return (
    /*<input
      type='button'
      defaultValue="Add Todo"
      onClick={this.openTodoForm}
    />*/
    <Button 
          variant="contained" 
          color="primary"
          onClick={this.openTodoForm}
          type='button'>
      Add Todo
    </Button>
    );
  }
}
class ParentWrapper extends Component {

  state = {
    isShowed : false
  }

  handleShowForm = () => {
    this.setState({
      isShowed  :true
    })
  }

  render() {
    return (<div>
      <AddTaskButton handleShowForm={this.handleShowForm} />
      {
        this.state.isShowed
        &&
      <AddTaskForm />
      }
    </div>);

  }
}

export default SignInSide;
