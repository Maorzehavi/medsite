import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from './slices/UsersSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer
    }
});

export * from './thunks/userThunks';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
