import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../reducers/UserReducer';
import PDFReducer from '../reducers/PDFReducers';


export default configureStore({
    reducer: {
        user: UserReducer,
        pdfs: PDFReducer,
    },
});
