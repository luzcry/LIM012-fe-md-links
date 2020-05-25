import mock from 'mock-fs';
import {
  directory,
  markdown,
  getMD,
  mdLinkExtractor,
  file,
  mdLinksValidate,
  mdDirectoryExtractor,
} from '../src/utilities';

import {
  MD_EXTRACTOR_RESULT,
  MD_EXTRACTOR_VALIDATED,
} from './mocks/utilitiesResults';

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

describe('Test funcion directory', () => {
  it('debería ser una función', () => {
    expect(typeof directory).toBe('function');
  });

  it('debería devolver falso para un archivo', () => {
    expect(directory('./mocks/node.md')).toBe(false);
  });

  it('debería devolver verdadero para una carpeta', () => {
    expect(directory('./mocks')).toBe(true);
  });
});

describe('Test getMD', () => {
  it('debería ser una función', () => {
    expect(typeof getMD).toBe('function');
  });

  it('debería devolver true para un archivo md', () => {
    expect(getMD('./mocks/node.md')).toBe(true);
  });

  it('debería devolver falso para un directorio', () => {
    expect(getMD('./mocks/')).toBe(false);
  });
});

describe('Test mdDirectoryExtractor', () => {
  it('debería devolver todos los archivos md sin validar', () => {
    expect(mdDirectoryExtractor('./mocks/', { validate: false })).toStrictEqual(
      MD_EXTRACTOR_RESULT
    );
  });

  it('debería devolver todos los archivos md validando', () => {
    return mdDirectoryExtractor('./mocks/', { validate: true }).then(
      (Response) => {
        expect(Response).toStrictEqual(MD_EXTRACTOR_VALIDATED);
      }
    );
  });
});
