// Test stuff imported from the index.js rollup. There are minimal tests in
// individual specs for each subset library, just enough to prove the right
// things are associated with the right names when imported that way.

const trig = require('../dist/index.js')
const deleteUndefs = trig.deleteUndefs
const mirrorB = trig.mirrorB
const rotate = trig.rotate
const solveABC = trig.solveABC
const solveAGammaB = trig.solveAGammaB
const solveAlphaBGamma = trig.solveAlphaBGamma
const solveGammaAlphaC = trig.solveGammaAlphaC
const solveABAlpha = trig.solveABAlpha
const solveTriangle = trig.solveTriangle

const specialMatchers = {
  toBeValidAndReallyCloselyEqualTriangle: function (matchersUtil) {
    return {
      compare: function (actual, expected) {
        const result = {}
        const alpha = Math.round(actual.alpha * 10000)
        const beta = Math.round(actual.beta * 10000)
        const gamma = Math.round(actual.gamma * 10000)
        const alpha_ = Math.round(expected.alpha * 10000)
        const beta_ = Math.round(expected.beta * 10000)
        const gamma_ = Math.round(expected.gamma * 10000)

        const is_valid_angles = (((alpha + beta + gamma) === 180 * 10000) &&
                                       ((alpha_ + beta_ + gamma_) === 180 * 10000))
        const is_equal = (Math.round(actual.A * 10000) === Math.round(expected.A * 10000) &&
                                Math.round(actual.B * 10000) === Math.round(expected.B * 10000) &&
                                Math.round(actual.C * 10000) === Math.round(expected.C * 10000) &&
                                alpha === alpha_ &&
                                beta === beta_ &&
                                gamma === gamma_)
        result.pass = is_valid_angles && is_equal
        if (result.pass) {
          result.message = `Expected ${JSON.stringify(actual)} to be invalid or not match ${JSON.stringify(expected)}`
        } else {
          result.message = `Expected ${JSON.stringify(actual)} to match ${JSON.stringify(expected)}`
        }
        return result
      }
    }
  }
}

describe('deleteUndefs', () => {
  let t = {}

  beforeEach(() => {
    t = {
      A: undefined,
      B: undefined,
      C: undefined,
      alpha: undefined,
      beta: undefined,
      gamma: undefined,
      A_squared: undefined,
      B_squared: undefined,
      C_squared: undefined
    }
  })
  it('is a function', () => {
    expect(typeof deleteUndefs).toBe('function')
  })

  it('passes a no-op test', () => {
    expect(t).toEqual({
      A: undefined,
      B: undefined,
      C: undefined,
      alpha: undefined,
      beta: undefined,
      gamma: undefined,
      A_squared: undefined,
      B_squared: undefined,
      C_squared: undefined
    })
  })

  it('wipes all when all are undefined', () => {
    expect(deleteUndefs(t)).toEqual({})
  })

  it('keeps an expected zero', () => {
    t.C = 0
    expect(deleteUndefs(t)).toEqual({
      C: 0
    })
  })

  it('keeps an unexpected zero', () => {
    t.xyzzy = 0
    expect(deleteUndefs(t)).toEqual({
      xyzzy: 0
    })
  })

  it('keeps an expected nonzero', () => {
    t.C = -1
    expect(deleteUndefs(t)).toEqual({
      C: -1
    })
  })

  it('keeps an unexpected nonzero', () => {
    t.xyzzy = -1
    expect(deleteUndefs(t)).toEqual({
      xyzzy: -1
    })
  })

  it('keeps an expected null', () => {
    t.C = null
    expect(deleteUndefs(t)).toEqual({
      C: null
    })
  })

  it('keeps an unexpected null', () => {
    t.xyzzy = null
    expect(deleteUndefs(t)).toEqual({
      xyzzy: null
    })
  })
})

