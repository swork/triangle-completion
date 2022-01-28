const aas = require('../dist/aas')
const solveGammaAlphaC = aas.solveGammaAlphaC

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
})
