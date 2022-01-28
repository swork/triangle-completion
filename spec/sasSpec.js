const sas = require('../dist/sas')
const solveAGammaB = sas.solveAGammaB

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
})
