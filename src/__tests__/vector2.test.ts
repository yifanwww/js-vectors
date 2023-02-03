import { Vector2 } from '../vector2';

import { TestHelper } from './helper';

describe(`Test ${Vector2.name}'s constructor`, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L851
    it('should construct a vector instance', () => {
        const x = 1;
        const y = 2;
        const target = new Vector2(x, y);

        expect(target.x).toBe(x);
        expect(target.y).toBe(y);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L863
    it('should construct with no parameter', () => {
        const target = new Vector2();
        expect(target.x).toBe(0);
        expect(target.y).toBe(0);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L873
    it('should construct with special floating values', () => {
        const target = new Vector2(Number.NaN, Number.MAX_VALUE);
        expect(target.x).toBeNaN();
        expect(target.y).toBe(Number.MAX_VALUE);
    });
});

describe(`Test ${Vector2.name}'s predefined constant values`, () => {
    it('should be the correct vectors', () => {
        TestHelper.equal2(Vector2.ZERO, new Vector2(0, 0));
        TestHelper.equal2(Vector2.ONE, new Vector2(1, 1));
        TestHelper.equal2(Vector2.UNIT_X, new Vector2(1, 0));
        TestHelper.equal2(Vector2.UNIT_Y, new Vector2(0, 1));
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.fromArray.name}\``, () => {
    it('should new a vector from array', () => {
        const array = [1, 2, 3, 4];

        TestHelper.equal2(Vector2.fromArray(array), new Vector2(1, 2));
        TestHelper.equal2(Vector2.fromArray(array, 1), new Vector2(2, 3));
    });

    it('should throw error if wrong parameters', () => {
        const array = [1, 2, 3, 4];

        expect(() => Vector2.fromArray(array, -1)).toThrow(Error);
        expect(() => Vector2.fromArray(array, 4)).toThrow(Error);
        expect(() => Vector2.fromArray(array, 3)).toThrow(Error);
    });
});

describe(`Test static method \`${Vector2.name}.prototype.${Vector2.prototype.toArray.name}\``, () => {
    it('should new a vector from array', () => {
        const array: number[] = [];

        new Vector2(1, 2).toArray(array);
        new Vector2(3, 4).toArray(array, 2);

        expect(array).toStrictEqual([1, 2, 3, 4]);
    });

    it('should throw error if wrong parameters', () => {
        const array: number[] = [];
        expect(() => new Vector2(1, 2).toArray(array, -1)).toThrow(Error);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.set.name}\``, () => {
    it('should set components', () => {
        const x = 1;
        const y = 2;

        const vector = Vector2.ZERO;
        vector.set(x, y);

        TestHelper.equal2(vector, new Vector2(x, y));
    });

    it('should return the vector itself', () => {
        const vector = Vector2.ZERO;
        expect(vector.set(1, 2)).toBe(vector);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.setComponent.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L37
    it('should set a specified component', () => {
        const x = 1;
        const y = 2;

        const vector = Vector2.ZERO;
        vector.setComponent(0, x);
        vector.setComponent(1, y);
        expect(vector.x).toBe(x);
        expect(vector.y).toBe(y);
    });

    it('should return the vector itself', () => {
        const vector = Vector2.ZERO;
        expect(vector.setComponent(0, 1)).toBe(vector);
        expect(vector.setComponent(1, 2)).toBe(vector);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.getComponent.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L24
    it('should get a specified component value', () => {
        const x = 1;
        const y = 2;

        const vector = new Vector2(x, y);
        expect(vector.getComponent(0)).toBe(x);
        expect(vector.getComponent(1)).toBe(y);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.clone.name}\``, () => {
    it('should clone itself', () => {
        const vector = new Vector2(1, 2);
        TestHelper.equal2(vector.clone(), new Vector2(1, 2));
    });

    it('should return a new vector', () => {
        const vector = new Vector2(1, 2);
        expect(vector.clone()).not.toBe(vector);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.copy.name}\``, () => {
    it('should copy another vector', () => {
        const a = new Vector2(1, 2);
        const b = Vector2.ZERO;
        TestHelper.equal2(b.copy(a), a);
    });

    it('should return the vector itself', () => {
        const a = new Vector2(1, 2);
        const b = Vector2.ZERO;
        expect(b.copy(a)).toBe(b);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.eq.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L950
    it('should copy another vector', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(1, 2);

        expect(a.eq(b)).toBeTruthy();

        b.x = 10;
        expect(a.eq(b)).toBeFalsy();
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.ne.name}\``, () => {
    it('should copy another vector', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(1, 2);

        expect(a.ne(b)).toBeFalsy();

        b.x = 10;
        expect(a.ne(b)).toBeTruthy();
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.add.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L836
    it('should add two vectors', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        TestHelper.equal2(Vector2.add(a, b), new Vector2(4, 6));
    });

    it('should not mutate vectors', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        Vector2.add(a, b);

        TestHelper.equal2(a, new Vector2(1, 2));
        TestHelper.equal2(b, new Vector2(3, 4));
    });

    it('should return a new vector', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        const actual = Vector2.add(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.add.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L836
    it('should add two vectors', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        TestHelper.equal2(a.add(b), new Vector2(4, 6));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        a.add(b);

        TestHelper.equal2(a, new Vector2(4, 6));
        TestHelper.equal2(b, new Vector2(3, 4));
    });

    it('should return the vector itself', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        const actual = a.add(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.addScalar.name}\``, () => {
    it('should add a vector and a scalar value', () => {
        const a = new Vector2(1, 2);
        const b = 3;

        TestHelper.equal2(Vector2.addScalar(a, b), new Vector2(4, 5));
    });

    it('should not mutate vectors', () => {
        const a = new Vector2(1, 2);
        const b = 3;

        Vector2.addScalar(a, b);

        TestHelper.equal2(a, new Vector2(1, 2));
    });

    it('should return a new vector', () => {
        const a = new Vector2(1, 2);
        const b = 3;

        const actual = Vector2.addScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.addScalar.name}\``, () => {
    it('should add a vector and a scalar value', () => {
        const a = new Vector2(1, 2);
        const b = 3;

        TestHelper.equal2(a.addScalar(b), new Vector2(4, 5));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector2(1, 2);
        const b = 3;

        a.addScalar(b);

        TestHelper.equal2(a, new Vector2(4, 5));
    });

    it('should return the vector itself', () => {
        const a = new Vector2(1, 2);
        const b = 3;

        const actual = a.addScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.sub.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L718
    it('should subtract a vector from a vector', () => {
        const a = new Vector2(1, 6);
        const b = new Vector2(5, 2);

        TestHelper.equal2(Vector2.sub(a, b), new Vector2(-4, 4));
    });

    it('should not mutate vectors', () => {
        const a = new Vector2(1, 6);
        const b = new Vector2(5, 2);

        Vector2.sub(a, b);

        TestHelper.equal2(a, new Vector2(1, 6));
        TestHelper.equal2(b, new Vector2(5, 2));
    });

    it('should return a new vector', () => {
        const a = new Vector2(1, 6);
        const b = new Vector2(5, 2);

        const actual = Vector2.sub(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.sub.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L718
    it('should subtract a vector from a vector', () => {
        const a = new Vector2(1, 6);
        const b = new Vector2(5, 2);

        TestHelper.equal2(a.sub(b), new Vector2(-4, 4));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector2(1, 6);
        const b = new Vector2(5, 2);

        a.sub(b);

        TestHelper.equal2(a, new Vector2(-4, 4));
        TestHelper.equal2(b, new Vector2(5, 2));
    });

    it('should return the vector itself', () => {
        const a = new Vector2(1, 6);
        const b = new Vector2(5, 2);

        const actual = a.sub(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.subScalar.name}\``, () => {
    it('should subtract a scalar value from a vector', () => {
        const a = new Vector2(1, 4);
        const b = 3;

        TestHelper.equal2(Vector2.subScalar(a, b), new Vector2(-2, 1));
    });

    it('should not mutate vectors', () => {
        const a = new Vector2(1, 4);
        const b = 3;

        Vector2.subScalar(a, b);

        TestHelper.equal2(a, new Vector2(1, 4));
    });

    it('should return a new vector', () => {
        const a = new Vector2(1, 2);
        const b = 3;

        const actual = Vector2.subScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.subScalar.name}\``, () => {
    it('should subtract a scalar value from a vector', () => {
        const a = new Vector2(1, 4);
        const b = 3;

        TestHelper.equal2(a.subScalar(b), new Vector2(-2, 1));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector2(1, 4);
        const b = 3;

        a.subScalar(b);

        TestHelper.equal2(a, new Vector2(-2, 1));
    });

    it('should return the vector itself', () => {
        const a = new Vector2(1, 4);
        const b = 3;

        const actual = a.subScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.mul.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L761
    it('should multiply a vector by a vector', () => {
        const a = new Vector2(2, 3);
        const b = new Vector2(4, 5);

        TestHelper.equal2(Vector2.mul(a, b), new Vector2(8, 15));
    });

    it('should not mutate vectors', () => {
        const a = new Vector2(2, 3);
        const b = new Vector2(4, 5);

        Vector2.mul(a, b);

        TestHelper.equal2(a, new Vector2(2, 3));
        TestHelper.equal2(b, new Vector2(4, 5));
    });

    it('should return a new vector', () => {
        const a = new Vector2(2, 3);
        const b = new Vector2(4, 5);

        const actual = Vector2.mul(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.mul.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L761
    it('should multiply a vector by a vector', () => {
        const a = new Vector2(2, 3);
        const b = new Vector2(4, 5);

        TestHelper.equal2(a.mul(b), new Vector2(8, 15));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector2(2, 3);
        const b = new Vector2(4, 5);

        a.mul(b);

        TestHelper.equal2(a, new Vector2(8, 15));
        TestHelper.equal2(b, new Vector2(4, 5));
    });

    it('should return the vector itself', () => {
        const a = new Vector2(2, 3);
        const b = new Vector2(4, 5);

        const actual = a.mul(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.mulScalar.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L733
    it('should multiply a vector by from a scalar value', () => {
        const a = new Vector2(2, 3);
        const b = 2;

        TestHelper.equal2(Vector2.mulScalar(a, b), new Vector2(4, 6));
    });

    it('should not mutate vectors', () => {
        const a = new Vector2(2, 3);
        const b = 2;

        Vector2.mulScalar(a, b);

        TestHelper.equal2(a, new Vector2(2, 3));
    });

    it('should return a new vector', () => {
        const a = new Vector2(2, 3);
        const b = 2;

        const actual = Vector2.mulScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.mulScalar.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L733
    it('should multiply a vector by from a scalar value', () => {
        const a = new Vector2(2, 3);
        const b = 2;

        TestHelper.equal2(a.mulScalar(b), new Vector2(4, 6));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector2(2, 3);
        const b = 2;

        a.mulScalar(b);

        TestHelper.equal2(a, new Vector2(4, 6));
    });

    it('should return the vector itself', () => {
        const a = new Vector2(2, 3);
        const b = 2;

        const actual = a.mulScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.div.name}\``, () => {
    it('should divide a vector by a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L792
        {
            const a = new Vector2(2, 3);
            const b = new Vector2(4, 5);

            TestHelper.equal2(Vector2.div(a, b), new Vector2(2 / 4, 3 / 5));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L823
        {
            const a = new Vector2(0.047, -3);
            const b = new Vector2();

            TestHelper.equal2(Vector2.div(a, b), new Vector2(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY));
        }
    });

    it('should not mutate vectors', () => {
        const a = new Vector2(2, 3);
        const b = new Vector2(4, 5);

        Vector2.div(a, b);

        TestHelper.equal2(a, new Vector2(2, 3));
        TestHelper.equal2(b, new Vector2(4, 5));
    });

    it('should return a new vector', () => {
        const a = new Vector2(2, 3);
        const b = new Vector2(4, 5);

        const actual = Vector2.div(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.div.name}\``, () => {
    it('should divide a vector by a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L792
        {
            const a = new Vector2(2, 3);
            const b = new Vector2(4, 5);

            TestHelper.equal2(a.div(b), new Vector2(2 / 4, 3 / 5));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L823
        {
            const a = new Vector2(0.047, -3);
            const b = new Vector2();

            TestHelper.equal2(a.div(b), new Vector2(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY));
        }
    });

    it('should mutate the vector itself', () => {
        const a = new Vector2(2, 3);
        const b = new Vector2(4, 5);

        a.div(b);

        TestHelper.equal2(a, new Vector2(2 / 4, 3 / 5));
        TestHelper.equal2(b, new Vector2(4, 5));
    });

    it('should return the vector itself', () => {
        const a = new Vector2(2, 3);
        const b = new Vector2(4, 5);

        const actual = a.div(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.divScalar.name}\``, () => {
    it('should divide a vector by from a scalar value', () => {
        {
            const a = new Vector2(2, 3);
            const b = 4;

            TestHelper.equal2(Vector2.divScalar(a, b), new Vector2(2 / 4, 3 / 4));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L808
        {
            const a = new Vector2(-2, 3);
            const b = 0;

            TestHelper.equal2(Vector2.divScalar(a, b), new Vector2(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY));
        }
    });

    it('should not mutate vectors', () => {
        const a = new Vector2(2, 3);
        const b = 4;

        Vector2.divScalar(a, b);

        TestHelper.equal2(a, new Vector2(2, 3));
    });

    it('should return a new vector', () => {
        const a = new Vector2(2, 3);
        const b = 4;

        const actual = Vector2.divScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.divScalar.name}\``, () => {
    it('should divide a vector by from a scalar value', () => {
        {
            const a = new Vector2(2, 3);
            const b = 4;

            TestHelper.equal2(a.divScalar(b), new Vector2(2 / 4, 3 / 4));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L808
        {
            const a = new Vector2(-2, 3);
            const b = 0;

            TestHelper.equal2(a.divScalar(b), new Vector2(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY));
        }
    });

    it('should mutate the vector itself', () => {
        const a = new Vector2(2, 3);
        const b = 4;

        a.divScalar(b);

        TestHelper.equal2(a, new Vector2(2 / 4, 3 / 4));
    });

    it('should return the vector itself', () => {
        const a = new Vector2(2, 3);
        const b = 4;

        const actual = a.divScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.max.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L332
    it('should get maximum vector', () => {
        const a = new Vector2(-1, 4);
        const b = new Vector2(2, 1);

        TestHelper.equal2(Vector2.max(a, b), new Vector2(2, 4));
    });

    it('should return a new vector', () => {
        const a = new Vector2(-1, 4);
        const b = new Vector2(2, 1);

        const actual = Vector2.max(a, b);
        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.max.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L332
    it('should get maximum vector', () => {
        const a = new Vector2(-1, 4);
        const b = new Vector2(2, 1);

        TestHelper.equal2(a.max(b), new Vector2(2, 4));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector2(-1, 4);
        const b = new Vector2(2, 1);

        a.max(b);

        TestHelper.equal2(a, new Vector2(2, 4));
        TestHelper.equal2(b, new Vector2(2, 1));
    });

    it('should return the vector itself', () => {
        const a = new Vector2(-1, 4);
        const b = new Vector2(2, 1);

        expect(a.max(b)).toBe(a);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.min.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L297
    it('should get minimum vector', () => {
        const a = new Vector2(-1, 4);
        const b = new Vector2(2, 1);

        TestHelper.equal2(Vector2.min(a, b), new Vector2(-1, 1));
    });

    it('should return a new vector', () => {
        const a = new Vector2(-1, 4);
        const b = new Vector2(2, 1);

        const actual = Vector2.min(a, b);
        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.min.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L297
    it('should get minimum vector', () => {
        const a = new Vector2(-1, 4);
        const b = new Vector2(2, 1);

        TestHelper.equal2(a.min(b), new Vector2(-1, 1));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector2(-1, 4);
        const b = new Vector2(2, 1);

        a.min(b);

        TestHelper.equal2(a, new Vector2(-1, 1));
        TestHelper.equal2(b, new Vector2(2, 1));
    });

    it('should return the vector itself', () => {
        const a = new Vector2(-1, 4);
        const b = new Vector2(2, 1);

        expect(a.min(b)).toBe(a);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.clamp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L352
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector2(0.5, 0.3);
        const min = new Vector2(0, 0.1);
        const max = new Vector2(1, 1.1);

        TestHelper.equal2(Vector2.clamp(x, min, max), new Vector2(0.5, 0.3));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L357
    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector2(2, 3);
        const min = new Vector2(0, 0.1);
        const max = new Vector2(1, 1.1);

        TestHelper.equal2(Vector2.clamp(x, min, max), max);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L362
    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector2(-1, -2);
        const min = new Vector2(0, 0.1);
        const max = new Vector2(1, 1.1);

        TestHelper.equal2(Vector2.clamp(x, min, max), min);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L367
    it('should restrict a vector (combination case)', () => {
        const x = new Vector2(-2, 4);
        const min = new Vector2(0, 0.1);
        const max = new Vector2(1, 1.1);

        TestHelper.equal2(Vector2.clamp(x, min, max), new Vector2(min.x, max.y));
    });

    it('should restrict a vector (min > max)', () => {
        const max = new Vector2(0, 0.1);
        const min = new Vector2(1, 1.1);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L376
        TestHelper.equal2(Vector2.clamp(new Vector2(0.5, 0.3), min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L383
        TestHelper.equal2(Vector2.clamp(new Vector2(2, 3), min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L389
        TestHelper.equal2(Vector2.clamp(new Vector2(-1, -2), min, max), max);
    });

    it('should return a new vector', () => {
        const x = new Vector2(0.5, 0.3);
        const min = new Vector2(0, 0.1);
        const max = new Vector2(1, 1.1);

        const actual = Vector2.clamp(x, min, max);
        expect(actual).not.toBe(x);
        expect(actual).not.toBe(min);
        expect(actual).not.toBe(max);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.clamp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L352
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector2(0.5, 0.3);
        const min = new Vector2(0, 0.1);
        const max = new Vector2(1, 1.1);

        TestHelper.equal2(x.clamp(min, max), new Vector2(0.5, 0.3));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L357
    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector2(2, 3);
        const min = new Vector2(0, 0.1);
        const max = new Vector2(1, 1.1);

        TestHelper.equal2(x.clamp(min, max), max);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L362
    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector2(-1, -2);
        const min = new Vector2(0, 0.1);
        const max = new Vector2(1, 1.1);

        TestHelper.equal2(x.clamp(min, max), min);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L367
    it('should restrict a vector (combination case)', () => {
        const x = new Vector2(-2, 4);
        const min = new Vector2(0, 0.1);
        const max = new Vector2(1, 1.1);

        TestHelper.equal2(x.clamp(min, max), new Vector2(min.x, max.y));
    });

    it('should restrict a vector (min > max)', () => {
        const max = new Vector2(0, 0.1);
        const min = new Vector2(1, 1.1);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L376
        TestHelper.equal2(new Vector2(0.5, 0.3).clamp(min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L383
        TestHelper.equal2(new Vector2(2, 3).clamp(min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L389
        TestHelper.equal2(new Vector2(-1, -2).clamp(min, max), max);
    });

    it('should mutate the vector itself', () => {
        const x = new Vector2(0.5, 0.3);
        const min = new Vector2(0, 0.1);
        const max = new Vector2(1, 1.1);

        x.clamp(min, max);
        TestHelper.equal2(x, new Vector2(0.5, 0.3));
    });

    it('should return the vector itself', () => {
        const x = new Vector2(0.5, 0.3);
        const min = new Vector2(0, 0.1);
        const max = new Vector2(1, 1.1);

        const actual = x.clamp(min, max);
        expect(actual).toBe(x);
        expect(actual).not.toBe(min);
        expect(actual).not.toBe(max);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.clampScalar.name}\``, () => {
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector2(0.5, 0.3);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal2(Vector2.clampScalar(x, min, max), new Vector2(0.5, 0.3));
    });

    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector2(2, 3);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal2(Vector2.clampScalar(x, min, max), new Vector2(max, max));
    });

    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector2(-1, -2);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal2(Vector2.clampScalar(x, min, max), new Vector2(min, min));
    });

    it('should restrict a vector (combination case)', () => {
        const x = new Vector2(-2, 4);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal2(Vector2.clampScalar(x, min, max), new Vector2(min, max));
    });

    it('should restrict a vector (min > max)', () => {
        const max = 0.1;
        const min = 1.1;

        TestHelper.equal2(Vector2.clampScalar(new Vector2(0.5, 0.3), min, max), new Vector2(max, max));
        TestHelper.equal2(Vector2.clampScalar(new Vector2(2, 3), min, max), new Vector2(max, max));
        TestHelper.equal2(Vector2.clampScalar(new Vector2(-1, -2), min, max), new Vector2(max, max));
    });

    it('should return a new vector', () => {
        const x = new Vector2(0.5, 0.3);
        const min = 0.1;
        const max = 1.1;

        const actual = Vector2.clampScalar(x, min, max);
        expect(actual).not.toBe(x);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.clampScalar.name}\``, () => {
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector2(0.5, 0.3);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal2(x.clampScalar(min, max), new Vector2(0.5, 0.3));
    });

    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector2(2, 3);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal2(x.clampScalar(min, max), new Vector2(max, max));
    });

    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector2(-1, -2);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal2(x.clampScalar(min, max), new Vector2(min, min));
    });

    it('should restrict a vector (combination case)', () => {
        const x = new Vector2(-2, 4);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal2(x.clampScalar(min, max), new Vector2(min, max));
    });

    it('should restrict a vector (min > max)', () => {
        const max = 0.1;
        const min = 1.1;

        TestHelper.equal2(new Vector2(0.5, 0.3).clampScalar(min, max), new Vector2(max, max));
        TestHelper.equal2(new Vector2(2, 3).clampScalar(min, max), new Vector2(max, max));
        TestHelper.equal2(new Vector2(-1, -2).clampScalar(min, max), new Vector2(max, max));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector2(0.5, 0.3);
        const min = 0.1;
        const max = 1.1;

        x.clampScalar(min, max);
        TestHelper.equal2(x, new Vector2(0.5, 0.3));
    });

    it('should return the vector itself', () => {
        const x = new Vector2(0.5, 0.3);
        const min = 0.1;
        const max = 1.1;

        const actual = x.clampScalar(min, max);
        expect(actual).toBe(x);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.floor.name}\``, () => {
    it('should round down a vector', () => {
        TestHelper.equal2(Vector2.floor(new Vector2(0.1, 1.1)), new Vector2(0, 1));
        TestHelper.equal2(Vector2.floor(new Vector2(-0.1, -1.1)), new Vector2(-1, -2));
    });

    it('should return a new vector', () => {
        const x = new Vector2(0.1, 1.1);
        expect(Vector2.floor(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.floor.name}\``, () => {
    it('should round down a vector', () => {
        TestHelper.equal2(new Vector2(0.1, 1.1).floor(), new Vector2(0, 1));
        TestHelper.equal2(new Vector2(-0.1, -1.1).floor(), new Vector2(-1, -2));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector2(0.1, 1.1);
        x.floor();
        TestHelper.equal2(x, new Vector2(0, 1));
    });

    it('should return the vector itself', () => {
        const x = new Vector2(0.1, 1.1);
        expect(x.floor()).toBe(x);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.ceil.name}\``, () => {
    it('should round up a vector', () => {
        TestHelper.equal2(Vector2.ceil(new Vector2(0.1, 1.1)), new Vector2(1, 2));
        TestHelper.equal2(Vector2.ceil(new Vector2(-0.1, -1.1)), new Vector2(-0, -1));
    });

    it('should return a new vector', () => {
        const x = new Vector2(0.1, 1.1);
        expect(Vector2.ceil(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.ceil.name}\``, () => {
    it('should round up a vector', () => {
        TestHelper.equal2(new Vector2(0.1, 1.1).ceil(), new Vector2(1, 2));
        TestHelper.equal2(new Vector2(-0.1, -1.1).ceil(), new Vector2(-0, -1));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector2(0.1, 1.1);
        x.ceil();
        TestHelper.equal2(x, new Vector2(1, 2));
    });

    it('should return the vector itself', () => {
        const x = new Vector2(0.1, 1.1);
        expect(x.ceil()).toBe(x);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.round.name}\``, () => {
    it('should round a vector', () => {
        TestHelper.equal2(Vector2.round(new Vector2(0.4, 0.5)), new Vector2(0, 1));
        TestHelper.equal2(Vector2.round(new Vector2(-0.6, -0.5)), new Vector2(-1, -0));
    });

    it('should return a new vector', () => {
        const x = new Vector2(0.4, 0.5);
        expect(Vector2.round(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.round.name}\``, () => {
    it('should round a vector', () => {
        TestHelper.equal2(new Vector2(0.4, 0.5).round(), new Vector2(0, 1));
        TestHelper.equal2(new Vector2(-0.6, -0.5).round(), new Vector2(-1, -0));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector2(0.4, 0.5);
        x.round();
        TestHelper.equal2(x, new Vector2(0, 1));
    });

    it('should return the vector itself', () => {
        const x = new Vector2(0.4, 0.5);
        expect(x.round()).toBe(x);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.roundToZero.name}\``, () => {
    it('should round a vector towards zero', () => {
        TestHelper.equal2(Vector2.roundToZero(new Vector2(0.4, 1.5)), new Vector2(0, 1));
        TestHelper.equal2(Vector2.roundToZero(new Vector2(-0.4, -1.5)), new Vector2(-0, -1));
    });

    it('should return a new vector', () => {
        const x = new Vector2(0.4, 1.5);
        expect(Vector2.roundToZero(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.roundToZero.name}\``, () => {
    it('should round a vector towards zero', () => {
        TestHelper.equal2(new Vector2(0.4, 1.5).roundToZero(), new Vector2(0, 1));
        TestHelper.equal2(new Vector2(-0.4, -1.5).roundToZero(), new Vector2(-0, -1));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector2(0.4, 1.5);
        x.roundToZero();
        TestHelper.equal2(x, new Vector2(0, 1));
    });

    it('should return the vector itself', () => {
        const x = new Vector2(0.4, 1.5);
        expect(x.roundToZero()).toBe(x);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.neg.name}\``, () => {
    it('should negate a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L677
        TestHelper.equal2(Vector2.neg(new Vector2(1, 2)), new Vector2(-1, -2));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L694
        TestHelper.equal2(
            Vector2.neg(new Vector2(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)),
            new Vector2(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY),
        );

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L707
        {
            const x = new Vector2(Number.NaN, 0);
            const actual = Vector2.neg(x);

            expect(actual.x).toBeNaN();
            expect(actual.y).toStrictEqual(-0);
        }
    });

    it('should return a new vector', () => {
        const x = new Vector2(1, 2);
        expect(Vector2.neg(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.neg.name}\``, () => {
    it('should negate a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L677
        TestHelper.equal2(new Vector2(1, 2).neg(), new Vector2(-1, -2));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L694
        TestHelper.equal2(
            new Vector2(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY).neg(),
            new Vector2(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY),
        );

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L707
        {
            const x = new Vector2(Number.NaN, 0);
            const actual = Vector2.neg(x);

            expect(actual.x).toBeNaN();
            expect(actual.y).toStrictEqual(-0);
        }
    });

    it('should mutate the vector itself', () => {
        const x = new Vector2(1, 2);
        x.neg();
        TestHelper.equal2(x, new Vector2(-1, -2));
    });

    it('should return the vector itself', () => {
        const x = new Vector2(1, 2);
        expect(x.neg()).toBe(x);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.dot.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L196
    it('should get dot product of vectors', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        expect(Vector2.dot(a, b)).toBe(11);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L211
    it('should get dot product of perpendicular vectors', () => {
        const a = new Vector2(1.55, 1.55);
        const b = new Vector2(-1.55, 1.55);

        expect(Vector2.dot(a, b)).toBe(0);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.cross.name}\``, () => {
    it('should get cross product of vectors', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        expect(Vector2.cross(a, b)).toBe(-2);
    });

    it('should get cross product of same vectors', () => {
        const a = new Vector2(1.55, 1.55);
        const b = new Vector2(1.55, 1.55);

        expect(Vector2.cross(a, b)).toBe(0);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.lengthSq.name}\``, () => {
    it('should get squared length', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L268
        expect(new Vector2(2, 4).lengthSq()).toBe(20);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L285
        expect(new Vector2(0, 0).lengthSq()).toBe(0);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.length.name}\``, () => {
    it('should get length', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L235
        expect(new Vector2(2, 4).length()).toBe(Math.sqrt(20));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L252
        expect(new Vector2(0, 0).length()).toBe(0);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.normalize.name}\``, () => {
    it('should get normalize a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L644
        TestHelper.equal2(Vector2.normalize(new Vector2(2, 3)), new Vector2(0.5547001962252291, 0.8320502943378437));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L657
        {
            const actual = Vector2.normalize(new Vector2());
            expect(actual.x).toBeNaN();
            expect(actual.y).toBeNaN();
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L667
        TestHelper.equal2(Vector2.normalize(new Vector2(Number.MAX_VALUE, Number.MAX_VALUE)), new Vector2());
    });

    it('should return a new vector', () => {
        const x = new Vector2(2, 3);
        expect(Vector2.normalize(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.normalize.name}\``, () => {
    it('should get normalize a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L644
        TestHelper.equal2(new Vector2(2, 3).normalize(), new Vector2(0.5547001962252291, 0.8320502943378437));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L657
        {
            const actual = new Vector2().normalize();
            expect(actual.x).toBeNaN();
            expect(actual.y).toBeNaN();
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L667
        TestHelper.equal2(new Vector2(Number.MAX_VALUE, Number.MAX_VALUE).normalize(), new Vector2());
    });

    it('should mutate the vector itself', () => {
        const x = new Vector2(2, 3);
        x.normalize();
        TestHelper.equal2(x, new Vector2(0.5547001962252291, 0.8320502943378437));
    });

    it('should return the vector itself', () => {
        const x = new Vector2(2, 3);
        expect(x.normalize()).toBe(x);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.abs.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L1208
    it('should get absolute value of a vector', () => {
        TestHelper.equal2(Vector2.abs(new Vector2(-2.5, 2)), new Vector2(2.5, 2));
        TestHelper.equal2(
            Vector2.abs(new Vector2(0, Number.NEGATIVE_INFINITY)),
            new Vector2(0, Number.POSITIVE_INFINITY),
        );
    });

    it('should return a new vector', () => {
        const x = new Vector2(-2.5, 2);
        expect(Vector2.abs(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.abs.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L1208
    it('should get absolute value of a vector', () => {
        TestHelper.equal2(new Vector2(-2.5, 2).abs(), new Vector2(2.5, 2));
        TestHelper.equal2(new Vector2(0, Number.NEGATIVE_INFINITY).abs(), new Vector2(0, Number.POSITIVE_INFINITY));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector2(-2.5, 2);
        x.abs();
        TestHelper.equal2(x, new Vector2(2.5, 2));
    });

    it('should return the vector itself', () => {
        const x = new Vector2(-2.5, 2);
        expect(x.abs()).toBe(x);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.distanceSq.name}\``, () => {
    it('should get squared distance between two vectors', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L182
        expect(Vector2.distanceSq(new Vector2(1, 2), new Vector2(3, 4))).toBe(8);

        expect(Vector2.distanceSq(new Vector2(1.051, 2.05), new Vector2(1.051, 2.05))).toBe(0);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.distance.name}\``, () => {
    it('should get distance between two vectors', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L156
        expect(Vector2.distance(new Vector2(1, 2), new Vector2(3, 4))).toBe(Math.sqrt(8));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L171
        expect(Vector2.distance(new Vector2(1.051, 2.05), new Vector2(1.051, 2.05))).toBe(0);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.lerp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L398
    it('should perform a linear interpolation', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        TestHelper.equal2(Vector2.lerp(a, b, 0.5), new Vector2(2, 3));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L414
    it('should perform a linear interpolation with factor 0', () => {
        const a = Vector2.ZERO;
        const b = new Vector2(3.18, 4.25);

        TestHelper.equal2(Vector2.lerp(a, b, 0), Vector2.ZERO);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L428
    it('should perform a linear interpolation with factor 1', () => {
        const a = Vector2.ZERO;
        const b = new Vector2(3.18, 4.25);

        TestHelper.equal2(Vector2.lerp(a, b, 1), new Vector2(3.18, 4.25));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L442
    it('should perform a linear interpolation with factor > 1', () => {
        const a = Vector2.ZERO;
        const b = new Vector2(3.18, 4.25);

        TestHelper.equal2(Vector2.lerp(a, b, 2), new Vector2(6.36, 8.5));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L456
    it('should perform a linear interpolation with factor < 0', () => {
        const a = Vector2.ZERO;
        const b = new Vector2(3.18, 4.25);

        TestHelper.equal2(Vector2.lerp(a, b, -2), new Vector2(-6.36, -8.5));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L470
    it('should perform a linear interpolation with special vectors', () => {
        const a = new Vector2(45.67, 90.0);
        const b = new Vector2(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
        const actual = Vector2.lerp(a, b, 0.408);

        expect(actual.x).toBe(Number.POSITIVE_INFINITY);
        expect(actual.y).toBe(Number.NEGATIVE_INFINITY);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L484
    it('should perform a linear interpolation with same vectors', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(1, 2);

        TestHelper.equal2(Vector2.lerp(a, b, 0.5), new Vector2(1, 2));
    });

    it('should return a new vector', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        expect(Vector2.lerp(a, b, 0.5)).not.toBe(a);
        expect(Vector2.lerp(a, b, 0.5)).not.toBe(b);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.lerp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L398
    it('should perform a linear interpolation', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        TestHelper.equal2(a.lerp(b, 0.5), new Vector2(2, 3));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L414
    it('should perform a linear interpolation with factor 0', () => {
        const a = Vector2.ZERO;
        const b = new Vector2(3.18, 4.25);

        TestHelper.equal2(a.lerp(b, 0), Vector2.ZERO);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L428
    it('should perform a linear interpolation with factor 1', () => {
        const a = Vector2.ZERO;
        const b = new Vector2(3.18, 4.25);

        TestHelper.equal2(a.lerp(b, 1), new Vector2(3.18, 4.25));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L442
    it('should perform a linear interpolation with factor > 1', () => {
        const a = Vector2.ZERO;
        const b = new Vector2(3.18, 4.25);

        TestHelper.equal2(a.lerp(b, 2), new Vector2(6.36, 8.5));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L456
    it('should perform a linear interpolation with factor < 0', () => {
        const a = Vector2.ZERO;
        const b = new Vector2(3.18, 4.25);

        TestHelper.equal2(a.lerp(b, -2), new Vector2(-6.36, -8.5));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L470
    it('should perform a linear interpolation with special vectors', () => {
        const a = new Vector2(45.67, 90.0);
        const b = new Vector2(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
        const actual = a.lerp(b, 0.408);

        expect(actual.x).toBe(Number.POSITIVE_INFINITY);
        expect(actual.y).toBe(Number.NEGATIVE_INFINITY);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L484
    it('should perform a linear interpolation with same vectors', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(1, 2);

        TestHelper.equal2(a.lerp(b, 0.5), new Vector2(1, 2));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        a.lerp(b, 0.5);

        TestHelper.equal2(a, new Vector2(2, 3));
    });

    it('should return the vector itself', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(3, 4);

        const actual = a.lerp(b, 0.5);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.sqrt.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L1220
    it('should get square root of a vector', () => {
        TestHelper.equal2(Vector2.sqrt(new Vector2(5.5, 4.5)), new Vector2(2.345207879911715, 2.1213203435596424));

        const actual = Vector2.sqrt(new Vector2(-2.5, 2));
        expect(actual.x).toBeNaN();
    });

    it('should return a new vector', () => {
        const x = new Vector2(-2.5, 2);
        expect(Vector2.sqrt(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector2.name}.prototype.${Vector2.prototype.sqrt.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L1220
    it('should get square root of a vector', () => {
        TestHelper.equal2(new Vector2(5.5, 4.5).sqrt(), new Vector2(2.345207879911715, 2.1213203435596424));

        const actual = new Vector2(-2.5, 2).sqrt();
        expect(actual.x).toBeNaN();
    });

    it('should mutate the vector itself', () => {
        const x = new Vector2(5.5, 4.5);
        x.sqrt();
        TestHelper.equal2(x, new Vector2(2.345207879911715, 2.1213203435596424));
    });

    it('should return the vector itself', () => {
        const x = new Vector2(-2.5, 2);
        expect(x.sqrt()).toBe(x);
    });
});

describe(`Test static method \`${Vector2.name}.${Vector2.reflect.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L1156
    it('should reflect a vector to another vector', () => {
        const vector = Vector2.normalize(Vector2.ONE);

        // Reflect on XZ plane
        {
            const n = new Vector2(0, 1);
            TestHelper.equal2(Vector2.reflect(vector, n), new Vector2(vector.x, -vector.y));
        }

        // Reflect on XY plane
        {
            const n = Vector2.ZERO;
            TestHelper.equal2(Vector2.reflect(vector, n), new Vector2(vector.x, vector.y));
        }

        // Reflect on YZ plane
        {
            const n = new Vector2(1, 0);
            TestHelper.equal2(Vector2.reflect(vector, n), new Vector2(-vector.x, vector.y));
        }
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L1182
    it('should reflect a vector when normal and source are the same', () => {
        const vector = Vector2.normalize(new Vector2(0.45, 1.28));

        TestHelper.equal2(Vector2.reflect(vector, vector), Vector2.neg(vector), 15);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L1196
    it('should reflect a vector when normal and source are negation', () => {
        const n = Vector2.normalize(new Vector2(0.45, 1.28));
        const vector = Vector2.neg(n);

        TestHelper.equal2(Vector2.reflect(vector, n), n, 15);
    });

    it('should return a new vector', () => {
        const a = new Vector2(1, 2);
        const b = new Vector2(1, 2);
        const actual = Vector2.reflect(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});
