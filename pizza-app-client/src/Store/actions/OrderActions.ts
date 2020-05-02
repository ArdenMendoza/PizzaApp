import { Action } from 'redux';
import { pizzaSize, crustType, extraTopping } from '../../api/model';

export interface ISimpleAction extends Action {
    type: string;
}

export interface IAction<P> extends ISimpleAction {
    payload: P;
}

export type IPizzaSizeSelectPayload = pizzaSize | undefined;
export interface IPizzaSizeSelectAction extends IAction<IPizzaSizeSelectPayload> { type: 'PIZZA_SIZE_SELECT';  }
export const pizzaSizeSelect = (payload: IPizzaSizeSelectPayload): IPizzaSizeSelectAction => ({
    type: 'PIZZA_SIZE_SELECT',
    payload
});

export type IPizzaSizeSelectedPayload = pizzaSize | undefined;
export interface IPizzaSizeSelectedAction extends IAction<IPizzaSizeSelectedPayload> { type: 'PIZZA_SIZE_SELECTED';  }
export const pizzaSizeSelected = (payload: IPizzaSizeSelectedPayload): IPizzaSizeSelectedAction => ({
    type: 'PIZZA_SIZE_SELECTED',
    payload
});

export type IPizzaCrustSelectPayload = crustType | undefined;
export interface IPizzaCrustSelectAction extends IAction<IPizzaCrustSelectPayload> { type: 'PIZZA_CRUST_SELECT';  }
export const pizzaCrustSelect = (payload: IPizzaCrustSelectPayload): IPizzaCrustSelectAction => ({
    type: 'PIZZA_CRUST_SELECT',
    payload
});

export interface IAddPizzaToppingAction extends IAction<extraTopping> { type: 'ADD_PIZZA_TOPPINGS';  }
export const addPizzaToppings = (payload: extraTopping): IAddPizzaToppingAction => ({
    type: 'ADD_PIZZA_TOPPINGS',
    payload
});

export interface IPizzaToppingAddedAction extends IAction<extraTopping[]> { type: 'PIZZA_TOPPING_ADDED';  }
export const pizzaToppingAdded = (payload: extraTopping[]): IPizzaToppingAddedAction => ({
    type: 'PIZZA_TOPPING_ADDED',
    payload
});
