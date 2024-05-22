export type PDFItem = {
    id: any;
    title: any;
    pdf: any;
    markAsRead: any;
};


const PDF_LISTS = [
    {
        id: 1,
        title: 'Sample PDF 1',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/same.pdf?alt=media&token=41cedb4c-fd66-4cbf-a847-7fcc68a98fbb',
        markAsRead: false,
    },
    {
        id: 2,
        title: 'Sample PDF 2',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/same.pdf?alt=media&token=41cedb4c-fd66-4cbf-a847-7fcc68a98fbb',
        markAsRead: false,
    },
    {
        id: 3,
        title: 'Sample PDF 3',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/same.pdf?alt=media&token=41cedb4c-fd66-4cbf-a847-7fcc68a98fbb',
        markAsRead: false,
    },
];

export {
    PDF_LISTS,
};
