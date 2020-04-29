import API from '/md-links';
import mdLinkExtractor from '../API.js';
const expect = global.expect;

describe('mdLinkExtractor', () => {
    it("debería ser una función"), () => {
        expect(typeof mdLinkExtractor).toBe('function');
    };
    it("debería devolver un arreglo"), () => {
        expect([...mdLinkExtractor(markdown)]).toStrictEqual(links);
    };
});
test('el fetch falla si el url no conduce a una HTTP válida', () => {
    expect.assertions(1);
    return fetchData().catch(e => expect(e).toMatch('error'));
});
describe('verificar la ruta absoluta/relativa', () => {

})

TextDecoderStream('debe verificar si el ejecutable devuelve un array de objetos')