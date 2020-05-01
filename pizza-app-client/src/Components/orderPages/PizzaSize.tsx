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
const getPizzaSize = (innerHTML: string | undefined): pizzaSize => {
    if (innerHTML !== undefined) {
        switch (innerHTML) {
            case 'Small':
                return 'small';
            case 'Medium':
                return 'medium';
            case 'Large':
                return 'large';
            default:
                return undefined;
        }
    }
    return undefined;
}
const getClassName = (pizzaSize: pizzaSize, cardOptionLabel: pizzaSize): string => pizzaSize == cardOptionLabel ? 'cardOption cardSelected' : 'cardOption';

const PizzaSizePanelDump: React.StatelessComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { pizzaSize, onSetPizzaSize } = props;
    return (
        <div className={'orderPage'} style={{ height: 'calc(100% - 40px)', margin: '20px', display: 'flex', flexDirection: 'column'}}>
            <CardHeader title="Pizza size" subheader="Please select a pizza size" />
            <CardContent style={{ height: '100%', flex: 1 }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <Card onClick={onSetPizzaSize} className={getClassName(pizzaSize, 'small')}>
                        <div className={'cardOptionImage'} style={{ backgroundImage: 'url(https://tinyurl.com/yd29xtya)' }}></div>
                        <div className={'cardOptionLabel'}>Small</div>
                    </Card>
                    <Card onClick={onSetPizzaSize} className={getClassName(pizzaSize, 'medium')}>
                        <div className={'cardOptionImage'} style={{ backgroundImage: 'url(https://tinyurl.com/yd29xtya)' }}></div>
                        <div className={'cardOptionLabel'}>Medium</div>
                    </Card>
                    <Card onClick={onSetPizzaSize} className={getClassName(pizzaSize, 'large')}>
                        <div className={'cardOptionImage'} style={{ backgroundImage: 'url(https://tinyurl.com/yd29xtya)' }}></div>
                        <div className={'cardOptionLabel'}>Large</div>
                    </Card>
                </div>
            </CardContent>
        </div>
    );
}

export const PizzaSizePanel = connect<ReduxStateProps, DispatchProps, Props, IPizzaAppState>((state) => ({
    pizzaSize: state.orderPage.pizzaSize
}), dispatch => ({
    onSetPizzaSize: event => dispatch(OrderActions.setPizzaSize(getPizzaSize(event.currentTarget.lastElementChild?.innerHTML)))
}))(PizzaSizePanelDump)

