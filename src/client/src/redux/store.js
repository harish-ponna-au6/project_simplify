import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { adminReducer } from "./reducers/adminReducer";
import { customerReducer } from "./reducers/clientReducer";
import { editorReducer } from "./reducers/editorReducer";
import { commonReducer } from "./reducers/commonReducer";

const rootReducer = combineReducers({
  adminState: adminReducer,
  customerState: customerReducer,
  editorState: editorReducer,
  commonState: commonReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export { store };
