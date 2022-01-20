import { TriangleError, radiansToDegrees, degreesToRadians, rotate } from './common';
import { solve_a_gamma_b } from './sas';

// SSA can have two solutions
export function solve_a_b_alpha(ins, skip_alt) {
    if (ins.A === null || ins.B === null || ins.alpha === null) {
        ins.C = ins.beta = ins.gamma = null;
        return ins;
    }
    if ( !(ins.A && ins.B && ins.alpha)) {
        throw new TriangleError(`Bad SSA in A:${ins.A}, B:${ins.B}, alpha:${ins.alpha}`);
    }
    let sin_alpha = Math.sin(degreesToRadians(ins.alpha));
    ins.beta = radiansToDegrees(Math.asin((ins.B * sin_alpha) / ins.A));
    ins.gamma = 180 - (ins.alpha + ins.beta);
    ins.C = (ins.B * Math.sin(degreesToRadians(ins.gamma))) / Math.sin(degreesToRadians(ins.beta));
    if (skip_alt === undefined && (ins.alpha > 90 || ins.beta > 90 || ins.gamma > 90)) {
        ins.alt = {...ins};
        if (ins.alpha > 90) {
            let diff = ins.alpha - 90;
            ins.alpha = 90 - diff;
            delete ins.C;
            delete ins.beta;
            delete ins.gamma;
            return solve_a_b_alpha(ins, true);
        } else if (ins.beta > 90) {
            let diff = ins.beta - 90;
            ins.beta = 90 - diff;
            delete ins.A;
            delete ins.alpha;
            delete ins.gamma;
            return rotate(solve_a_b_alpha(rotate(ins, -1), true), 1);
        } else {
            let diff = ins.gamma - 90;
            ins.gamma = 90 - diff;
            delete ins.B;
            delete ins.alpha;
            delete ins.beta;
            return rotate(solve_a_b_alpha(rotate(ins, 1), true), -1);
        }
    } else {
        return solve_a_gamma_b(ins);
    }
}
