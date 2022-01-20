let common = require('../dist/common');

describe('radiansToDegrees', () => {
    it('is a function', () => {
        expect(typeof common.radiansToDegrees).toEqual('function');
    });

    it('minimally functions', () => {
        expect(common.radiansToDegrees(Math.PI/2)).toBeCloseTo(90);
    });
});

describe('degreesToRadians', () => {
    it('is a function', () => {
        expect(typeof common.degreesToRadians).toEqual('function');
    });

    it('minimally functions', () => {
        expect(common.degreesToRadians(90)).toBeCloseTo(Math.PI/2);
    });
});

describe('rotate', () => {
    it('is a function', () => {
        expect(typeof common.rotate).toEqual('function');
    });

    it('minimally functions', () => {
        let t = {A:1, alpha: 10,
                 B: 2, beta: 20,
                 C: 3, gamma: 30
                };
        var temp = {...t};  // deep-enough copy
        var r = common.rotate(temp, 1);
        expect(r.gamma).toEqual(t.beta);
        expect(r.alpha).toEqual(t.gamma);
        expect(r.beta).toEqual(t.alpha);
        expect(r.B).toEqual(t.A);
        expect(r.C).toEqual(t.B);
        expect(r.A).toEqual(t.C);
    });
})
