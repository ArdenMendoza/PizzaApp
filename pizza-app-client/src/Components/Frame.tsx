import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { OrderForm } from '../Components/OrderForm';


const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

export const Frame = () => {
    const classes = useStyles();
    return <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" style={{ width: '100%' }}>
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap> Pizza Castle Order Online </Typography>
            </Toolbar>
        </AppBar>
        <OrderForm />
    </div>
}
