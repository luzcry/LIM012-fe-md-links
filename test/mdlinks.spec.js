import API from '/md-links';
import mdLinkExtractor from '../API.js';
const expect = global.expect;

describe('mdLinkExtractor', () => {
    it("debería ser una función"), () => {
        expect(typeof mdLinkExtractor).toBe('function');
    };
    it("debería devolver un arreglo de objetos"), () => {
        expect.assertions(1);
        return mdlinks("other/node.md", {validat: true}).then((Response) => {
            expect(Response).toEqual(
                [
                    {
                        file: "other/node.md",
                        href: "https://es.wikipedia.org/wiki/Markdown",
                        text: "wiki markdown",
                        status: 200, 
                        statusText: "ok"

                    }
                ]
            )
        })
    };
});
test('el fetch falla si el url no conduce a una HTTP válida', () => {
    expect.assertions(1);
    return fetchData().catch(e => expect(e).toMatch('error'));
});
describe('verificar la ruta absoluta/relativa', () => {

})

Test('debe verificar si el ejecutable devuelve un array de objetos')

test('debe verificar si el  archivo es un md')