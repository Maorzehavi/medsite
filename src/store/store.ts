import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from './slices/UsersSlice';
import {setupListeners} from '@reduxjs/toolkit/query';
import {albumApi} from './apis/albumApi';
import { userApi } from './apis/userApi';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [userApi.reducerPath]: userApi.reducer,
        [albumApi.reducerPath]: albumApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(albumApi.middleware, userApi.middleware),

});

setupListeners(store.dispatch);

export * from './thunks/userThunks';
export {useFetchAlbumsQuery,useAddAlbumMutation} from './apis/albumApi';
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
