import React from 'react';
import { Stepper, Step, StepLabel, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { pizzaSize, crustType } from '../api/model';
import { IPizzaAppState } from '../Store/PizzaAppStore';
import * as OrderActions from '../Store/actions/OrderActions';
import * as DialogActions from '../Store/actions/DialogActions';
import { PizzaToppingsPanel } from './orderPages/PizzaToppings';
import { CheckoutPanel } from './orderPages/CheckoutPage';
import { OrderPanel } from './orderPages/GenericOrderPage';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import sizeSmall from '../images/size_small.png';
import sizeMedium from '../images/size_medium.png';
import sizeLarge from '../images/size_large.png';
import crustThin from '../images/crust_thin.jpg';
import crustThick from '../images/crust_thick.jpg';
import { IOrderPageState } from '../Store/reducers/OrderReducers';
import { IDialogState } from '../Store/reducers/DialogReducer';
import { MessageDialog } from './Dialogs/MessageDialog';

interface Props {

}
interface ReduxStateProps {
    orderPage: IOrderPageState;
    crustType: crustType;
    dialog: IDialogState;
}
interface DispatchProps {
    onSetPizzaSize: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    onSetPizzaCrust: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
    onCloseDialog: () => void;
}

function getSteps() {
    return ['Select pizza size', 'Select crust type', 'Select extra toppings', 'Proceed to checkout'];
}

const OrderFormDump: React.StatelessComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { orderPage, onSetPizzaSize, onSetPizzaCrust, dialog, onCloseDialog } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    const steps = getSteps();
    const getOrderView = (activeStep: number) => {
        switch (activeStep) {
            case 0:
                return <OrderPanel
                    pageTitle={'Please select a Pizza size'}
                    menuItems={[
                        { menuLabel: 'Small', menuImageUrl: sizeSmall },
                        { menuLabel: 'Medium', menuImageUrl: sizeMedium },
                        { menuLabel: 'Large', menuImageUrl: sizeLarge },
                    ]}
                    selectedItemLabel={orderPage.pizzaSize ? orderPage.pizzaSize.valueOf() : ''}
                    onMenuItemClick={onSetPizzaSize}
                />
            case 1:
                return <OrderPanel
                    pageTitle={'Please select pizza crust'}
                    menuItems={[
                        { menuLabel: 'Thin', menuImageUrl: crustThin },
                        { menuLabel: 'Thick', menuImageUrl: crustThick },
                    ]}
                    selectedItemLabel={orderPage.crustType ? orderPage.crustType.valueOf() : ''}
                    onMenuItemClick={onSetPizzaCrust}
                />
            case 2:
                return <PizzaToppingsPanel />;
            case 3:
                return <CheckoutPanel />;
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 65px)' }}>
            <MessageDialog isDialogOpen={dialog.isOpen} dialogText={dialog.message} dialogTitle={dialog.title} onClose={onCloseDialog} />
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div style={{ height: 'calc(100% - 115px)', width: '75%', margin: '0px auto', display: 'flex' }}>
                <div className={'navButton'}>
                    <Button
                        disabled={activeStep === 0}
                        variant="contained"
                        color="primary"
                        onClick={handleBack}>
                        <KeyboardArrowLeftIcon htmlColor={'#fff'} fontSize={'large'} />
                    </Button>
                </div>
                <div style={{ flex: 1, height: '100%', margin: '0px 20px' }}>
                    {getOrderView(activeStep)}
                </div>
                <div className={'navButton'}>
                    <Button
                        disabled={orderPage.pizzaSize === undefined || activeStep === 3}
                        variant="contained"
                        color="primary"
                        onClick={handleNext}>
                        <KeyboardArrowRightIcon htmlColor={'#fff'} fontSize={'large'} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export const OrderForm = connect<ReduxStateProps, DispatchProps, Props, IPizzaAppState>((state) => ({
    orderPage: state.orderPage,
    crustType: state.orderPage.crustType,
    dialog: state.dialog
}), dispatch => ({
    onSetPizzaSize: event => dispatch(OrderActions.pizzaSizeSelect(event.currentTarget.lastElementChild?.innerHTML as pizzaSize)),
    onSetPizzaCrust: event => dispatch(OrderActions.pizzaCrustSelect(event.currentTarget.lastElementChild?.innerHTML as crustType)),
    onCloseDialog: () => dispatch(DialogActions.closeDialog())
}))(OrderFormDump)