describe('mirrorB', () => {
  let t = {}

  beforeEach(() => {
    t = {
      A: undefined,
      B: undefined,
      C: undefined,
      alpha: undefined,
      beta: undefined,
      gamma: undefined,
      A_squared: undefined,
      B_squared: undefined,
      C_squared: undefined
    }
  })

  it('is a function', () => {
    expect(typeof mirrorB).toBe('function')
  })

  it('passes a no-op test', () => {
    expect(t).toEqual({
      A: undefined,
      B: undefined,
      C: undefined,
      alpha: undefined,
      beta: undefined,
      gamma: undefined,
      A_squared: undefined,
      B_squared: undefined,
      C_squared: undefined
    })
  })

  it('mirrors about B/beta', () => {
    t.A = 1
    t.alpha = 10
    t.B = 2
    t.beta = 20
    t.C = 3
    t.gamma = 30
    const mirrored = mirrorB(t)
    expect(mirrored).toBe(t) // mutates the input, returns a reference for convenience
    expect(t).toEqual({ // note missing *_squared, left present with undefined values
      A: 3,
      alpha: 30,
      B: 2,
      beta: 20,
      C: 1,
      gamma: 10,
      A_squared: undefined,
      B_squared: undefined,
      C_squared: undefined
    })
  })
})

describe('rotate', () => {
  let t = {}

  beforeEach(() => {
    t = {
      A: undefined,
      B: undefined,
      C: undefined,
      alpha: undefined,
      beta: undefined,
      gamma: undefined,
      A_squared: undefined,
      B_squared: undefined,
      C_squared: undefined
    }
  })

  it('is a function', () => {
    expect(typeof rotate).toBe('function')
  })

  it('passes a no-op test', () => {
    expect(t).toEqual({
      A: undefined,
      B: undefined,
      C: undefined,
      alpha: undefined,
      beta: undefined,
      gamma: undefined,
      A_squared: undefined,
      B_squared: undefined,
      C_squared: undefined
    })
  })

  it('both ways is idempotent', () => {
    t.A = 1
    t.alpha = 10
    t.B = 2
    t.beta = 20
    t.C = 3
    t.gamma = 30
    const temp = { ...t } // deep-enough copy
    expect(temp).toEqual(t)
    expect(temp).not.toBe(t) // prove the copy
    const rotated = rotate(rotate(temp, 1), -1)
    expect(rotated).toEqual(t)
    expect(rotated).not.toBe(t) // prove the copy
  })

  it('right', () => {
    t.A = 1
    t.alpha = 10
    t.B = 2
    t.beta = 20
    t.C = 3
    t.gamma = 30
    const temp = { ...t } // deep-enough copy
    const r = rotate(temp, 1)
    expect(r.gamma).toEqual(t.beta)
    expect(r.alpha).toEqual(t.gamma)
    expect(r.beta).toEqual(t.alpha)
    expect(r.B).toEqual(t.A)
    expect(r.C).toEqual(t.B)
    expect(r.A).toEqual(t.C)
  })

  it('left', () => {
    t.A = 1
    t.alpha = 10
    t.B = 2
    t.beta = 20
    t.C = 3
    t.gamma = 30
    const temp = { ...t } // deep-enough copy
    const r = rotate(temp, -1)
    expect(r.alpha).toEqual(t.beta)
    expect(r.beta).toEqual(t.gamma)
    expect(r.gamma).toEqual(t.alpha)
    expect(r.C).toEqual(t.A)
    expect(r.A).toEqual(t.B)
    expect(r.B).toEqual(t.C)
  })
})

