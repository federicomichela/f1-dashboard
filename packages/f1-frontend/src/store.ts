import { configureStore } from '@reduxjs/toolkit';
import f1Slice from './slices/f1Slice'; // Import the slice we'll create next

export const store = configureStore({
    reducer: {
        f1: f1Slice, // Add the f1 slice to the store
    },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
