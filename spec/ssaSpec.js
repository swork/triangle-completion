let ssa = require('../dist/ssa');
let solve_a_b_alpha = ssa.solve_a_b_alpha;

describe('solve_a_b_alpha', () => {
    it('is a function', () => {
        expect(typeof solve_a_b_alpha).toBe('function');
    });

    it('throws on any value missing', () => {
        expect(() => { solve_a_b_alpha({ }); }).toThrow();
        expect(() => { solve_a_b_alpha({ A:1 }); }).toThrow();
        expect(() => { solve_a_b_alpha({ B:1 }); }).toThrow();
        expect(() => { solve_a_b_alpha({ alpha:1 }); }).toThrow();
        expect(() => { solve_a_b_alpha({ A:1, B:3 }); }).toThrow();
        expect(() => { solve_a_b_alpha({ B:3, alpha: 2 }); }).toThrow();
        expect(() => { solve_a_b_alpha({ A:1, alpha:2 }); }).toThrow();
    });
});
