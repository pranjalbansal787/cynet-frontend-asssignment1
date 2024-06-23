// Import action types (constants) for handling actions
import { SET_ITEMS, SET_SELECTED_ITEM } from './actions';

// Define initial state for the reducer
const initialState = {
  items: [],         // Array to hold items data
  selectedItem: null // Holds currently selected item, starts as null
};

// Reducer function that handles state updates based on dispatched actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Case to handle setting items in the state
    case SET_ITEMS:
      return { ...state, items: action.payload }; // Update items array with new data from action payload
    
    // Case to handle setting the selected item in the state
    case SET_SELECTED_ITEM:
      return { ...state, selectedItem: action.payload }; // Update selectedItem with new item from action payload
    
    // Default case returns the current state if action type is unknown
    default:
      return state; // Return unchanged state
  }
};

// Export the reducer function as default export
export default reducer;
