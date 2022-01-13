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

export default solveTriangle;

export class TriangleError extends Error {};

const have = (ins, key) => {
    if (ins.hasOwnProperty(key) && ins[key] !== undefined) {
        return 1;
    }
    return 0;
};

const radiansToDegrees = radian => {
    return 180 * radian / Math.PI;
};

const degreesToRadians = degree => {
    return Math.PI * degree / 180;
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

// Rotate right (1) or left(-1)
export function rotate(ins, direction) {
    let temp;
    switch (direction) {
    case 1:
        temp = ins.gamma;
        ins.gamma = ins.beta;
        ins.beta = ins.alpha;
        ins.alpha = temp;
        temp = ins.C;
        ins.C = ins.B;
        ins.B = ins.A;
        ins.A = temp;
        break;
    case -1:
        temp = ins.alpha;
        ins.alpha = ins.beta;
        ins.beta = ins.gamma;
        ins.gamma = temp;
        temp = ins.A;
        ins.A = ins.B;
        ins.B = ins.C;
        ins.C = temp;
        break;
    default:
        throw Error(`Bug: rotate(spec, ${direction})`);
    }
    return ins;
}

// SSS, all non-zero.
export function solve_a_b_c(ins) {
    if (ins.A === null || ins.B === null || ins.C === null) {
        ins.alpha = ins.beta = ins.gamma = null;
        return ins;
    }
    if ( ! (ins.A && ins.B && ins.C)) {
        throw new TriangleError(`Bad SSS in A:${ins.A}, B:${ins.B}, C:${ins.C}`);
    }
    if (ins.gamma === undefined || ins.gamma === null || !isFinite(ins.gamma)) {
        if (ins.A_squared === undefined) {
            ins.A_squared = ins.A * ins.A;
        }
        if (ins.B_squared === undefined) {
            ins.B_squared = ins.B * ins.B;
        }
        if (ins.C_squared === undefined) {
            ins.C_squared = ins.C * ins.C;
        }
        let cos_gamma = ((ins.A_squared + ins.B_squared) - ins.C_squared) / (2 * ins.A * ins.B);
        ins.gamma = radiansToDegrees(Math.acos(cos_gamma));
    }
    return solve_a_gamma_b(ins);
}

// SAS
export function solve_a_gamma_b(ins) {
    if (ins.A === null || ins.gamma === null || ins.B === null) {
        ins.alpha = ins.beta = ins.C = null;
        return ins;
    }
    if ( !(ins.A && ins.gamma && ins.B)) {
        throw new TriangleError(`Bad SAS in A:${ins.A}, gamma:${ins.gamma}, B:${ins.B}`);
    }
    if (ins.A_squared === undefined) {
        ins.A_squared = ins.A * ins.A;
    }
    if (ins.B_squared === undefined) {
        ins.B_squared = ins.B * ins.B;
    }
    if (ins.C_squared === undefined) {
        let gamma_radians = Math.PI * ins.gamma / 180;
        ins.C_squared = ins.A_squared + ins.B_squared - (2 * ins.A * ins.B * Math.cos(gamma_radians));
    }
    if (ins.C === undefined || !isFinite(ins.C)) {
        ins.C = Math.sqrt(ins.C_squared);
    }
    if (ins.alpha === undefined || !isFinite(ins.alpha)) {
        if (ins.beta) {
            ins.alpha = 180 - (ins.alpha + ins.beta);
        } else {
            let cos_alpha = ((ins.B_squared + ins.C_squared) - ins.A_squared) / (2 * ins.B * ins.C);
            ins.alpha = radiansToDegrees(Math.acos(cos_alpha));
        }
    }
    if (ins.beta === undefined || !isFinite(ins.beta)) {
        ins.beta = 180 - (ins.alpha + ins.gamma);
    }
    return ins;
}

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

