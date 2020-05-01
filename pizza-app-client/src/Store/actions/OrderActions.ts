import moduleName from 'module'
import { combineReducers as cr, Reducer, ReducersMapObject, Action } from 'redux';
import { pizzaSize, crustType, extraTopping } from '../../api/model';


export interface ISimpleAction extends Action {
    type: string;
}

export interface IAction<P> extends ISimpleAction {
    payload: P;
}

export type ISetPizzaSizePayload = pizzaSize | undefined;
export interface ISetPizzaSizeAction extends IAction<ISetPizzaSizePayload> { type: 'SET_PIZZA_SIZE';  }
export const setPizzaSize = (payload: ISetPizzaSizePayload): ISetPizzaSizeAction => ({
    type: 'SET_PIZZA_SIZE',
    payload
});

export type ISetPizzaCrustPayload = crustType | undefined;
export interface ISetPizzaCrustAction extends IAction<ISetPizzaCrustPayload> { type: 'SET_PIZZA_CRUST';  }
export const setPizzaCrust = (payload: ISetPizzaCrustPayload): ISetPizzaCrustAction => ({
    type: 'SET_PIZZA_CRUST',
    payload
});

export interface IAddPizzaToppingAction extends IAction<extraTopping> { type: 'ADD_PIZZA_TOPPINGS';  }
export const addPizzaToppings = (payload: extraTopping): IAddPizzaToppingAction => ({
    type: 'ADD_PIZZA_TOPPINGS',
    payload
});