describe('solveABC', () => {
  it('is a function', () => {
    expect(typeof solveABC).toBe('function')
  })

  it('throws on any value missing', () => {
    expect(() => { solveABC({ }) }).toThrow()
    expect(() => { solveABC({ A: 1 }) }).toThrow()
    expect(() => { solveABC({ B: 1 }) }).toThrow()
    expect(() => { solveABC({ C: 1 }) }).toThrow()
    expect(() => { solveABC({ A: 1, B: 2 }) }).toThrow()
    expect(() => { solveABC({ B: 2, C: 3 }) }).toThrow()
    expect(() => { solveABC({ A: 1, C: 3 }) }).toThrow()
  })

  it('throws on any value zero', () => {
    expect(() => { solveABC({ A: 0, B: 2, C: 3 }) }).toThrow()
    expect(() => { solveABC({ A: 1, B: 0, C: 3 }) }).toThrow()
    expect(() => { solveABC({ A: 1, B: 2, C: 0 }) }).toThrow()
  })

  it('propogates null input', () => {
    expect(solveABC({ A: null, B: 2, C: 3 })).toEqual({
      A: null, B: 2, C: 3, alpha: null, beta: null, gamma: null
    })
    expect(solveABC({ A: 1, B: null, C: 3 })).toEqual({
      A: 1, B: null, C: 3, alpha: null, beta: null, gamma: null
    })
    expect(solveABC({ A: 1, B: 2, C: null })).toEqual({
      A: 1, B: 2, C: null, alpha: null, beta: null, gamma: null
    })
  })

  it('solves SSS', () => {
    const sqrt_3 = Math.sqrt(3)
    const solved = solveABC({
      A: 1,
      B: sqrt_3,
      C: 2
    })
    expect(solved.alpha + solved.beta + solved.gamma).toBeCloseTo(180)
    expect(solved.alpha).toBeCloseTo(30)
    expect(solved.beta).toBeCloseTo(60)
    expect(solved.gamma).toBeCloseTo(90)

    expect(solved.A).toBe(1)
    expect(solved.B).toBe(sqrt_3)
    expect(solved.C).toBe(2)
  })
})

describe('solveAGammaB', () => {
  it('is a function', () => {
    expect(typeof solveAGammaB).toBe('function')
  })

  it('throws on any value missing', () => {
    expect(() => { solveAGammaB({ }) }).toThrow()
    expect(() => { solveAGammaB({ A: 1 }) }).toThrow()
    expect(() => { solveAGammaB({ gamma: 1 }) }).toThrow()
    expect(() => { solveAGammaB({ B: 1 }) }).toThrow()
    expect(() => { solveAGammaB({ A: 1, gamma: 2 }) }).toThrow()
    expect(() => { solveAGammaB({ gamma: 2, B: 3 }) }).toThrow()
    expect(() => { solveAGammaB({ A: 1, B: 3 }) }).toThrow()
  })

  it('throws on any value zero', () => {
    expect(() => { solveAGammaB({ A: 0, gamma: 30, B: 2 }) }).toThrow()
    expect(() => { solveAGammaB({ A: 1, gamma: 0, B: 3 }) }).toThrow()
    expect(() => { solveAGammaB({ A: 1, gamma: 30, B: 0 }) }).toThrow()
  })

  it('propogates null input', () => {
    expect(solveAGammaB({ A: null, gamma: 30, B: 2 })).toEqual({
      A: null, gamma: 30, B: 2, C: null, alpha: null, beta: null
    })
    expect(solveAGammaB({ A: 1, gamma: null, B: 2 })).toEqual({
      A: 1, gamma: null, B: 2, C: null, alpha: null, beta: null
    })
    expect(solveAGammaB({ A: 1, gamma: 30, B: null })).toEqual({
      A: 1, gamma: 30, B: null, C: null, alpha: null, beta: null
    })
  })

  it('solves SAS', () => {
    const sqrt_3 = Math.sqrt(3)
    const solved = solveAGammaB({
      A: 1,
      gamma: 60,
      B: 2
    })
    expect(solved.alpha + solved.beta + solved.gamma).toBeCloseTo(180)
    expect(solved.alpha).toBeCloseTo(30)
    expect(solved.beta).toBeCloseTo(90)
    expect(solved.gamma).toBe(60)

    expect(solved.A).toBe(1)
    expect(solved.B).toBe(2)
    expect(solved.C).toBeCloseTo(sqrt_3)
  })
})

