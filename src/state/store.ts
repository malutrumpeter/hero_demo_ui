import {createStore} from 'redux';
import {reducer} from "./reducer.ts";


export const store = createStore(reducer);
