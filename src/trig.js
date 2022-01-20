// Solve triangles:
// {
//     alpha: 1,
//     beta: 2
//     gamma: 3,
//     A: 4,
//     B: 5,
//     C:
// }
//
// Provide three parameters sufficient to specify a triangle.
// solveTriangle(spec) will return an object (the same object, mutated) with all
// six parameters specified.

import { TriangleError,
         degreesToRadians,
         radiansToDegrees,
         rotate } from './common';
import { solve_gamma_alpha_c } from './aas';
import { solve_alpha_b_gamma } from './asa';
import { solve_a_gamma_b } from './sas';
import { solve_a_b_alpha } from './ssa';
import { solve_a_b_c } from './sss';

export {
    TriangleError,
    degreesToRadians,
    radiansToDegrees,
    rotate,
    solve_gamma_alpha_c,
    solve_alpha_b_gamma,
    solve_a_gamma_b,
    solve_a_b_alpha,
    solve_a_b_c
};

export default solveTriangle;

const have = (ins, key) => {
    if (ins.hasOwnProperty(key) && ins[key] !== undefined) {
        return 1;
    }
    return 0;
};

export function delete_undefs(ins) {
    Object.keys(ins).forEach( key => {
        if (ins[key] === undefined) {
            delete ins[key];
        } else if (key === 'alt') {
            delete_undefs(ins.alt);
        }
    });
    return ins;
}

function clean_intermediates(ins) {
    delete ins.A_squared;
    delete ins.B_squared;
    delete ins.C_squared;
    if (ins.alt !== undefined) {
        clean_intermediates(ins.alt);
    }
    return delete_undefs(ins);
}

// Swap B and C
export function mirror_a(ins) {
    let old_c = ins.C;
    ins.C = ins.B;
    ins.B = old_c;

    let old_gamma = ins.gamma;
    ins.gamma = ins.beta;
    ins.beta = old_gamma;

    let old_c2 = ins.C_squared;
    ins.C_squared = ins.B_squared;
    ins.B_squared = old_c2;

    return ins;
}

// Swap A and C
export function mirror_b(ins) {
    let old_c = ins.C;
    ins.C = ins.A;
    ins.A = old_c;

    let old_gamma = ins.gamma;
    ins.gamma = ins.alpha;
    ins.alpha = old_gamma;

    let old_c2 = ins.C_squared;
    ins.C_squared = ins.A_squared;
    ins.A_squared = old_c2;

    return ins;
}

// Swap A and B
export function mirror_c(ins) {
    let old_B = ins.B;
    ins.B = ins.A;
    ins.A = old_B;

    let old_beta = ins.beta;
    ins.beta = ins.alpha;
    ins.alpha = old_beta;

    let old_b2 = ins.B_squared;
    ins.B_squared = ins.A_squared;
    ins.A_squared = old_b2;

    return ins;
}

export function solveTriangle(ins) {
    // Here the triangle is sides A, B, C opposite angles alpha, beta, gamma.
    let sides_count = have(ins, 'A') + have(ins, 'B') + have(ins, 'C');
    let angles_count = have(ins, 'alpha') + have(ins, 'beta') + have(ins, 'gamma');

    if (sides_count === 3) {
        return clean_intermediates(solve_a_b_c(ins));
    } else if (sides_count > 1 && angles_count) {
        if (ins.B) {
            if (ins.gamma) {
                if (ins.A) {
                    return clean_intermediates(solve_a_gamma_b(ins));
                } else {
                    return clean_intermediates(mirror_b(solve_a_b_alpha(mirror_b(ins))));
                }
            } else if (ins.alpha) {
                if (ins.A) {
                    return clean_intermediates(solve_a_b_alpha(ins));  // possibly two solutions
                } else {  // SAS B alpha C
                    return clean_intermediates(rotate(solve_a_gamma_b(rotate(ins, -1)), 1));
                }
            } else {
                if (ins.A) {  // SSA A, B, beta
                    return clean_intermediates(mirror_c(solve_a_b_alpha(mirror_c(ins))));
                } else {  // SSA B, C, beta
                    return clean_intermediates(rotate(solve_a_b_alpha(rotate(ins, -1)), 1));
                }
            }
        } else {  // have A and C
            if (ins.gamma) {  // SSA A, C, gamma
                return clean_intermediates(rotate(solve_a_b_alpha(rotate(ins, 1)), -1));
            } else if (ins.beta) {  // SAS A, beta, C
                return clean_intermediates(rotate(solve_a_gamma_b(rotate(ins, 1)), -1));
            } else {
                return clean_intermediates(mirror_a(solve_a_b_alpha(mirror_a(ins))));
            }
        }
    } else if (sides_count && angles_count > 1) {
        if (ins.gamma) {
            if (ins.alpha) {
                if (ins.B) {
                    return clean_intermediates(solve_alpha_b_gamma(ins));
                } else if (ins.C) {
                    return clean_intermediates(solve_gamma_alpha_c(ins));
                } else {
                    return clean_intermediates(mirror_b(solve_gamma_alpha_c(mirror_b(ins))));
                }
            } else {  // have beta but not alpha
                if (ins.A) {
                    return clean_intermediates(rotate(solve_alpha_b_gamma(rotate(ins, 1)), -1));
                } else if (ins.C) {
                    return clean_intermediates(mirror_c(solve_gamma_alpha_c(mirror_c(ins))));
                } else {
                    return clean_intermediates(rotate(solve_gamma_alpha_c(rotate(ins, 1)), -1));
                }
            }
        } else {
            return clean_intermediates(rotate(solveTriangle(rotate(ins, 1)), -1));
        }
    }
    throw new TriangleError(`Underspec'd: ${JSON.stringify(ins)}`);
}
