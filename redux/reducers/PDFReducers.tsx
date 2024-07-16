import { PDFItem } from '../../constants/utils';
import { RESET_PDFS, SET_PDFS } from '../actions/PDFActions';

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
        case RESET_PDFS:
            return initialState;
        default:
            return state;
    }
};

export default PDFReducer;
