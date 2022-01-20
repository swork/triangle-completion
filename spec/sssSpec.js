var sss = require('../dist/sss');
var solve_a_b_c = sss.solve_a_b_c;

describe('solve_a_b_c', () => {
    it('is a function', () => {
        expect(typeof solve_a_b_c).toBe('function');
    });

    it('throws on any value missing', () => {
        expect(() => { solve_a_b_c({ }); }).toThrow();
        expect(() => { solve_a_b_c({ A:1 }); }).toThrow();
        expect(() => { solve_a_b_c({ B:1 }); }).toThrow();
        expect(() => { solve_a_b_c({ C:1 }); }).toThrow();
        expect(() => { solve_a_b_c({ A:1, B:2 }); }).toThrow();
        expect(() => { solve_a_b_c({ B:2, C:3 }); }).toThrow();
        expect(() => { solve_a_b_c({ A:1, C:3 }); }).toThrow();
    });
});
