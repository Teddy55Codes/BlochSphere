import {Complex} from "./Complex";

// Half Turns

export const XGate = [[new Complex(0, 0), new Complex(1, 0)], 
                            [new Complex(1, 0), new Complex(0, 0)]];

export const YGate = [[new Complex(0, 0), new Complex(0, -1)],
                            [new Complex(0, 1), new Complex(0, 0)]];

export const ZGate = [[new Complex(1, 0), new Complex(0, 0)],
                            [new Complex(0, 0), new Complex(-1, 0)]];

export const HGate = [[new Complex(Math.SQRT1_2, 0), new Complex(Math.SQRT1_2, 0)],
                            [new Complex(Math.SQRT1_2, 0), new Complex(-Math.SQRT1_2, 0)]];

// Quarter Turns

export const SGate = [[new Complex(1, 0), new Complex(0, 0)],
                            [new Complex(0, 0), new Complex(0, 1)]];

export const SNegGate = [[new Complex(1, 0), new Complex(0, 0)],
                               [new Complex(0, 0), new Complex(0, -1)]];

export const YHalfGate = [[new Complex(.5, .5), new Complex(-.5, -.5)],
                                [new Complex(.5, .5), new Complex(.5, .5)]];

export const YNegHalfGate = [[new Complex(.5, -.5), new Complex(.5, -.5)],
                                   [new Complex(-.5, .5), new Complex(.5, -.5)]];

export const XHalfGate = [[new Complex(.5, .5), new Complex(.5, -.5)],
                             [new Complex(.5, -.5), new Complex(.5, .5)]];

export const XNegHalfGate = [[new Complex(.5, -.5), new Complex(.5, .5)], 
                                   [new Complex(.5, .5), new Complex(.5, -.5)]];

// Eighth Turns

export const TGate = [[new Complex(1, 0), new Complex(0, 0)],
                            [new Complex(0, 0), new Complex(Math.SQRT1_2, Math.SQRT1_2)]];

export const TNegGate = [[new Complex(1, 0), new Complex(0, 0)],
                               [new Complex(0, 0), new Complex(Math.SQRT1_2, -Math.SQRT1_2)]];

export const YQuarterGate = [[new Complex(.85355, Math.sqrt(1/8)), new Complex(-Math.sqrt(1/8), -.14645)],
                                   [new Complex(Math.sqrt(1/8), .14645), new Complex(.85355, Math.sqrt(1/8))]];

export const YNegQuarterGate = [[new Complex(.85355, -Math.sqrt(1/8)), new Complex(Math.sqrt(1/8), -.14645)],
                                      [new Complex(-Math.sqrt(1/8), .14645), new Complex(.85355, -Math.sqrt(1/8))]];

export const XQuarterGate = [[new Complex(.85355, Math.sqrt(1/8)), new Complex(.14645, -Math.sqrt(1/8))],
                                   [new Complex(.14645, -Math.sqrt(1/8)), new Complex(.85355, Math.sqrt(1/8))]];

export const XNegQuarterGate = [[new Complex(.85355, -Math.sqrt(1/8)), new Complex(.14645, Math.sqrt(1/8))],
                                      [new Complex(.14645, Math.sqrt(1/8)), new Complex(.85355, -Math.sqrt(1/8))]];
