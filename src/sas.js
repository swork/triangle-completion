import { TriangleError, degreesToRadians, radiansToDegrees } from './common'

// SAS
export function solveAGammaB (ins) {
  if (ins.A === null || ins.gamma === null || ins.B === null) {
    ins.alpha = ins.beta = ins.C = null
    return ins
  }
  if (!(ins.A && ins.gamma && ins.B)) {
    throw new TriangleError(`Bad SAS in A:${ins.A}, gamma:${ins.gamma}, B:${ins.B}`)
  }
  if (ins.A_squared === undefined) {
    ins.A_squared = ins.A * ins.A
  }
  if (ins.B_squared === undefined) {
    ins.B_squared = ins.B * ins.B
  }
  if (ins.C_squared === undefined) {
    const gammaRadians = degreesToRadians(ins.gamma)
    ins.C_squared = ins.A_squared + ins.B_squared - (2 * ins.A * ins.B * Math.cos(gammaRadians))
  }
  if (ins.C === undefined || !isFinite(ins.C)) {
    ins.C = Math.sqrt(ins.C_squared)
  }
  if (ins.alpha === undefined || !isFinite(ins.alpha)) {
    if (ins.beta) {
      ins.alpha = 180 - (ins.alpha + ins.beta)
    } else {
      const cosAlpha = ((ins.B_squared + ins.C_squared) - ins.A_squared) / (2 * ins.B * ins.C)
      ins.alpha = radiansToDegrees(Math.acos(cosAlpha))
    }
  }
  if (ins.beta === undefined || !isFinite(ins.beta)) {
    ins.beta = 180 - (ins.alpha + ins.gamma)
  }
  return ins
}
