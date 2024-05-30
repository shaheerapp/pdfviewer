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

const PDF_LISTS_TURKISH = [
    {
        id: 1,
        title: 'Isa Ile Yuruyus - GÜN 0 ÖNSÖZ',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%200%20O%CC%88NSO%CC%88Z.pdf?alt=media&token=7f0e6ac8-2fff-4590-85e6-e191ea3af34a',
        markAsRead: false,
    },
    {
        id: 2,
        title: 'Isa Ile Yuruyus - GÜN 1',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%201.pdf?alt=media&token=87deed2b-761e-4ce2-bc93-5bec94ad527e',
        markAsRead: false,
    },
    {
        id: 3,
        title: 'Isa Ile Yuruyus - GÜN 2',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%202.pdf?alt=media&token=8998c700-f5b2-41be-9f53-4a98b01bf80b',
        markAsRead: false,
    },
    {
        id: 4,
        title: 'Isa Ile Yuruyus - GÜN 3',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%203.pdf?alt=media&token=5f6cd112-901b-443d-8a25-ac4047e63ec2',
        markAsRead: false,
    },
    {
        id: 5,
        title: 'Isa Ile Yuruyus - GÜN 4',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%204.pdf?alt=media&token=ecffadaa-c340-46a5-8ed0-55e93fe27f56',
        markAsRead: false,
    },
    {
        id: 6,
        title: 'Isa Ile Yuruyus - GÜN 5',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%205.pdf?alt=media&token=d4798b85-6b2c-43a5-beec-04b25abf13fc',
        markAsRead: false,
    },
    {
        id: 7,
        title: 'Isa Ile Yuruyus - GÜN 6',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%206.pdf?alt=media&token=5412d3fc-49fd-47af-812e-28abf2ec8024',
        markAsRead: false,
    },
    {
        id: 8,
        title: 'Isa Ile Yuruyus - GÜN 7',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%207.pdf?alt=media&token=394e98e9-073d-4181-a946-eac8297cda66',
        markAsRead: false,
    },
    {
        id: 9,
        title: 'Isa Ile Yuruyus - GÜN 8',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%208.pdf?alt=media&token=5492ebb0-e386-4c68-ae5a-5f92153d9cf7',
        markAsRead: false,
    },
    {
        id: 10,
        title: 'Isa Ile Yuruyus - GÜN 9',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%209.pdf?alt=media&token=842ad1f4-43a4-4726-8bce-09afee8684a4',
        markAsRead: false,
    },
    {
        id: 11,
        title: 'Isa Ile Yuruyus - GÜN 10',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2010.pdf?alt=media&token=f59c592b-4ca4-4696-b9d4-e8f062b45a5b',
        markAsRead: false,
    },
    {
        id: 12,
        title: 'Isa Ile Yuruyus - GÜN 11',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2011.pdf?alt=media&token=d1514e72-0d19-4de2-a82d-22f142eab007',
        markAsRead: false,
    },
    {
        id: 13,
        title: 'Isa Ile Yuruyus - GÜN 12',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2012.pdf?alt=media&token=0d8d376a-c087-4cba-a54b-51f7b53073fb',
        markAsRead: false,
    },
    {
        id: 14,
        title: 'Isa Ile Yuruyus - GÜN 13',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2013.pdf?alt=media&token=c668f39b-c858-4c0d-ab0e-05a40e570ec8',
        markAsRead: false,
    },
    {
        id: 15,
        title: 'Isa Ile Yuruyus - GÜN 14',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2014.pdf?alt=media&token=57129686-932d-4592-96be-5fea723a6850',
        markAsRead: false,
    },
    {
        id: 16,
        title: 'Isa Ile Yuruyus - GÜN 15',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2015.pdf?alt=media&token=fbe1144d-c48d-4462-bae0-711849e134ac',
        markAsRead: false,
    },
    {
        id: 17,
        title: 'Isa Ile Yuruyus - GÜN 16',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2016.pdf?alt=media&token=b0330423-fd51-431c-a034-e31e0b2111c2',
        markAsRead: false,
    },
    {
        id: 18,
        title: 'Isa Ile Yuruyus - GÜN 17',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2017.pdf?alt=media&token=7b489f75-676c-414b-8aec-a97ce45ec8cf',
        markAsRead: false,
    },
    {
        id: 19,
        title: 'Isa Ile Yuruyus - GÜN 18',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2018.pdf?alt=media&token=4a475954-4179-4ece-b550-c5e7f5ee3da2',
        markAsRead: false,
    },
    {
        id: 20,
        title: 'Isa Ile Yuruyus - GÜN 19',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2019.pdf?alt=media&token=bfd63fa4-6f8a-45a7-a4da-50441e3a9d5f',
        markAsRead: false,
    },
    {
        id: 21,
        title: 'Isa Ile Yuruyus - GÜN 20',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2020.pdf?alt=media&token=4944da04-6da5-489f-87b0-bc52929ec467',
        markAsRead: false,
    },
    {
        id: 22,
        title: 'Isa Ile Yuruyus - GÜN 21',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2021.pdf?alt=media&token=83e6a603-6482-4b1c-8e9a-719432fbed91',
        markAsRead: false,
    },
    {
        id: 23,
        title: 'Isa Ile Yuruyus - GÜN 22',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2022.pdf?alt=media&token=fcb5d9f3-cb40-4266-8e3f-5b297b104e93',
        markAsRead: false,
    },
    {
        id: 24,
        title: 'Isa Ile Yuruyus - GÜN 23',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2023.pdf?alt=media&token=96fa1075-a2f1-4d69-b8c3-a9512c0c6a3d',
        markAsRead: false,
    },
    {
        id: 25,
        title: 'Isa Ile Yuruyus - GÜN 24',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2024.pdf?alt=media&token=ef67a401-c909-465b-bf71-59595e36c85f',
        markAsRead: false,
    },
    {
        id: 26,
        title: 'Isa Ile Yuruyus - GÜN 25',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2025.pdf?alt=media&token=98d1abb0-9415-4833-a1e0-2fc23b0316e7',
        markAsRead: false,
    },
    {
        id: 27,
        title: 'Isa Ile Yuruyus - GÜN 26',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2026.pdf?alt=media&token=08227d98-a0f6-4770-8e1d-68c21214e46e',
        markAsRead: false,
    },
    {
        id: 28,
        title: 'Isa Ile Yuruyus - GÜN 27',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2027.pdf?alt=media&token=b186efc6-0614-4abb-b2b5-3c502835b136',
        markAsRead: false,
    },
    {
        id: 29,
        title: 'Isa Ile Yuruyus - GÜN 28',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2028.pdf?alt=media&token=58cda193-e7ed-4c30-9fef-949c7ec890c8',
        markAsRead: false,
    },
    {
        id: 30,
        title: 'Isa Ile Yuruyus - GÜN 29',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2029.pdf?alt=media&token=5bea6e9f-e115-467d-b957-3ff93af2baf6',
        markAsRead: false,
    },
    {
        id: 31,
        title: 'Isa Ile Yuruyus - GÜN 30',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2030.pdf?alt=media&token=3ef68e18-cef2-4282-aa1c-a45a60aa0021',
        markAsRead: false,
    },
    {
        id: 32,
        title: 'Isa Ile Yuruyus - GÜN 31',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2031.pdf?alt=media&token=425fde81-2fac-4694-bdad-5fdc6604ee28',
        markAsRead: false,
    },
    {
        id: 33,
        title: 'Isa Ile Yuruyus - GÜN 32',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2032.pdf?alt=media&token=577eba2a-ce31-4b5f-bf6a-af3153223d11',
        markAsRead: false,
    },
    {
        id: 34,
        title: 'Isa Ile Yuruyus - GÜN 33',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2033.pdf?alt=media&token=a0652394-d19e-43ae-ace0-61809d554c93',
        markAsRead: false,
    },
    {
        id: 35,
        title: 'Isa Ile Yuruyus - GÜN 34',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2034.pdf?alt=media&token=f24212c3-b7d8-44b0-8038-9d83c5741392',
        markAsRead: false,
    },
    {
        id: 36,
        title: 'Isa Ile Yuruyus - GÜN 35',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2035.pdf?alt=media&token=18e40ff8-c296-4b81-bda9-f858928536f5',
        markAsRead: false,
    },
    {
        id: 37,
        title: 'Isa Ile Yuruyus - GÜN 36',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2036.pdf?alt=media&token=7d2878fd-94e9-41de-ae21-ba49ae187fa4',
        markAsRead: false,
    },
    {
        id: 38,
        title: 'Isa Ile Yuruyus - GÜN 37',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2037.pdf?alt=media&token=ba0b801e-0fc7-4f27-bbc2-a336f448978e',
        markAsRead: false,
    },
    {
        id: 39,
        title: 'Isa Ile Yuruyus - GÜN 38',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2038.pdf?alt=media&token=bfdcdc7a-bc00-4e77-a339-22b0961144ee',
        markAsRead: false,
    },
    {
        id: 40,
        title: 'Isa Ile Yuruyus - GÜN 39',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2039.pdf?alt=media&token=5a96edde-6fa3-45a0-bbe6-9539874b6406',
        markAsRead: false,
    },
    {
        id: 41,
        title: 'Isa Ile Yuruyus - GÜN 40 EK',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2040%20EK.pdf?alt=media&token=6d97e138-662d-4f2c-8f1e-108ff407e7d8',
        markAsRead: false,
    },
    {
        id: 42,
        title: 'Isa Ile Yuruyus - GÜN 40',
        pdf: 'https://firebasestorage.googleapis.com/v0/b/pdfviewerapp-1e3f4.appspot.com/o/Isa%20Ile%20Yuruyus%20-%20GU%CC%88N%2040.pdf?alt=media&token=460096ed-8436-41b7-882b-64f7efdfbf65',
        markAsRead: false,
    },
];

export {
    PDF_LISTS,
    PDF_LISTS_TURKISH,
};
