import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Scrollbars } from 'react-custom-scrollbars';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

import ImgMediaCard from './ListCards';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root_left_side: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '452px',
    //backgroundColor: 'black',
  },

}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root_left_side}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Done" {...a11yProps(1)} />
          <Tab label="Active" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Scrollbars style={{ height: "340px" }}>
       <div style={{maxHeight:"200px"}}> 
          <TabPanel value={value} index={0} className={classes.tabsPanel}>
              <ImgMediaCard state = {props.state} tabType = {'all'} handler = {props.handler} handleRemoval = {props.handleRemoval} handleChangeTodoStatus = {props.handleChangeTodoStatus}/>
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.tabsPanel}>
              <ImgMediaCard state = {props.state} tabType = {'done'} handler = {props.handler} handleRemoval = {props.handleRemoval} handleChangeTodoStatus = {props.handleChangeTodoStatus}/>
          </TabPanel>
          <TabPanel value={value} index={2} className={classes.tabsPanel}>
            <ImgMediaCard state = {props.state} tabType = {'active'} handler = {props.handler} handleRemoval = {props.handleRemoval} handleChangeTodoStatus = {props.handleChangeTodoStatus} />
          </TabPanel>
        </div>
      </Scrollbars>
    </div>
  );
}
