export class TriangleError extends Error {};
export { radiansToDegrees, degreesToRadians, rotate };

function radiansToDegrees(radian) {
    return 180 * radian / Math.PI;
};

function degreesToRadians(degree) {
    return Math.PI * degree / 180;
};

// Rotate right (1) or left(-1)
function rotate(ins, direction) {
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
