import { filter, mergeMap, switchMap, map } from 'rxjs/operators';
import { empty, merge } from 'rxjs';
import { ISetOrderAction, ISimpleAction } from "../actions/OrderActions";
import { IPizzaAppEpic } from "../PizzaAppStore";

export const jumpHomeEpic: IPizzaAppEpic<ISimpleAction> = (action$, state$) =>
    action$.pipe(filter(a => a.type === 'JUMP_HOME'),
        mergeMap(() => {
            
            return empty();
        })
    );