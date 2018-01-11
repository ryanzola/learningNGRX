import * as actions from "./pizza.actions";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store/src/selector";

export interface Pizza {
  id: string;
  size: string;
}

export const pizzaAdapter = createEntityAdapter<Pizza>();
export interface State extends EntityState<Pizza> {}

const defaultPizza = {
  ids: ["123"],
  entities: {
    "123": {
      id: "123",
      size: "small"
    }
  }
};

export const initialState: State = pizzaAdapter.getInitialState(defaultPizza);

export function pizzaReducer(
  state: State = initialState,
  action: actions.PizzaActions
) {
  switch (action.type) {
    case actions.CREATE:
      return pizzaAdapter.addOne(action.pizza, state);
    case actions.UPDATE:
      return pizzaAdapter.updateOne(
        {
          id: action.id,
          changes: action.changes
        },
        state
      );
    case actions.DELETE:
      return pizzaAdapter.removeOne(action.id, state);
    default:
      return state;
  }
}

export const getPizzaState = createFeatureSelector<State>("pizza");

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = pizzaAdapter.getSelectors(getPizzaState);
