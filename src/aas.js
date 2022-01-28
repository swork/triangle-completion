import { TriangleError, degreesToRadians } from './common'

// AAS
export function solveGammaAlphaC (ins) {
  if (ins.gamma === null || ins.alpha === null || ins.C === null) {
    ins.beta = ins.A = ins.B = null
    return ins
  }
  if (!(ins.gamma && ins.alpha && ins.C)) {
    throw new TriangleError(`Bad AAS in gamma:${ins.gamma}, alpha:${ins.alpha}, C:${ins.C}`)
  }
  const knownASum = ins.alpha + ins.gamma
  if (knownASum >= 180) {
    throw new TriangleError(`Not a triangle ${JSON.stringify(ins)}`)
  }
  ins.beta = 180 - knownASum
  const sinGamma = Math.sin(degreesToRadians(ins.gamma))
  ins.A = (ins.C * Math.sin(degreesToRadians(ins.alpha))) / sinGamma
  ins.B = (ins.C * Math.sin(degreesToRadians(ins.beta))) / sinGamma
  return ins
}
