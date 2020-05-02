import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Avatar, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { pizzaSize } from '../../api/model';
import { IPizzaAppState } from '../../Store/PizzaAppStore';
import * as OrderActions from '../../Store/actions/OrderActions';

interface Props {
}
interface ReduxStateProps {
    pizzaSize: pizzaSize;
}
interface DispatchProps {
    onSetPizzaSize: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}

const getClassName = (pizzaSize: pizzaSize, cardOptionLabel: pizzaSize): string => pizzaSize == cardOptionLabel ? 'cardOption cardSelected' : 'cardOption';

const PizzaSizePanelDump: React.StatelessComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { pizzaSize, onSetPizzaSize } = props;
    return (
        <div className={'orderPage'}>
            <h1 className={'pageTitle'}>Pizza Size</h1>
            <div style={{ height: '100%', flex: 1 }}>
                <div style={{ display: 'flex', height: 'calc(100% - 20px)' }}>
                    <Card onClick={onSetPizzaSize} className={getClassName(pizzaSize, 'Small')}>
                        <div className={'cardOptionImage'} style={{ backgroundImage: 'url(https://tinyurl.com/yd29xtya)' }}></div>
                        <div className={'cardOptionLabel'}>Small</div>
                    </Card>
                    <Card onClick={onSetPizzaSize} className={getClassName(pizzaSize, 'Medium')}>
                        <div className={'cardOptionImage'} style={{ backgroundImage: 'url(https://tinyurl.com/yd29xtya)' }}></div>
                        <div className={'cardOptionLabel'}>Medium</div>
                    </Card>
                    <Card onClick={onSetPizzaSize} className={getClassName(pizzaSize, 'Large')}>
                        <div className={'cardOptionImage'} style={{ backgroundImage: 'url(https://tinyurl.com/yd29xtya)' }}></div>
                        <div className={'cardOptionLabel'}>Large</div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export const PizzaSizePanel = connect<ReduxStateProps, DispatchProps, Props, IPizzaAppState>((state) => ({
    pizzaSize: state.orderPage.pizzaSize
}), dispatch => ({
    onSetPizzaSize: event => dispatch(OrderActions.pizzaSizeSelect(event.currentTarget.lastElementChild?.innerHTML as pizzaSize))
}))(PizzaSizePanelDump)

