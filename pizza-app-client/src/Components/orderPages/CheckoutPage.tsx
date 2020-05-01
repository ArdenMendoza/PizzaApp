import React from 'react';
import { connect } from 'react-redux';
import { extraTopping } from '../../api/model';
import { IPizzaAppState } from '../../Store/PizzaAppStore';
import * as OrderActions from '../../Store/actions/OrderActions';
import { IOrderPageState } from '../../Store/reducers/OrderReducers';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Button, Paper } from '@material-ui/core';

interface Props {
}
interface ReduxStateProps {
    orderPageState: IOrderPageState;
}
interface DispatchProps {

}

const CheckoutPanelDump: React.StatelessComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { orderPageState } = props;
    return (
        <div className={'orderPage'}>
            <h1>Proceed to checkout</h1>
            <Paper variant="outlined" square style={{ width: '50%', margin: '0px auto', padding: '20px' }}>
                <div style={{ margin: '10px' }}>
                    <div><span className={'boldFont'}>Pizza Size:</span> {orderPageState.pizzaSize}</div>
                    <div><span className={'boldFont'}>Pizza Crust:</span> {orderPageState.crustType}</div>
                    <div><span className={'boldFont'}>Extra Toppings:</span> {orderPageState.extraToppings.map(t => <div>{t}</div>)}
                    </div>
                </div>
                <div>
                    
                </div>
                <Button variant="contained" color="primary" onClick={() => { }}>
                    <ReceiptIcon htmlColor={'#fff'} fontSize={'large'} />
                    Proceed to checkout
                </Button>
            </Paper>
        </div>
    );
}

export const CheckoutPanel = connect<ReduxStateProps, DispatchProps, Props, IPizzaAppState>((state) => ({
    orderPageState: state.orderPage
}), dispatch => ({

}))(CheckoutPanelDump)

