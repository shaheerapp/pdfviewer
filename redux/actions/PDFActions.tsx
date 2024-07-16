export const SET_PDFS = 'SET_PDFS';
export const RESET_PDFS = 'RESET_PDFS';


export const setPDFs = (pdfs: any) => ({
    type: SET_PDFS,
    payload: pdfs,
});

export const resetPdfs = () => ({
    type: RESET_PDFS,
});
