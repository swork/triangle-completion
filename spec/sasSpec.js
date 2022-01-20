var sas = require('../dist/sas');
var solve_a_gamma_b = sas.solve_a_gamma_b;

describe('solve_a_gamma_b', () => {
        it('is a function', () => {
        expect(typeof solve_a_gamma_b).toBe('function');
    });

    it('throws on any value missing', () => {
        expect(() => { solve_a_gamma_b({ }); }).toThrow();
        expect(() => { solve_a_gamma_b({ A:1 }); }).toThrow();
        expect(() => { solve_a_gamma_b({ gamma:1 }); }).toThrow();
        expect(() => { solve_a_gamma_b({ B:1 }); }).toThrow();
        expect(() => { solve_a_gamma_b({ A:1, gamma:2 }); }).toThrow();
        expect(() => { solve_a_gamma_b({ gamma:2, B:3 }); }).toThrow();
        expect(() => { solve_a_gamma_b({ A:1, B:3 }); }).toThrow();
    });
});
