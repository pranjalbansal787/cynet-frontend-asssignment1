// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './reducers'; // Import your specific reducer(s)

// Configure the Redux store with combineReducers and middleware
const store = configureStore({
  reducer: {
    items: itemsReducer, // Assuming 'itemsReducer' handles 'items' state
    // Add more reducers here if your app has more state slices
  },
});

export default store;
