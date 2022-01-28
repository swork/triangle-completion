const ssa = require('../dist/ssa')
const solveABAlpha = ssa.solveABAlpha

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
})
