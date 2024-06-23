// Action types (constants) defined for setting items and selected item
export const SET_ITEMS = 'SET_ITEMS';
export const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM';

// Action creator function for setting items
export const setItems = (items) => ({
  type: SET_ITEMS, // Action type indicating setting items
  payload: items, // Data payload (items array) to be passed with the action
});

// Action creator function for setting selected item
export const setSelectedItem = (item) => ({
  type: SET_SELECTED_ITEM, // Action type indicating setting selected item
  payload: item, // Data payload (selected item object) to be passed with the action
});
