import mock from 'mock-fs';

import {
  NODE_MD_RESULT,
  NO_VALIDATE_RESULT,
  DIRECTORY_RESULT_NO_VALIDATE,
} from './mocks/mdResults';

import mdLinks from '../src/api';

const expect = global.expect;

beforeEach(function () {
  mock({
    './mocks': {
      'node.md':
        '[Documentación node sobre validar urls](https://www.npmjs.com/package/valid-url)',
      'empty.md': '',
      'novalidate.md':
        '[Documentación node sobre validar urls](https://www.npmjs.com/package/valid-url)',
    },
  });
});

afterEach(mock.restore);

describe('mdLinks Api tests', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('debería devolver un arreglo vacio', () => {
    return mdLinks('./mocks/empty.md', { validate: true }).then((Response) => {
      expect(Response).toEqual([]);
    });
  });

  it('debería devolver un arreglo con 1 resultado validado', () => {
    return mdLinks('./mocks/node.md', { validate: true }).then((Response) => {
      expect(Response).toStrictEqual(NODE_MD_RESULT);
    });
  });

  it('debería devolver un arreglo con 1 resultado sin validar', () => {
    return mdLinks('./mocks/node.md', { validate: false }).then((Response) => {
      expect(Response).toStrictEqual(NO_VALIDATE_RESULT);
    });
  });

  it('debería devolver un arreglo con 2 resultado sin validar', () => {
    return mdLinks('./mocks/', { validate: false }).then((Response) => {
      expect(Response).toStrictEqual(DIRECTORY_RESULT_NO_VALIDATE);
    });
  });

  it('debería devolver un error', () => {
    return expect(mdLinks('./mocks/dir', { validate: false })).rejects.toThrow(
      Error("ENOENT: no such file or directory, lstat './mocks/dir'")
    );
  });
});