describe('solveAlphaBGamma', () => {
  it('is a function', () => {
    expect(typeof solveAlphaBGamma).toBe('function')
  })

  it('throws on any value missing', () => {
    expect(() => { solveAlphaBGamma({ }) }).toThrow()
    expect(() => { solveAlphaBGamma({ alpha: 1 }) }).toThrow()
    expect(() => { solveAlphaBGamma({ gamma: 1 }) }).toThrow()
    expect(() => { solveAlphaBGamma({ B: 1 }) }).toThrow()
    expect(() => { solveAlphaBGamma({ alpha: 1, B: 3 }) }).toThrow()
    expect(() => { solveAlphaBGamma({ gamma: 2, B: 3 }) }).toThrow()
    expect(() => { solveAlphaBGamma({ alpha: 1, gamma: 2 }) }).toThrow()
  })

  it('throws on any value zero', () => {
    expect(() => { solveAlphaBGamma({ alpha: 0, gamma: 30, B: 2 }) }).toThrow()
    expect(() => { solveAlphaBGamma({ alpha: 1, gamma: 0, B: 3 }) }).toThrow()
    expect(() => { solveAlphaBGamma({ alpha: 1, gamma: 30, B: 0 }) }).toThrow()
  })

  it('propogates null input', () => {
    expect(solveAlphaBGamma({ alpha: null, B: 2, gamma: 3 })).toEqual({
      alpha: null, B: 2, gamma: 3, C: null, A: null, beta: null
    })
    expect(solveAlphaBGamma({ alpha: 1, B: null, gamma: 3 })).toEqual({
      alpha: 1, B: null, gamma: 3, C: null, A: null, beta: null
    })
    expect(solveAlphaBGamma({ alpha: 1, B: 2, gamma: null })).toEqual({
      alpha: 1, B: 2, gamma: null, C: null, A: null, beta: null
    })
  })

  it('solves ASA', () => {
    const sqrt_3 = Math.sqrt(3)
    const solved = solveAlphaBGamma({
      alpha: 30,
      gamma: 60,
      B: 2
    })
    expect(solved.alpha + solved.beta + solved.gamma).toBeCloseTo(180)
    expect(solved.alpha).toBeCloseTo(30)
    expect(solved.beta).toBeCloseTo(90)
    expect(solved.gamma).toBe(60)

    expect(solved.A).toBeCloseTo(1)
    expect(solved.B).toBe(2)
    expect(solved.C).toBeCloseTo(sqrt_3)
  })
})

describe('solveGammaAlphaC', () => {
  it('is a function', () => {
    expect(typeof solveGammaAlphaC).toBe('function')
  })

  it('throws on any value missing', () => {
    expect(() => { solveGammaAlphaC({ }) }).toThrow()
    expect(() => { solveGammaAlphaC({ alpha: 10 }) }).toThrow()
    expect(() => { solveGammaAlphaC({ gamma: 10 }) }).toThrow()
    expect(() => { solveGammaAlphaC({ C: 1 }) }).toThrow()
    expect(() => { solveGammaAlphaC({ alpha: 10, gamma: 2 }) }).toThrow()
    expect(() => { solveGammaAlphaC({ gamma: 2, C: 3 }) }).toThrow()
    expect(() => { solveGammaAlphaC({ alpha: 1, C: 3 }) }).toThrow()
  })

  it('throws on any value zero', () => {
    expect(() => { solveGammaAlphaC({ alpha: 0, gamma: 30, C: 2 }) }).toThrow()
    expect(() => { solveGammaAlphaC({ alpha: 1, gamma: 0, C: 3 }) }).toThrow()
    expect(() => { solveGammaAlphaC({ alpha: 1, gamma: 30, C: 0 }) }).toThrow()
  })

  it('propogates null input', () => {
    expect(solveGammaAlphaC({ gamma: null, alpha: 2, C: 3 })).toEqual({
      gamma: null, alpha: 2, C: 3, A: null, B: null, beta: null
    })
    expect(solveGammaAlphaC({ gamma: 1, alpha: null, C: 3 })).toEqual({
      gamma: 1, alpha: null, C: 3, A: null, B: null, beta: null
    })
    expect(solveGammaAlphaC({ gamma: 1, alpha: 2, C: null })).toEqual({
      gamma: 1, alpha: 2, C: null, A: null, B: null, beta: null
    })
  })

  it('solves AAS', () => {
    const sqrt_3 = Math.sqrt(3)
    const solved = solveGammaAlphaC({
      alpha: 30,
      gamma: 90,
      C: 2
    })
    expect(solved.alpha + solved.beta + solved.gamma).toBeCloseTo(180)
    expect(solved.alpha).toBe(30)
    expect(solved.beta).toBeCloseTo(60)
    expect(solved.gamma).toBe(90)

    expect(solved.A).toBeCloseTo(1)
    expect(solved.B).toBeCloseTo(sqrt_3)
    expect(solved.C).toBe(2)
  })
})

