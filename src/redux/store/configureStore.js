import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middleware = [thunk];
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);
export default store;

// export default function configureStore(initialState) {
//     return createStore(
//         rootReducer,
//         initialState,
//         applyMiddleware(thunk)
//     );
// }

// import { createStore } from 'redux';
// import allReducers from '../reducers/index'

// const store = createStore(allReducers);
// export default store;