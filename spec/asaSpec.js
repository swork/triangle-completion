let asa = require('../dist/asa');
let solve_alpha_b_gamma = asa.solve_alpha_b_gamma;

describe('solve_alpha_b_gamma', () => {
    it('is a function', () => {
        expect(typeof solve_alpha_b_gamma).toBe('function');
    });

    it('throws on any value missing', () => {
        expect(() => { solve_alpha_b_gamma({ }); }).toThrow();
        expect(() => { solve_alpha_b_gamma({ alpha:1 }); }).toThrow();
        expect(() => { solve_alpha_b_gamma({ gamma:1 }); }).toThrow();
        expect(() => { solve_alpha_b_gamma({ B:1 }); }).toThrow();
        expect(() => { solve_alpha_b_gamma({ alpha:1, B:3 }); }).toThrow();
        expect(() => { solve_alpha_b_gamma({ gamma:2, B:3 }); }).toThrow();
        expect(() => { solve_alpha_b_gamma({ alpha:1, gamma:2 }); }).toThrow();
    });
});