describe('solveABAlpha', () => {
  it('is a function', () => {
    expect(typeof solveABAlpha).toBe('function')
  })

  it('throws on any value missing', () => {
    expect(() => { solveABAlpha({ }) }).toThrow()
    expect(() => { solveABAlpha({ A: 1 }) }).toThrow()
    expect(() => { solveABAlpha({ B: 1 }) }).toThrow()
    expect(() => { solveABAlpha({ alpha: 1 }) }).toThrow()
    expect(() => { solveABAlpha({ A: 1, B: 3 }) }).toThrow()
    expect(() => { solveABAlpha({ B: 3, alpha: 2 }) }).toThrow()
    expect(() => { solveABAlpha({ A: 1, alpha: 2 }) }).toThrow()
  })

  it('throws on any value zero', () => {
    expect(() => { solveABAlpha({ A: 0, alpha: 30, B: 2 }) }).toThrow()
    expect(() => { solveABAlpha({ A: 1, alpha: 0, B: 3 }) }).toThrow()
    expect(() => { solveABAlpha({ A: 1, alpha: 30, B: 0 }) }).toThrow()
  })

  it('propogates null input', () => {
    expect(solveABAlpha({ A: null, B: 2, alpha: 3 })).toEqual({
      A: null, B: 2, alpha: 3, C: null, beta: null, gamma: null
    })
    expect(solveABAlpha({ A: 1, B: null, alpha: 3 })).toEqual({
      A: 1, B: null, alpha: 3, C: null, beta: null, gamma: null
    })
    expect(solveABAlpha({ A: 1, B: 2, alpha: null })).toEqual({
      A: 1, B: 2, alpha: null, C: null, beta: null, gamma: null
    })
  })

  it('solves SSA all acute', () => {
    const sqrt_3 = Math.sqrt(3)
    const solved = solveABAlpha({
      A: 1.7,
      alpha: 60,
      B: 1.9
    })
    expect(solved.alpha + solved.beta + solved.gamma).toBeCloseTo(180)
    expect(solved.alpha).toBe(60)
    expect(solved.beta).toBeCloseTo(75.445)
    expect(solved.gamma).toBeCloseTo(44.554)

    expect(solved.A).toBe(1.7)
    expect(solved.B).toBe(1.9)
    expect(solved.C).toBeCloseTo(1.377)
  })

  it('solves SSA obtuse', () => {
    const sqrt_3 = Math.sqrt(3)
    const solved = solveABAlpha({
      A: 2,
      alpha: 91,
      B: 1
    })

    expect(solved.alpha + solved.beta + solved.gamma).toBeCloseTo(180)
    expect(solved.alpha).toBe(89)
    expect(solved.beta).toBeCloseTo(29.995)
    expect(solved.gamma).toBeCloseTo(61.005)

    expect(solved.A).toBe(2)
    expect(solved.B).toBe(1)
    expect(solved.C).toBeCloseTo(1.750)

    expect(solved.alt.alpha + solved.alt.beta + solved.alt.gamma).toBeCloseTo(180)
    expect(solved.alt.alpha).toBe(91)
    expect(solved.alt.beta).toBeCloseTo(29.995)
    expect(solved.alt.gamma).toBeCloseTo(59.005)

    expect(solved.alt.A).toBe(2)
    expect(solved.alt.B).toBe(1)
    expect(solved.alt.C).toBeCloseTo(1.714)
  })
})

