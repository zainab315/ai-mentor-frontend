import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import productReducer from './features/product/productSlice'; 
import messageReducer from './features/openAI/messageSlice';
import chatboxReducer from './features/chatBox/chatBox';  
import firstMessageReducer  from './features/firstMessageSlice/firstMessageSlice';
import dataTransferReducer from './features/dto/dataTransferSlice' 
import topicReducer from './features/startTopic/topicSlice' 
import scrollReducer from './features/scrollSlice/scrollSlice'
export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
            product: productReducer, 
            message: messageReducer,
            chatbox:chatboxReducer,
            dto:dataTransferReducer, 
            firstMessage:firstMessageReducer, 
            startTopic : topicReducer, 
            scrollReference:scrollReducer
        }
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];