import { filter, mergeMap, switchMap, map } from 'rxjs/operators';
import { empty, merge } from 'rxjs';
import { ISetOrderAction, ISimpleAction } from "../actions/OrderActions";
import { IPizzaAppEpic } from "../PizzaAppStore";

export const SendOrderEpic: IPizzaAppEpic<ISimpleAction> = (action$, state$) =>
    action$.pipe(filter(a => a.type === 'SEND_ORDER'),
        mergeMap(() => {
            
            return empty();
        })
    );