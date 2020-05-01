import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Avatar, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { extraTopping } from '../../api/model';
import { IPizzaAppState } from '../../Store/PizzaAppStore';
import * as OrderActions from '../../Store/actions/OrderActions';

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
        className = className + ' ' + 'cardSelected';
    }
    return className;
}

const PizzaToppingsPanelDump: React.StatelessComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { reduxExtraToppings, onSetPizzaToppings } = props;
    const toppings: extraTopping[] = ['Pepperoni', 'Mushrooms', 'Onions', 'Sausage', 'Bacon', 'Extra cheese', 'Black olives', 'Green peppers', 'Pineapple', 'Spinach'];
    return (
        <div className={'orderPage'}>
            <h1 className={'pageTitle'}>Pizza Toppings</h1>
            <div className={'pageSubtext'}>Please note that the first 3 toppings are free. Each new addition after the third one costs $0.50 each.</div>
            <div style={{ flex: 1, overflow: 'auto', flexWrap: 'wrap' }}>
                {
                    toppings.map(t => {
                        return (
                            <Card onClick={onSetPizzaToppings} className={getClassNames(reduxExtraToppings, t)}>
                                <div className={'cardOptionImage'} style={{ backgroundImage: 'url(https://tinyurl.com/yd29xtya)' }}></div>
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

