import { PDFItem } from '../../constants/utils';
import { SET_PDFS } from '../actions/PDFActions';

const initialState = {
    pdfs: [] as PDFItem[],
};

const PDFReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_PDFS:
            return {
                ...state,
                pdfs: action.payload,
            };
        default:
            return state;
    }
};

export default PDFReducer;
