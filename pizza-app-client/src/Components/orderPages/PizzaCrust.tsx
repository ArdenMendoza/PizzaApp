import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Avatar, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { crustType } from '../../api/model';
import { IPizzaAppState } from '../../Store/PizzaAppStore';
import * as OrderActions from '../../Store/actions/OrderActions';

interface Props {
}
interface ReduxStateProps {
    crustType: crustType;
}
interface DispatchProps {
    onSetPizzaCrust: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}
const getPizzaCrustType = (innerHTML: string | undefined): crustType => {
    if (innerHTML !== undefined) {
        switch (innerHTML) {
            case 'Thin':
                return 'thin';
            case 'Thick':
                return 'thick';
            default:
                return undefined;
        }
    }
    return undefined;
}
const getClassName = (pizzaCrust: crustType, cardOptionLabel: crustType): string => pizzaCrust == cardOptionLabel ? 'cardOption cardSelected' : 'cardOption';

const PizzaCrustPanelDump: React.StatelessComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { crustType, onSetPizzaCrust } = props;
    return (
        <div className={'orderPage'}>
            <h1 className={'pageTitle'}>Pizza Crust</h1>
            <div style={{ height: '100%', flex: 1 }}>
                <div style={{ display: 'flex', height: 'calc(100% - 20px)' }}>
                    <Card onClick={onSetPizzaCrust} className={getClassName(crustType, 'thin')}>
                        <div className={'cardOptionImage'} style={{ backgroundImage: 'url(https://tinyurl.com/yd29xtya)' }}></div>
                        <div className={'cardOptionLabel'}>Thin</div>
                    </Card>
                    <Card onClick={onSetPizzaCrust} className={getClassName(crustType, 'thick')}>
                        <div className={'cardOptionImage'} style={{ backgroundImage: 'url(https://tinyurl.com/yd29xtya)' }}></div>
                        <div className={'cardOptionLabel'}>Thick</div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export const PizzaCrustPanel = connect<ReduxStateProps, DispatchProps, Props, IPizzaAppState>((state) => ({
    crustType: state.orderPage.crustType
}), dispatch => ({
    onSetPizzaCrust: event => dispatch(OrderActions.setPizzaCrust(getPizzaCrustType(event.currentTarget.lastElementChild?.innerHTML)))
}))(PizzaCrustPanelDump)

