import { filter, mergeMap, switchMap, map } from 'rxjs/operators';
import { empty, merge, of, Observable } from 'rxjs';
import { IAddPizzaToppingAction, addedPizzaToppings } from "../actions/OrderActions";
import { pizzaSize, extraTopping } from '../../api/model';
import { IPizzaAppEpic } from "../PizzaAppStore";
import { dispatch } from 'rxjs/internal/observable/pairs';

export const AddToppingEpic: IPizzaAppEpic<IAddPizzaToppingAction> = (action$, state$) =>
    action$.pipe(filter(a => a.type === 'ADD_PIZZA_TOPPINGS'),
        mergeMap(action => {
            const pizzaSize = state$.value.orderPage.pizzaSize;
            const extraToppings = state$.value.orderPage.extraToppings;

            let toppings: extraTopping[] = extraToppings;
            if (toppings.includes(action.payload)) {
                toppings = toppings.filter(f => f != action.payload);
            } else {
                switch (pizzaSize) {
                    case 'Small':
                        if (toppings.length === 5) return exceedLimitOfToppings(5, pizzaSize)
                    case 'Medium':
                        if (toppings.length === 7) return exceedLimitOfToppings(7, pizzaSize)
                    case 'Large':
                        if (toppings.length === 9) return exceedLimitOfToppings(9, pizzaSize)
                }
                toppings.push(action.payload);
            }
            return of(addedPizzaToppings(toppings));
        })
    );

const exceedLimitOfToppings = (num: number, pizzaSize: pizzaSize): Observable<never> => {
    // call custom dialog if there is still time.
    alert('You are allowed to select ' + num + ' toppings only for ' + pizzaSize + ' pizzas.');
    return empty();
}