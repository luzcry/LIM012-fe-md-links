export const MD_EXTRACTOR_RESULT = [
  {
    href: 'https://www.npmjs.com/package/valid-url',
    path: './mocks//node.md',
    text: 'Documentación node sobre validar urls',
  },
  {
    href: 'https://www.npmjs.com/package/valid-url',
    path: './mocks//novalidate.md',
    text: 'Documentación node sobre validar urls',
  },
];

export const MD_EXTRACTOR_VALIDATED = [
  {
    href: 'https://www.npmjs.com/package/valid-url',
    ok: 'fail',
    path: './mocks//node.md',
    status: '404',
    text: 'Documentación node sobre validar urls',
  },
  {
    href: 'https://www.npmjs.com/package/valid-url',
    ok: 'fail',
    path: './mocks//novalidate.md',
    status: '404',
    text: 'Documentación node sobre validar urls',
  },
];
