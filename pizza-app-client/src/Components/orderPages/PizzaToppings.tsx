import React from 'react';
import { Card } from '@material-ui/core';
import { connect } from 'react-redux';
import { extraTopping } from '../../api/model';
import { IPizzaAppState } from '../../Store/PizzaAppStore';
import * as OrderActions from '../../Store/actions/OrderActions';

import i_pepperoni from '../../images/toppings/i_pepperoni.jpg';
import i_bacon from '../../images/toppings/i_bacon.jpg';
import i_cheese from '../../images/toppings/i_cheese.jpg';
import i_greenpepper from '../../images/toppings/i_greenpepper.jpg';
import i_mushroom from '../../images/toppings/i_mushroom.jpg';
import i_olives from '../../images/toppings/i_olives.jpg';
import i_onion from '../../images/toppings/i_onion.jpg';
import i_pineapple from '../../images/toppings/i_pineapple.jpg';
import i_sausage from '../../images/toppings/i_sausage.jpg';
import i_spinach from '../../images/toppings/i_spinach.jpg';

interface Props {
}
interface ReduxStateProps {
    reduxExtraToppings: extraTopping[];
}
interface DispatchProps {
    onSetPizzaToppings: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}

const getClassNames = (reduxExtraToppings: extraTopping[], t: extraTopping): string => {
    // cardOptionInline-3
    let className: string = 'cardOptionInline-3';
    if (reduxExtraToppings.includes(t)) {
        className = className + ' cardSelected';
    }
    return className;
}

const getImages = (t: extraTopping) => {
    switch (t) {
        case 'Pepperoni':
            return i_pepperoni;
        case 'Mushrooms':
            return i_mushroom;
        case 'Onions':
            return i_onion;
        case 'Sausage':
            return i_sausage;
        case 'Bacon':
            return i_bacon;
        case 'Extra cheese':
            return i_cheese;
        case 'Black olives':
            return i_olives;
        case 'Green Peppers':
            return i_greenpepper;
        case 'Pineapple':
            return i_pineapple;
        case 'Spinach':
            return i_spinach;
        default:
            return '';
    }
}

const PizzaToppingsPanelDump: React.StatelessComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { reduxExtraToppings, onSetPizzaToppings } = props;
    const toppings: extraTopping[] = ['Pepperoni', 'Mushrooms', 'Onions', 'Sausage', 'Bacon', 'Extra cheese', 'Black olives', 'Green Peppers', 'Pineapple', 'Spinach'];
    return (
        <div className={'orderPage'}>
            <h1 className={'pageTitle'}>Pizza Toppings</h1>
            <div className={'pageSubtext'}>Please note that the first 3 toppings are free. Each new addition after the third one costs $0.50 each.</div>
            <div style={{ flex: 1, overflow: 'auto', flexWrap: 'wrap', padding: '10px' }}>
                {
                    toppings.map(t => {
                        return (
                            <Card onClick={onSetPizzaToppings} className={getClassNames(reduxExtraToppings, t)}>
                                <div className={'cardOptionImage'} style={{ backgroundImage: 'url(' + getImages(t) + ')' }}></div>
                                <div className={'cardOptionLabel'}>{t}</div>
                            </Card>
                        );
                    })
                }
            </div>
        </div>
    );
}

export const PizzaToppingsPanel = connect<ReduxStateProps, DispatchProps, Props, IPizzaAppState>((state) => ({
    reduxExtraToppings: state.orderPage.extraToppings
}), dispatch => ({
    onSetPizzaToppings: event => dispatch(OrderActions.addPizzaToppings(event.currentTarget.lastElementChild?.innerHTML as extraTopping)),
}))(PizzaToppingsPanelDump)

