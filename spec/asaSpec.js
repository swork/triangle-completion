const asa = require('../dist/asa')
const solveAlphaBGamma = asa.solveAlphaBGamma

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
})
