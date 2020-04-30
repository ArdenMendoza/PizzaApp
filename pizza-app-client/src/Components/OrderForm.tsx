import React from 'react';
import { Observable, empty } from 'rxjs';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { pizzaSize, crustType, extraToppings, order } from '../api/model';
import { IPizzaAppState } from '../Store/PizzaAppStore';

interface Props {

}
interface orderFormState {

}
interface ReduxStateProps {
    order: order;
}
interface DispatchProps {
    onSetOrder: (event: React.ChangeEvent<{name?: string | undefined; value: unknown;}>, child: React.ReactNode) => void | undefined;
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const OrderFormDump: React.StatelessComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { order, onSetOrder } = props;
    const classes = useStyles();
    const [pizzaSize, setPizzaSize] = React.useState('small');
    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Pizza Size</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={order.size}
                    onChange={onSetOrder}
                    label="Pizza Size">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'small'}>Small($8)</MenuItem>
                    <MenuItem value={'medium'}>Medium($10)</MenuItem>
                    <MenuItem value={'large'}>Large($12)</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export const OrderForm = connect<ReduxStateProps, DispatchProps, Props, IPizzaAppState>((state) => ({
    order: state.orderPage.order
}), dispatch => ({
    onSetOrder: event => alert(event.target.value)
}))(OrderFormDump)
