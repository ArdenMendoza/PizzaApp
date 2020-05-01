import { ISetPizzaSizeAction, ISetPizzaCrustAction, IAddPizzaToppingAction } from '../actions/OrderActions';
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

export const orderPageReducer = (state = initialState, action: ISetPizzaSizeAction | ISetPizzaCrustAction | IAddPizzaToppingAction): IOrderPageState => {
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
        case 'ADD_PIZZA_TOPPINGS':
            let toppings: extraTopping[] = state.extraToppings;
            // !toppings.includes(action.payload) ? toppings.push(action.payload) : toppings.filter(f => f != action.payload);
            if (toppings.includes(action.payload)) {
                toppings = toppings.filter(f => f != action.payload);
            } else {
                toppings.push(action.payload);
            }
            return {
                ...state,
                extraToppings: [...toppings]
            }
    }
    return state;
};