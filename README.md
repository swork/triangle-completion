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

## Optimizing

solveTriangle analyzes and mutates the input spec to match up with one of
several solver functions. You can call these solver functions directly, saving
both the cost of the analysis (for sure a few conditional evaluations and likely
a few rotate/invert object manipulations) and the cost in time and space of
importing unused logic. The individual solvers are named for the inputs they
expect, and packaged into submodules named for the shape of the specification,
as follows:

- `triangle-completion-aas`: Angle-Angle-Side, `solve_gamma_alpha_c({ gamma: 20, alpha: 80, C: 3 })`
- `triangle-completion-asa`: Angle-Side-Angle, `solve_alpha_b_gamma({ alpha: 80, B: 3, gamma: 20 })`
- `triangle-completion-sas`: Side-Angle-Side, `solve_a_gamma_b({ A: 1, gamma: 20, B: 3 })`
- `triangle-completion-ssa`: Side-Side-Angle, `solve_a_b_alpha({ A: 1, B: 3, alpha: 40 })`
- `triangle-completion-sss`: Side-Side-Side, `solve_a_b_c({ A: 1, B: 3, C: 5 })`

There are also some trivial support functions in `triangle-completion-common`,
but it's unlikely they'll be of interest on their own.

## Contributing
Zero optimization of code for performance, have at it:
[https://github.com/swork/triangle-completion.git]

`npx test` runs a Jasmine suite, please extend it to reflect your changes.
