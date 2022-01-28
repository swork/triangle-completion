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

import {
  TriangleError,
  degreesToRadians,
  radiansToDegrees,
  rotate
} from './common'
import { solveGammaAlphaC } from './aas'
import { solveAlphaBGamma } from './asa'
import { solveAGammaB } from './sas'
import { solveABAlpha } from './ssa'
import { solveABC } from './sss'

export {
  TriangleError,
  degreesToRadians,
  radiansToDegrees,
  rotate,
  solveGammaAlphaC,
  solveAlphaBGamma,
  solveAGammaB,
  solveABAlpha,
  solveABC
}

export default solveTriangle

const have = (ins, key) => {
  if (key in ins && ins[key] !== undefined) {
    return 1
  }
  return 0
}

export function deleteUndefs (ins) {
  Object.keys(ins).forEach(key => {
    if (ins[key] === undefined) {
      delete ins[key]
    } else if (key === 'alt') {
      deleteUndefs(ins.alt)
    }
  })
  return ins
}

function cleanIntermediates (ins) {
  delete ins.A_squared
  delete ins.B_squared
  delete ins.C_squared
  if (ins.alt !== undefined) {
    cleanIntermediates(ins.alt)
  }
  return deleteUndefs(ins)
}

// Swap B and C
export function mirrorA (ins) {
  const oldC = ins.C
  ins.C = ins.B
  ins.B = oldC

  const oldGamma = ins.gamma
  ins.gamma = ins.beta
  ins.beta = oldGamma

  const oldC2 = ins.C_squared
  ins.C_squared = ins.B_squared
  ins.B_squared = oldC2

  return ins
}

// Swap A and C
export function mirrorB (ins) {
  const oldC = ins.C
  ins.C = ins.A
  ins.A = oldC

  const oldGamma = ins.gamma
  ins.gamma = ins.alpha
  ins.alpha = oldGamma

  const oldC2 = ins.C_squared
  ins.C_squared = ins.A_squared
  ins.A_squared = oldC2

  return ins
}

// Swap A and B
export function mirrorC (ins) {
  const oldB = ins.B
  ins.B = ins.A
  ins.A = oldB

  const oldBeta = ins.beta
  ins.beta = ins.alpha
  ins.alpha = oldBeta

  const oldB2 = ins.B_squared
  ins.B_squared = ins.A_squared
  ins.A_squared = oldB2

  return ins
}

export function solveTriangle (ins) {
  // Here the triangle is sides A, B, C opposite angles alpha, beta, gamma.
  const sidesCount = have(ins, 'A') + have(ins, 'B') + have(ins, 'C')
  const anglesCount = have(ins, 'alpha') + have(ins, 'beta') + have(ins, 'gamma')

  if (sidesCount === 3) {
    return cleanIntermediates(solveABC(ins))
  } else if (sidesCount > 1 && anglesCount) {
    if (ins.B) {
      if (ins.gamma) {
        if (ins.A) {
          return cleanIntermediates(solveAGammaB(ins))
        } else {
          return cleanIntermediates(mirrorB(solveABAlpha(mirrorB(ins))))
        }
      } else if (ins.alpha) {
        if (ins.A) {
          return cleanIntermediates(solveABAlpha(ins)) // possibly two solutions
        } else { // SAS B alpha C
          return cleanIntermediates(rotate(solveAGammaB(rotate(ins, -1)), 1))
        }
      } else {
        if (ins.A) { // SSA A, B, beta
          return cleanIntermediates(mirrorC(solveABAlpha(mirrorC(ins))))
        } else { // SSA B, C, beta
          return cleanIntermediates(rotate(solveABAlpha(rotate(ins, -1)), 1))
        }
      }
    } else { // have A and C
      if (ins.gamma) { // SSA A, C, gamma
        return cleanIntermediates(rotate(solveABAlpha(rotate(ins, 1)), -1))
      } else if (ins.beta) { // SAS A, beta, C
        return cleanIntermediates(rotate(solveAGammaB(rotate(ins, 1)), -1))
      } else {
        return cleanIntermediates(mirrorA(solveABAlpha(mirrorA(ins))))
      }
    }
  } else if (sidesCount && anglesCount > 1) {
    if (ins.gamma) {
      if (ins.alpha) {
        if (ins.B) {
          return cleanIntermediates(solveAlphaBGamma(ins))
        } else if (ins.C) {
          return cleanIntermediates(solveGammaAlphaC(ins))
        } else {
          return cleanIntermediates(mirrorB(solveGammaAlphaC(mirrorB(ins))))
        }
      } else { // have beta but not alpha
        if (ins.A) {
          return cleanIntermediates(rotate(solveAlphaBGamma(rotate(ins, 1)), -1))
        } else if (ins.C) {
          return cleanIntermediates(mirrorC(solveGammaAlphaC(mirrorC(ins))))
        } else {
          return cleanIntermediates(rotate(solveGammaAlphaC(rotate(ins, 1)), -1))
        }
      }
    } else {
      return cleanIntermediates(rotate(solveTriangle(rotate(ins, 1)), -1))
    }
  }
  throw new TriangleError(`Underspec'd: ${JSON.stringify(ins)}`)
}
