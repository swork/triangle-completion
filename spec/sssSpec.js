const sss = require('../dist/sss')
const solveABC = sss.solveABC

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
})
