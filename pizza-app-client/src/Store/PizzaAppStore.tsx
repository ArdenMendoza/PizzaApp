import { createStore, combineReducers, applyMiddleware, compose, Action } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { AddToppingEpic, SetPizzaSizeEpic } from './epics/OrderEpics';

import { orderPageReducer, IOrderPageState } from './reducers/OrderReducers';
import { dialogReducer, IDialogState } from './reducers/DialogReducer';

export interface IPizzaAppState {
    orderPage: IOrderPageState;
    dialog: IDialogState;
}


export type IPizzaAppEpic<T extends Action<any>> = Epic<T, any, IPizzaAppState>;

const configureEpic = () => {
    return combineEpics(AddToppingEpic, SetPizzaSizeEpic);
}

const configureReducer = () =>
    combineReducers<IPizzaAppState>({
        orderPage: orderPageReducer,
        dialog: dialogReducer
    });


export default function configureStore() {
    const rootEpic = configureEpic();
    const epicMiddleware = createEpicMiddleware<any, any, IPizzaAppState, any>();
    const middleware = applyMiddleware(epicMiddleware);

    const composeEnhancers =
        typeof window === 'object' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const enhancer = composeEnhancers(
        middleware,
        // other store enhancers if any
    );

    const store = createStore(configureReducer(), enhancer);
    epicMiddleware.run(rootEpic);
    return store;
}



// export default createStore(
//     configureReducer(),
//     applyMiddleware(epicMiddleware),
//     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );