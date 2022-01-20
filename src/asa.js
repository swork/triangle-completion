import { TriangleError, degreesToRadians } from './common';

// ASA
export function solve_alpha_b_gamma(ins) {
    if (ins.alpha === null || ins.B === null || ins.gamma === null) {
        ins.A = ins.beta = ins.C = null;
        return ins;
    }
    if ( !(ins.alpha && ins.B && ins.gamma)) {
        throw new TriangleError(`Bad ASA in alpha:${ins.alpha}, B:${ins.B}, gamma:${ins.gamma}`);
    }
    let known_a_sum = ins.alpha + ins.gamma;
    if (known_a_sum >= 180) {
        throw new TriangleError(`Not a triangle ${JSON.stringify(ins)}`);
    }
    ins.beta = 180 - known_a_sum;
    let sin_gamma = Math.sin(degreesToRadians(ins.gamma));
    ins.C = (ins.B * sin_gamma) / Math.sin(degreesToRadians(ins.beta));
    ins.A = (ins.C * Math.sin(degreesToRadians(ins.alpha))) / sin_gamma;
    return ins;
}
