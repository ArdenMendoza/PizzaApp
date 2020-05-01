import { ISetPizzaSizeAction } from '../actions/OrderActions';
import { pizzaSize, crustType } from '../../api/model';
// export const combineReducers: <S, T extends ReducersMapObject>(reducers: T) => Reducer<S> = cr;
export interface IOrderPageState {
    pizzaSize: pizzaSize;
    crustType: crustType;
    extraToppings: [] | undefined;
}

const initialState: IOrderPageState = {
    pizzaSize: undefined,
    crustType: undefined,
    extraToppings: undefined,
};

export const orderPageReducer = (state = initialState, action: ISetPizzaSizeAction): IOrderPageState => {
    switch (action.type) {
        case 'SET_PIZZA_SIZE':
            return {
                ...state,
                pizzaSize: action.payload
            }
    }
    return state;
};