describe('solve_triangle', () => {
  // These example solutions taken from KhanAcadamy.org

  it('solves SSA all acute', () => {
    const s = solveTriangle({ B: 26, A: 20, alpha: 48 })
    expect(s.alpha + s.beta + s.gamma).toBeCloseTo(180)
    expect(s.C).toBeCloseTo(22.56)
    expect(s.beta).toBeCloseTo(75.04)
    expect(s.gamma).toBeCloseTo(56.96)
    expect(s.alt).toBe(undefined)
  })

  it('solves ASA', () => {
    const s = solveTriangle({ B: 16, gamma: 39, alpha: 42 })
    expect(s.alpha + s.beta + s.gamma).toBeCloseTo(180)
    expect(s.A).toBeCloseTo(10.84)
    expect(s.C).toBeCloseTo(10.2)
    expect(s.beta).toBeCloseTo(99)
    expect(s.alt).toBe(undefined)
  })

  it('solves SSA obtuse', () => {
    const s = solveTriangle({ A: 10, C: 24, alpha: 22 })
    expect(s.alpha + s.beta + s.gamma).toBeCloseTo(180)
    expect(s.B).toBeCloseTo(26.63)
    expect(s.beta).toBeCloseTo(86.03)
    expect(s.gamma).toBeCloseTo(71.966)
    expect(s.alt).not.toBe(undefined)
    expect(s.alt.alpha + s.alt.beta + s.alt.gamma).toBeCloseTo(180)
    expect(s.alt.B).toBeCloseTo(24)
    expect(s.alt.beta).toBeCloseTo(64.034)
    expect(s.alt.gamma).toBeCloseTo(93.966)
  })

  it('solves AAS', () => {
    const s = solveTriangle({ beta: 110, gamma: 40, C: 12 })
    expect(s.alpha + s.beta + s.gamma).toBeCloseTo(180)
    expect(s.A).toBeCloseTo(9.33)
    expect(s.B).toBeCloseTo(17.54)
    expect(s.alpha).toBeCloseTo(30)
    expect(s.alt).toBe(undefined)
  })
})

describe('permute a right triangle', () => {
  let t0
  beforeAll(() => {
    jasmine.addMatchers(specialMatchers)
    t0 = {
      A: 3,
      B: 4,
      C: 5,
      alpha: 36.86989764584401, // tests are too dependent on FP implementation!
      beta: 53.13010234515598,
      gamma: 90
    }
    const t1 = { ...t0 }
    delete t1.alpha
    delete t1.beta
    delete t1.gamma
    expect(solveTriangle(t1)).toBeValidAndReallyCloselyEqualTriangle(t1)
  })

  it('comes out same regardless of which three inputs', () => {
    for (let i = 0; i < 64; ++i) {
      const t1 = { ...t0 }
      if (i === 7 || countSetBits(i) !== 3) { // AAA (7) doesn't spec a unique triangle
        continue
      }
      if (i & 1) {
        delete t1.A
      }
      if (i & 2) {
        delete t1.B
      }
      if (i & 4) {
        delete t1.C
      }
      if (i & 8) {
        delete t1.alpha
      }
      if (i & 16) {
        delete t1.beta
      }
      if (i & 32) {
        delete t1.gamma
      }
      // console.log(i, JSON.stringify(t1))
      solveTriangle(t1) // mutates the input and returns a reference
      expect(t1.A).toBeCloseTo(t0.A)
      expect(t1.B).toBeCloseTo(t0.B)
      expect(t1.C).toBeCloseTo(t0.C)
      expect(t1.alpha).toBeCloseTo(t0.alpha)
      expect(t1.beta).toBeCloseTo(t0.beta)
      expect(t1.gamma).toBeCloseTo(t0.gamma)
      // FP inaccuracies around 90 will make for some SSA alts, ignore them here.
    }
  })
})

function countSetBits (n) {
  let count = 0
  while (n > 0) {
    n &= (n - 1)
    count++
  }
  return count
}
