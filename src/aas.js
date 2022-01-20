import { TriangleError, degreesToRadians } from './common';

// AAS
export function solve_gamma_alpha_c(ins) {
    if (ins.gamma === null || ins.alpha === null || ins.C === null) {
        ins.beta = ins.A = ins.B = null;
        return ins;
    }
    if ( !(ins.gamma && ins.alpha && ins.C)) {
        throw new TriangleError(`Bad AAS in gamma:${ins.gamma}, alpha:${ins.alpha}, C:${ins.C}`);
    }
    let known_a_sum = ins.alpha + ins.gamma;
    if (known_a_sum >= 180) {
        throw new TriangleError(`Not a triangle ${JSON.stringify(ins)}`);
    }
    ins.beta = 180 - known_a_sum;
    let sin_gamma = Math.sin(degreesToRadians(ins.gamma));
    ins.A = (ins.C * Math.sin(degreesToRadians(ins.alpha))) / sin_gamma;
    ins.B = (ins.C * Math.sin(degreesToRadians(ins.beta))) / sin_gamma;
    return ins;
}
