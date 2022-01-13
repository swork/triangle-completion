# triangle-completion
Calc a triangle from a partial spec. Basic trig nicely packaged.

## Usage
```
import { solveTriangle, TriangleError } from 'trig';
console.log(solveTriangle({ alpha:60, beta: 30, B: 1 }));
{
  alpha: 60,
  beta: 30,
  gamma: 90,
  A: 1.7320508075688774,
  B: 1
  C: 2.0000000000000004,
}
console.log(solveTriangle({ A:1, C:2, alpha: 10 }));
{
  A: 1,
  B: 2.907370933399707
  C: 3.7264028721887454,
  alpha: 10,
  beta: 30.32203701650613,
  gamma: 139.67796298349387,
  alt: {
    A: 1,
    B: 2,
    C: 2.907370933399707,
    alpha: 10,
    beta: 20.32203701650614
    gamma: 149.67796298349387,
  },
}
```

Specifications use `alpha`, `beta`, `gamma` for angles and `A`, `B`, `C` for the
corresponding opposite sides. As shown, an SSA spec involving an obtuse angle
generates both possible solutions.

Invalid inputs (zero/NaN/undefined, or unsolvable specifications) throw
`TriangleError`, trivially derived from `Error`. `null` inputs propogate to the output without throwing an
error.

## Contributing
Zero optimization for performance, have at it:
[https://github.com/swork/triangle-completion.git]

`npx test` runs a Jasmine suite, please extend it. The suite would benefit from
automatic generation of legit specs, and from better probing of error
conditions.
