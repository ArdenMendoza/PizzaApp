import React from 'react';
import { Observable, empty } from 'rxjs';
import { makeStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, Card, CardContent, CardHeader, Avatar, IconButton, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { pizzaSize, crustType, extraTopping } from '../api/model';
import { IPizzaAppState } from '../Store/PizzaAppStore';
import * as OrderActions from '../Store/actions/OrderActions';
import { PizzaSizePanel } from './orderPages/PizzaSize';
import { PizzaCrustPanel } from './orderPages/PizzaCrust';
import { PizzaToppingsPanel } from './orderPages/PizzaToppings';
import { CheckoutPanel } from './orderPages/CheckoutPage';


import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

interface Props {

}
interface orderFormState {

}
interface ReduxStateProps {
    pizzaSize: pizzaSize;
}
interface DispatchProps {
    // onSetPizzaSize: (event: React.ChangeEvent<{ name?: string | undefined; value: pizzaSize; }>, child: React.ReactNode) => void | undefined;
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

function getSteps() {
    return ['Select pizza size', 'Select crust type', 'Select extra toppings', 'Proceed to checkout'];
}


const OrderFormDump: React.StatelessComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { pizzaSize } = props;
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(1);
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    const steps = getSteps();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 65px)' }}>
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
                <div style={{ flex: 1, height: '100%' }}>
                    {activeStep === 0 && <PizzaSizePanel />}
                    {activeStep === 1 && <PizzaCrustPanel />}
                    {activeStep === 2 && <PizzaToppingsPanel />}
                    {activeStep === 3 && <CheckoutPanel />}
                </div>
                <div className={'navButton'}>
                    <Button
                        disabled={pizzaSize === undefined || activeStep === 3}
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
    pizzaSize: state.orderPage.pizzaSize
}), dispatch => ({
}))(OrderFormDump)
