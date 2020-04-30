import { ISetOrderAction } from '../actions/OrderActions';
import { order } from '../../api/model';
// export const combineReducers: <S, T extends ReducersMapObject>(reducers: T) => Reducer<S> = cr;
export interface IOrderPageState {
    order: order;
}

const initialState: IOrderPageState = {
    order: {
        size: undefined,
        crustType: undefined,
        extraToppings: []
    },
};

export const orderPageReducer = (state = initialState, action: ISetOrderAction): IOrderPageState => {
    switch (action.type) {
        case 'SET_ORDER':
            return {
                ...state,
                order: {
                    ...state.order,
                }
            }
    }
    return state;
};