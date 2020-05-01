import moduleName from 'module'
import { combineReducers as cr, Reducer, ReducersMapObject, Action } from 'redux';
import { order, pizzaSize } from '../../api/model';


export interface ISimpleAction extends Action {
    type: string;
}

export interface IAction<P> extends ISimpleAction {
    payload: P;
}


export type ISetOrderPayload = order;
export interface ISetOrderAction extends IAction<ISetOrderPayload> { type: 'SET_ORDER';  }
export const setOrder = (payload: ISetOrderPayload): ISetOrderAction => ({
    type: 'SET_ORDER',
    payload
});

export type ISetPizzaSizePayload = pizzaSize | undefined;
export interface ISetPizzaSizeAction extends IAction<ISetPizzaSizePayload> { type: 'SET_PIZZA_SIZE';  }
export const setPizzaSize = (payload: ISetPizzaSizePayload): ISetPizzaSizeAction => ({
    type: 'SET_PIZZA_SIZE',
    payload
});
export const ping = () => ({type: 'PING'});
