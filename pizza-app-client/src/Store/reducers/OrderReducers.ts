import { IPizzaSizeSelectedAction, IPizzaCrustSelectAction, IPizzaToppingAddedAction } from '../actions/OrderActions';
import { pizzaSize, crustType, extraTopping } from '../../api/model';
// export const combineReducers: <S, T extends ReducersMapObject>(reducers: T) => Reducer<S> = cr;
export interface IOrderPageState {
    pizzaSize: pizzaSize;
    crustType: crustType;
    extraToppings: extraTopping[];
}

const initialState: IOrderPageState = {
    pizzaSize: undefined,
    crustType: undefined,
    extraToppings: [],
};

export const orderPageReducer = (state = initialState, action: IPizzaSizeSelectedAction | IPizzaCrustSelectAction | IPizzaToppingAddedAction): IOrderPageState => {
    switch (action.type) {
        case 'PIZZA_SIZE_SELECTED':
            return {
                ...state,
                pizzaSize: action.payload
            }
        case 'PIZZA_CRUST_SELECT':
            return {
                ...state,
                crustType: action.payload
            }
        case 'PIZZA_TOPPING_ADDED':
            return {
                ...state,
                extraToppings: [...action.payload]
            }
    }
    return state;
};