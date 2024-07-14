import {Complex} from "./Complex";

export const XGate = [[new Complex(0, 0), new Complex(1, 0)], 
                            [new Complex(1, 0), new Complex(0, 0)]];

export const YGate = [[new Complex(0, 0), new Complex(0, -1)],
                            [new Complex(0, 1), new Complex(0, 0)]];

export const ZGate = [[new Complex(1, 0), new Complex(0, 0)],
                            [new Complex(0, 0), new Complex(-1, 0)]];

export const HGate = [[new Complex(Math.SQRT1_2, 0), new Complex(Math.SQRT1_2, 0)],
                            [new Complex(Math.SQRT1_2, 0), new Complex(-Math.SQRT1_2, 0)]];