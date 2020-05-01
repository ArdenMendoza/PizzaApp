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
    const toppings: extraTopping[] = ['Bacon', 'Black olives', 'Pepperoni', 'Onions', 'Pineapple'];
    return (
        <div className={'orderPage'} style={{ height: 'calc(100% - 40px)', margin: '20px', display: 'flex', flexDirection: 'column' }}>
            <CardHeader title="Pizza size" subheader="Please select a pizza size" />
            <CardContent style={{ height: '100%', flex: 1, display: 'flex' }}>
                <div style={{ height: '100%', flex: 1, border: 'red dotted 1px', padding: '10px' }}>
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
                <div style={{ border: 'red dotted 1px', width: '400px' }}>
                    <h2>Toppings summary</h2>
                    {
                        reduxExtraToppings.map(t => {
                            return <div>{t}</div>
                        })
                    }
                </div>
            </CardContent>
        </div>
    );
}

export const PizzaToppingsPanel = connect<ReduxStateProps, DispatchProps, Props, IPizzaAppState>((state) => ({
    reduxExtraToppings: state.orderPage.extraToppings
}), dispatch => ({
    onSetPizzaToppings: event => dispatch(OrderActions.addPizzaToppings(event.currentTarget.lastElementChild?.innerHTML as extraTopping)),
}))(PizzaToppingsPanelDump)

