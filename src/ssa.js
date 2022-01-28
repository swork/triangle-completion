import { TriangleError, radiansToDegrees, degreesToRadians, rotate } from './common'
import { solveAGammaB } from './sas'

// SSA can have two solutions
export function solveABAlpha (ins, skipAlt) {
  if (ins.A === null || ins.B === null || ins.alpha === null) {
    ins.C = ins.beta = ins.gamma = null
    return ins
  }
  if (!(ins.A && ins.B && ins.alpha)) {
    throw new TriangleError(`Bad SSA in A:${ins.A}, B:${ins.B}, alpha:${ins.alpha}`)
  }
  const sinAlpha = Math.sin(degreesToRadians(ins.alpha))
  ins.beta = radiansToDegrees(Math.asin((ins.B * sinAlpha) / ins.A))
  ins.gamma = 180 - (ins.alpha + ins.beta)
  ins.C = (ins.B * Math.sin(degreesToRadians(ins.gamma))) / Math.sin(degreesToRadians(ins.beta))
  if (skipAlt === undefined && (ins.alpha > 90 || ins.beta > 90 || ins.gamma > 90)) {
    ins.alt = { ...ins }
    if (ins.alpha > 90) {
      const diff = ins.alpha - 90
      ins.alpha = 90 - diff
      delete ins.C
      delete ins.beta
      delete ins.gamma
      return solveABAlpha(ins, true)
    } else if (ins.beta > 90) {
      const diff = ins.beta - 90
      ins.beta = 90 - diff
      delete ins.A
      delete ins.alpha
      delete ins.gamma
      return rotate(solveABAlpha(rotate(ins, -1), true), 1)
    } else {
      const diff = ins.gamma - 90
      ins.gamma = 90 - diff
      delete ins.B
      delete ins.alpha
      delete ins.beta
      return rotate(solveABAlpha(rotate(ins, 1), true), -1)
    }
  } else {
    return solveAGammaB(ins)
  }
}
