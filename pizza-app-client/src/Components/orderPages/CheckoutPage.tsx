import React from 'react';
import { connect } from 'react-redux';
import { extraTopping, crustType } from '../../api/model';
import { IPizzaAppState } from '../../Store/PizzaAppStore';
import { pizzaSize } from '../../api/model';
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
const getPizzaSizePrice = (pSize: pizzaSize): number => {
    switch (pSize) {
        case 'Small':
            return 8;
        case 'Medium':
            return 10;
        case 'Large':
            return 12;
    }
    return 0;
}
const getPizzaCrustPrice = (pizzaCrust: crustType): number => {
    switch (pizzaCrust) {
        case 'Thin':
            return 2;
        case 'Thick':
            return 4;
    }
    return 0;
}

const getPizzaToppingsPrices = (toppings: extraTopping[]): number[] => {
    const prices: number[] = [];
    for (let i = 0; i < toppings.length; i++) {
        if (i < 3) {
            prices.push(0);
        } else {
            prices.push(0.5);
        }
    }
    return prices;
}

const getPizzaToppingsWithPrices = (toppings: extraTopping[]) => {
    const itemsWithPrice: { item: extraTopping, price: number }[] = [];
    for (let i = 0; i < toppings.length; i++) {
        if (i < 3) {
            itemsWithPrice.push({ item: toppings[i], price: 0 });
        } else {
            itemsWithPrice.push({ item: toppings[i], price: 0.5 });
        }
    }
    return itemsWithPrice;
}

const getTotalAmount = (orderPageState: IOrderPageState) => getPizzaSizePrice(orderPageState.pizzaSize).valueOf() +
    getPizzaCrustPrice(orderPageState.crustType).valueOf() +
    getPizzaToppingsPrices(orderPageState.extraToppings).reduce((a, b) => a + b, 0);


const CheckoutPanelDump: React.StatelessComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { orderPageState } = props;
    console.log(getPizzaToppingsWithPrices(orderPageState.extraToppings));
    return (
        <div className={'orderPage'}>
            <h1>Proceed to checkout</h1>
            <Paper variant="outlined" square style={{ width: '50%', margin: '0px auto', padding: '20px' }}>
                <div style={{ margin: '10px', marginBottom: '30px' }}>
                    <div className={'flexContainer'}>
                        <div className={'flex1 boldFont'}>Pizza Size:</div>
                        <div className={'flex1'}>{orderPageState.pizzaSize}</div>
                        <div className={'flex1 prices'}>$ {getPizzaSizePrice(orderPageState.pizzaSize).toFixed(2)}</div>
                    </div>
                    <div className={'flexContainer'}>
                        <div className={'flex1 boldFont'}>Pizza Crust:</div>
                        <div className={'flex1'}>{orderPageState.crustType}</div>
                        <div className={'flex1 prices'}>$ {getPizzaCrustPrice(orderPageState.crustType).toFixed(2)}</div>
                    </div>
                    <div className={'flexContainer'}>
                        <div className={'flex1 boldFont'}>Extra Toppings:</div>
                        <div className={'flex2'}>
                            {getPizzaToppingsWithPrices(orderPageState.extraToppings).map(m => {
                                return <div className={'flex1 flexContainer'}>
                                    <div className={'flex1'}>{m.item}</div>
                                    <div className={'flex1 prices'}>$ {m.price.toFixed(2)}</div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={'prices boldFont'}>
                        $ {getTotalAmount(orderPageState).toFixed(2)}
                    </div>
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

