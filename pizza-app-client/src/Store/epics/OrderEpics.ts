import { filter, mergeMap } from 'rxjs/operators';
import { empty, of, Observable } from 'rxjs';
import { IAddPizzaToppingAction, pizzaToppingAdded, IPizzaSizeSelectAction, pizzaSizeSelected } from "../actions/OrderActions";
import { openDialog } from "../actions/DialogActions";

import { pizzaSize, extraTopping } from '../../api/model';
import { IPizzaAppEpic } from "../PizzaAppStore";

export const AddToppingEpic: IPizzaAppEpic<IAddPizzaToppingAction> = (action$, state$) =>
    action$.pipe(filter(a => a.type === 'ADD_PIZZA_TOPPINGS'),
        mergeMap(action => {
            const pizzaSize = state$.value.orderPage.pizzaSize;
            const extraToppings = state$.value.orderPage.extraToppings;

            let toppings: extraTopping[] = extraToppings;
            if (toppings.includes(action.payload)) {
                toppings = toppings.filter(f => f !== action.payload);
            } else {
                switch (pizzaSize) {
                    case 'Small':
                        if (toppings.length === 5) return exceedLimitOfToppings(5, pizzaSize)
                        break;
                    case 'Medium':
                        if (toppings.length === 7) return exceedLimitOfToppings(7, pizzaSize)
                        break;
                    case 'Large':
                        if (toppings.length === 9) return exceedLimitOfToppings(9, pizzaSize)
                        break;
                }
                toppings.push(action.payload);
            }
            return of(pizzaToppingAdded(toppings));
        })
    );
export const SetPizzaSizeEpic: IPizzaAppEpic<IPizzaSizeSelectAction> = (action$, state$) =>
    action$.pipe(filter(a => a.type === 'PIZZA_SIZE_SELECT'),
        mergeMap(action => {
            const selectedSize = action.payload;
            const toppings = state$.value.orderPage.extraToppings;

            switch (selectedSize) {
                case 'Small':
                    return toppings.length > 5 ? toppingsWillReset(5, toppings.length, selectedSize) : of(pizzaSizeSelected(selectedSize));
                case 'Medium':
                    return toppings.length > 7 ? toppingsWillReset(5, toppings.length, selectedSize) : of(pizzaSizeSelected(selectedSize));
                case 'Large':
                    return toppings.length > 9 ? toppingsWillReset(5, toppings.length, selectedSize) : of(pizzaSizeSelected(selectedSize));
            }
            return empty();
        })
    );

const exceedLimitOfToppings = (num: number, pizzaSize: pizzaSize): Observable<any> => {
    return new Observable(subs => {
        subs.next(openDialog({title: 'Too much toppings!', message: 'You are allowed to select ' + num + ' toppings only for ' + pizzaSize + ' pizzas.'}));
        subs.complete();
    });
}

const toppingsWillReset = (limit: number, toppingsCount: number, selectedSize: pizzaSize): Observable<any> => {
    return new Observable(subs => {
        subs.next(openDialog({title: 'Too much toppings!', message: 'This pizza allows only up to ' + limit + ' toppings. You currently have ' + toppingsCount + ' selected. Toppings will be reset.'}))
        subs.next(pizzaToppingAdded([]));
        subs.next(pizzaSizeSelected(selectedSize));
        subs.complete();
    })
}