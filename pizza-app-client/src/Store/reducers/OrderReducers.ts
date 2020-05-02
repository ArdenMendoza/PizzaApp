import { ISetPizzaSizeAction, ISetPizzaCrustAction, IAddedPizzaToppingAction } from '../actions/OrderActions';
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

export const orderPageReducer = (state = initialState, action: ISetPizzaSizeAction | ISetPizzaCrustAction | IAddedPizzaToppingAction): IOrderPageState => {
    switch (action.type) {
        case 'SET_PIZZA_SIZE':
            return {
                ...state,
                pizzaSize: action.payload
            }
        case 'SET_PIZZA_CRUST':
            return {
                ...state,
                crustType: action.payload
            }
        case 'ADDED_PIZZA_TOPPINGS':
            return {
                ...state,
                extraToppings: [...action.payload]
            }
    }
    return state;
};