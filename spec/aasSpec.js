let aas = require('../dist/aas');
let solve_gamma_alpha_c = aas.solve_gamma_alpha_c;

describe('solve_gamma_alpha_c', () => {
    it('is a function', () => {
        expect(typeof solve_gamma_alpha_c).toBe('function');
    });

    it('throws on any value missing', () => {
        expect(() => { solve_gamma_alpha_c({ }); }).toThrow();
        expect(() => { solve_gamma_alpha_c({ alpha:10 }); }).toThrow();
        expect(() => { solve_gamma_alpha_c({ gamma:10 }); }).toThrow();
        expect(() => { solve_gamma_alpha_c({ C:1 }); }).toThrow();
        expect(() => { solve_gamma_alpha_c({ alpha:10, gamma:2 }); }).toThrow();
        expect(() => { solve_gamma_alpha_c({ gamma:2, C:3 }); }).toThrow();
        expect(() => { solve_gamma_alpha_c({ alpha:1, C:3 }); }).toThrow();
    });
});
