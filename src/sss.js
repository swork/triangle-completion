import { TriangleError, radiansToDegrees } from './common'
import { solveAGammaB } from './sas'

// SSS
export function solveABC (ins) {
  if (ins.A === null || ins.B === null || ins.C === null) {
    ins.alpha = ins.beta = ins.gamma = null
    return ins
  }
  if (!(ins.A && ins.B && ins.C)) {
    throw new TriangleError(`Bad SSS in A:${ins.A}, B:${ins.B}, C:${ins.C}`)
  }
  if (ins.gamma === undefined || ins.gamma === null || !isFinite(ins.gamma)) {
    if (ins.A_squared === undefined) {
      ins.A_squared = ins.A * ins.A
    }
    if (ins.B_squared === undefined) {
      ins.B_squared = ins.B * ins.B
    }
    if (ins.C_squared === undefined) {
      ins.C_squared = ins.C * ins.C
    }
    const cosGamma = ((ins.A_squared + ins.B_squared) - ins.C_squared) / (2 * ins.A * ins.B)
    ins.gamma = radiansToDegrees(Math.acos(cosGamma))
  }
  return solveAGammaB(ins)
}
