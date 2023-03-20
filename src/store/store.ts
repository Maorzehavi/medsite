import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import rootApi from './apis/rootApi';

export const store = configureStore({
    reducer: {
        [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( rootApi.middleware),

});

setupListeners(store.dispatch);

export {useFetchAlbumsQuery,useAddAlbumMutation} from './apis/albumApi';
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
