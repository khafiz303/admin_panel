import { createStore  , combineReducers , compose , applyMiddleware} from 'redux';
import { thunk as ReduxThunk } from 'redux-thunk';
// import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit'

// import heroes from '../reducers/heroes';
import heroes from '../components/heroesList/heroesSlice';
// import filters from '../reducers/filters';
import filterHeroes from '../components/heroesFilters/heroesFilterSlice';

const stringMiddleware =()=> (next)=>(action)=>{
    if(typeof action === 'string'){
        return next({
            type : action
        })
    }
    return next(action)
}

// const enhancer =(createStore) =>(...args)=>{
//     const store = createStore(...args)
 
//     const oldDispatch = store.dispatch
//     store.dispatch = (action) => {
//         if(typeof action === 'string'){
//             return oldDispatch({
//                 type : action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store
// }

// const store = createStore(
//                     combineReducers({heroes : heroes , filters}),
//                     compose(
//                         applyMiddleware(ReduxThunk , stringMiddleware),
//                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

//                     )
                    // compose(
                    //     enhancer , 
                    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

                    // )
                    // );

const store = configureStore({
    reducer : {heroes,  filterHeroes},
    middleware : getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools : process.env.NODE_ENV !== 'production',
})

export default store;
