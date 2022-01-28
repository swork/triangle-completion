import { TriangleError, degreesToRadians } from './common'

// ASA
export function solveAlphaBGamma (ins) {
  if (ins.alpha === null || ins.B === null || ins.gamma === null) {
    ins.A = ins.beta = ins.C = null
    return ins
  }
  if (!(ins.alpha && ins.B && ins.gamma)) {
    throw new TriangleError(`Bad ASA in alpha:${ins.alpha}, B:${ins.B}, gamma:${ins.gamma}`)
  }
  const knownASum = ins.alpha + ins.gamma
  if (knownASum >= 180) {
    throw new TriangleError(`Not a triangle ${JSON.stringify(ins)}`)
  }
  ins.beta = 180 - knownASum
  const sinGamma = Math.sin(degreesToRadians(ins.gamma))
  ins.C = (ins.B * sinGamma) / Math.sin(degreesToRadians(ins.beta))
  ins.A = (ins.C * Math.sin(degreesToRadians(ins.alpha))) / sinGamma
  return ins
}
