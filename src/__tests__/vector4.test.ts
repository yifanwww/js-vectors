import { Vector3 } from '../vector3';
import { Vector4 } from '../vector4';

import { TestHelper } from './helper';

describe(`Test ${Vector4.name}'s constructor`, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1110
    it('should construct a vector instance', () => {
        const x = 1;
        const y = 2;
        const z = 3;
        const w = 3;
        const target = new Vector4(x, y, z, w);

        expect(target.x).toBe(x);
        expect(target.y).toBe(y);
        expect(target.z).toBe(z);
        expect(target.w).toBe(w);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1152
    it('should construct with no parameter', () => {
        const target = new Vector4();
        expect(target.x).toBe(0);
        expect(target.y).toBe(0);
        expect(target.z).toBe(0);
        expect(target.w).toBe(0);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1165
    it('should construct with special floating values', () => {
        const target = new Vector4(Number.NaN, Number.MAX_VALUE, Number.POSITIVE_INFINITY, Number.EPSILON);
        expect(target.x).toBeNaN();
        expect(target.y).toBe(Number.MAX_VALUE);
        expect(target.z).toBe(Number.POSITIVE_INFINITY);
        expect(target.w).toBe(Number.EPSILON);
    });
});

describe(`Test ${Vector4.name}'s predefined constant values`, () => {
    it('should be the correct vectors', () => {
        TestHelper.equal4(Vector4.ZERO, new Vector4(0, 0, 0, 0));
        TestHelper.equal4(Vector4.ONE, new Vector4(1, 1, 1, 1));
        TestHelper.equal4(Vector4.UNIT_X, new Vector4(1, 0, 0, 0));
        TestHelper.equal4(Vector4.UNIT_Y, new Vector4(0, 1, 0, 0));
        TestHelper.equal4(Vector4.UNIT_Z, new Vector4(0, 0, 1, 0));
        TestHelper.equal4(Vector4.UNIT_W, new Vector4(0, 0, 0, 1));
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.fromArray.name}\``, () => {
    it('should new a vector from array', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8];

        TestHelper.equal4(Vector4.fromArray(array), new Vector4(1, 2, 3, 4));
        TestHelper.equal4(Vector4.fromArray(array, 4), new Vector4(5, 6, 7, 8));
    });

    it('should throw error if wrong parameters', () => {
        const array = [1, 2, 3, 4];

        expect(() => Vector4.fromArray(array, -1)).toThrow(Error);
        expect(() => Vector4.fromArray(array, 4)).toThrow(Error);
        expect(() => Vector4.fromArray(array, 3)).toThrow(Error);
    });
});

describe(`Test static method \`${Vector4.name}.prototype.${Vector4.prototype.toArray.name}\``, () => {
    it('should new a vector from array', () => {
        const array: number[] = [];

        new Vector4(1, 2, 3, 4).toArray(array);
        new Vector4(5, 6, 7, 8).toArray(array, 4);

        expect(array).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should throw error if wrong parameters', () => {
        const array: number[] = [];
        expect(() => new Vector4(1, 2, 3, 4).toArray(array, -1)).toThrow(Error);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.set.name}\``, () => {
    it('should set components', () => {
        const x = 1;
        const y = 2;
        const z = 3;
        const w = 4;

        const vector = Vector4.ZERO;
        vector.set(x, y, z, w);

        TestHelper.equal4(vector, new Vector4(x, y, z, w));
    });

    it('should return the vector itself', () => {
        const vector = Vector4.ZERO;
        expect(vector.set(1, 2, 3, 4)).toBe(vector);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.setComponent.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L39
    it('should set a specified component', () => {
        const x = 1;
        const y = 2;
        const z = 3;
        const w = 4;

        const vector = Vector4.ZERO;
        vector.setComponent(0, x);
        vector.setComponent(1, y);
        vector.setComponent(2, z);
        vector.setComponent(3, w);
        expect(vector.x).toBe(x);
        expect(vector.y).toBe(y);
        expect(vector.z).toBe(z);
        expect(vector.w).toBe(w);
    });

    it('should return the vector itself', () => {
        const vector = Vector4.ZERO;
        expect(vector.setComponent(0, 1)).toBe(vector);
        expect(vector.setComponent(1, 2)).toBe(vector);
        expect(vector.setComponent(2, 3)).toBe(vector);
        expect(vector.setComponent(3, 4)).toBe(vector);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.getComponent.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L24
    it('should get a specified component value', () => {
        const x = 1;
        const y = 2;
        const z = 3;
        const w = 4;

        const vector = new Vector4(x, y, z, w);
        expect(vector.getComponent(0)).toBe(x);
        expect(vector.getComponent(1)).toBe(y);
        expect(vector.getComponent(2)).toBe(z);
        expect(vector.getComponent(3)).toBe(w);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.clone.name}\``, () => {
    it('should clone itself', () => {
        const vector = new Vector4(1, 2, 3, 4);
        TestHelper.equal4(vector.clone(), new Vector4(1, 2, 3, 4));
    });

    it('should return a new vector', () => {
        const vector = new Vector4(1, 2, 3, 4);
        expect(vector.clone()).not.toBe(vector);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.copy.name}\``, () => {
    it('should copy another vector', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = Vector4.ZERO;
        TestHelper.equal4(b.copy(a), a);
    });

    it('should return the vector itself', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = Vector4.ZERO;
        expect(b.copy(a)).toBe(b);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.eq.name}\``, () => {
    it('should copy another vector', () => {
        expect(new Vector4(1, 2, 3, 4).eq(new Vector4(1, 2, 3, 4))).toBeTruthy();
        expect(new Vector4(1, 2, 3, 4).eq(new Vector4(0, 2, 3, 4))).toBeFalsy();
        expect(new Vector4(1, 2, 3, 4).eq(new Vector4(1, 0, 3, 4))).toBeFalsy();
        expect(new Vector4(1, 2, 3, 4).eq(new Vector4(1, 2, 0, 4))).toBeFalsy();
        expect(new Vector4(1, 2, 3, 4).eq(new Vector4(1, 2, 3, 0))).toBeFalsy();
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.ne.name}\``, () => {
    it('should copy another vector', () => {
        expect(new Vector4(1, 2, 3, 4).ne(new Vector4(1, 2, 3, 4))).toBeFalsy();
        expect(new Vector4(1, 2, 3, 4).ne(new Vector4(0, 2, 3, 4))).toBeTruthy();
        expect(new Vector4(1, 2, 3, 4).ne(new Vector4(1, 0, 3, 4))).toBeTruthy();
        expect(new Vector4(1, 2, 3, 4).ne(new Vector4(1, 2, 0, 4))).toBeTruthy();
        expect(new Vector4(1, 2, 3, 4).ne(new Vector4(1, 2, 3, 0))).toBeTruthy();
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.add.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1076
    it('should add two vectors', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        TestHelper.equal4(Vector4.add(a, b), new Vector4(6, 8, 10, 12));
    });

    it('should not mutate vectors', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        Vector4.add(a, b);

        TestHelper.equal4(a, new Vector4(1, 2, 3, 4));
        TestHelper.equal4(b, new Vector4(5, 6, 7, 8));
    });

    it('should return a new vector', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        const actual = Vector4.add(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.add.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1076
    it('should add two vectors', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        TestHelper.equal4(a.add(b), new Vector4(6, 8, 10, 12));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        a.add(b);

        TestHelper.equal4(a, new Vector4(6, 8, 10, 12));
        TestHelper.equal4(b, new Vector4(5, 6, 7, 8));
    });

    it('should return the vector itself', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        const actual = a.add(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.addScalar.name}\``, () => {
    it('should add a vector and a scalar value', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 5;

        TestHelper.equal4(Vector4.addScalar(a, b), new Vector4(6, 7, 8, 9));
    });

    it('should not mutate vectors', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 5;

        Vector4.addScalar(a, b);

        TestHelper.equal4(a, new Vector4(1, 2, 3, 4));
    });

    it('should return a new vector', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 5;

        const actual = Vector4.addScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.addScalar.name}\``, () => {
    it('should add a vector and a scalar value', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 5;

        TestHelper.equal4(a.addScalar(b), new Vector4(6, 7, 8, 9));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 5;

        a.addScalar(b);

        TestHelper.equal4(a, new Vector4(6, 7, 8, 9));
    });

    it('should return the vector itself', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 5;

        const actual = a.addScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.sub.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L953
    it('should subtract a vector from a vector', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = new Vector4(5, 2, 3, 9);

        TestHelper.equal4(Vector4.sub(a, b), new Vector4(-4, 4, 0, -5));
    });

    it('should not mutate vectors', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = new Vector4(5, 2, 3, 9);

        Vector4.sub(a, b);

        TestHelper.equal4(a, new Vector4(1, 6, 3, 4));
        TestHelper.equal4(b, new Vector4(5, 2, 3, 9));
    });

    it('should return a new vector', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = new Vector4(5, 2, 3, 9);

        const actual = Vector4.sub(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.sub.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L953
    it('should subtract a vector from a vector', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = new Vector4(5, 2, 3, 9);

        TestHelper.equal4(a.sub(b), new Vector4(-4, 4, 0, -5));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = new Vector4(5, 2, 3, 9);

        a.sub(b);

        TestHelper.equal4(a, new Vector4(-4, 4, 0, -5));
        TestHelper.equal4(b, new Vector4(5, 2, 3, 9));
    });

    it('should return the vector itself', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = new Vector4(5, 2, 3, 9);

        const actual = a.sub(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.subScalar.name}\``, () => {
    it('should subtract a scalar value from a vector', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = 3;

        TestHelper.equal4(Vector4.subScalar(a, b), new Vector4(-2, 3, 0, 1));
    });

    it('should not mutate vectors', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = 3;

        Vector4.subScalar(a, b);

        TestHelper.equal4(a, new Vector4(1, 6, 3, 4));
    });

    it('should return a new vector', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = 3;

        const actual = Vector4.subScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.subScalar.name}\``, () => {
    it('should subtract a scalar value from a vector', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = 3;

        TestHelper.equal4(a.subScalar(b), new Vector4(-2, 3, 0, 1));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = 3;

        a.subScalar(b);

        TestHelper.equal4(a, new Vector4(-2, 3, 0, 1));
    });

    it('should return the vector itself', () => {
        const a = new Vector4(1, 6, 3, 4);
        const b = 3;

        const actual = a.subScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.mul.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L997
    it('should multiply a vector by a vector', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        TestHelper.equal4(Vector4.mul(a, b), new Vector4(5, 12, 21, 32));
    });

    it('should not mutate vectors', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        Vector4.mul(a, b);

        TestHelper.equal4(a, new Vector4(1, 2, 3, 4));
        TestHelper.equal4(b, new Vector4(5, 6, 7, 8));
    });

    it('should return a new vector', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        const actual = Vector4.mul(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.mul.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L997
    it('should multiply a vector by a vector', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        TestHelper.equal4(a.mul(b), new Vector4(5, 12, 21, 32));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        a.mul(b);

        TestHelper.equal4(a, new Vector4(5, 12, 21, 32));
        TestHelper.equal4(b, new Vector4(5, 6, 7, 8));
    });

    it('should return the vector itself', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        const actual = a.mul(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.mulScalar.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L968
    it('should multiply a vector by from a scalar value', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 2;

        TestHelper.equal4(Vector4.mulScalar(a, b), new Vector4(2, 4, 6, 8));
    });

    it('should not mutate vectors', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 2;

        Vector4.mulScalar(a, b);

        TestHelper.equal4(a, new Vector4(1, 2, 3, 4));
    });

    it('should return a new vector', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 2;

        const actual = Vector4.mulScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.mulScalar.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L968
    it('should multiply a vector by from a scalar value', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 2;

        TestHelper.equal4(a.mulScalar(b), new Vector4(2, 4, 6, 8));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 2;

        a.mulScalar(b);

        TestHelper.equal4(a, new Vector4(2, 4, 6, 8));
    });

    it('should return the vector itself', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = 2;

        const actual = a.mulScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.div.name}\``, () => {
    it('should divide a vector by a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1028
        {
            const a = new Vector4(1, 6, 7, 4);
            const b = new Vector4(5, 2, 3, 8);

            TestHelper.equal4(Vector4.div(a, b), new Vector4(1 / 5, 6 / 2, 7 / 3, 4 / 8));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1061
        {
            const a = new Vector4(0.047, -3, Number.NEGATIVE_INFINITY, Number.MIN_VALUE);
            const b = new Vector4();

            TestHelper.equal4(
                Vector4.div(a, b),
                new Vector4(
                    Number.POSITIVE_INFINITY,
                    Number.NEGATIVE_INFINITY,
                    Number.NEGATIVE_INFINITY,
                    Number.POSITIVE_INFINITY,
                ),
            );
        }
    });

    it('should not mutate vectors', () => {
        const a = new Vector4(1, 6, 7, 4);
        const b = new Vector4(5, 2, 3, 8);

        Vector4.div(a, b);

        TestHelper.equal4(a, new Vector4(1, 6, 7, 4));
        TestHelper.equal4(b, new Vector4(5, 2, 3, 8));
    });

    it('should return a new vector', () => {
        const a = new Vector4(1, 6, 7, 4);
        const b = new Vector4(5, 2, 3, 8);

        const actual = Vector4.div(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.div.name}\``, () => {
    it('should divide a vector by a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1028
        {
            const a = new Vector4(1, 6, 7, 4);
            const b = new Vector4(5, 2, 3, 8);

            TestHelper.equal4(a.div(b), new Vector4(1 / 5, 6 / 2, 7 / 3, 4 / 8));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1061
        {
            const a = new Vector4(0.047, -3, Number.NEGATIVE_INFINITY, Number.MIN_VALUE);
            const b = new Vector4();

            TestHelper.equal4(
                a.div(b),
                new Vector4(
                    Number.POSITIVE_INFINITY,
                    Number.NEGATIVE_INFINITY,
                    Number.NEGATIVE_INFINITY,
                    Number.POSITIVE_INFINITY,
                ),
            );
        }
    });

    it('should mutate the vector itself', () => {
        const a = new Vector4(1, 6, 7, 4);
        const b = new Vector4(5, 2, 3, 8);

        a.div(b);

        TestHelper.equal4(a, new Vector4(1 / 5, 6 / 2, 7 / 3, 4 / 8));
        TestHelper.equal4(b, new Vector4(5, 2, 3, 8));
    });

    it('should return the vector itself', () => {
        const a = new Vector4(1, 6, 7, 4);
        const b = new Vector4(5, 2, 3, 8);

        const actual = a.div(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.divScalar.name}\``, () => {
    it('should divide a vector by from a scalar value', () => {
        {
            const a = new Vector4(1, 6, 7, 4);
            const b = 4;

            TestHelper.equal4(Vector4.divScalar(a, b), new Vector4(0.25, 1.5, 1.75, 1));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1046
        {
            const a = new Vector4(-2, 3, Number.MAX_VALUE, Number.NaN);
            const b = 0;

            const actual = a.divScalar(b);

            expect(actual.x).toBe(Number.NEGATIVE_INFINITY);
            expect(actual.y).toBe(Number.POSITIVE_INFINITY);
            expect(actual.z).toBe(Number.POSITIVE_INFINITY);
            expect(actual.w).toBeNaN();
        }
    });

    it('should not mutate vectors', () => {
        const a = new Vector4(1, 6, 7, 4);
        const b = 4;

        Vector4.divScalar(a, b);

        TestHelper.equal4(a, new Vector4(1, 6, 7, 4));
    });

    it('should return a new vector', () => {
        const a = new Vector4(1, 6, 7, 4);
        const b = 4;

        const actual = Vector4.divScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.divScalar.name}\``, () => {
    it('should divide a vector by from a scalar value', () => {
        {
            const a = new Vector4(1, 6, 7, 4);
            const b = 4;

            TestHelper.equal4(a.divScalar(b), new Vector4(0.25, 1.5, 1.75, 1));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1046
        {
            const a = new Vector4(-2, 3, Number.MAX_VALUE, Number.NaN);
            const b = 0;

            const actual = a.divScalar(b);

            expect(actual.x).toBe(Number.NEGATIVE_INFINITY);
            expect(actual.y).toBe(Number.POSITIVE_INFINITY);
            expect(actual.z).toBe(Number.POSITIVE_INFINITY);
            expect(actual.w).toBeNaN();
        }
    });

    it('should mutate the vector itself', () => {
        const a = new Vector4(1, 6, 7, 4);
        const b = 4;

        a.divScalar(b);

        TestHelper.equal4(a, new Vector4(0.25, 1.5, 1.75, 1));
    });

    it('should return the vector itself', () => {
        const a = new Vector4(1, 6, 7, 4);
        const b = 4;

        const actual = a.divScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.max.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L309
    it('should get maximum vector', () => {
        const a = new Vector4(-1, 4, -3, 1000);
        const b = new Vector4(2, 1, -1, 0);

        TestHelper.equal4(Vector4.max(a, b), new Vector4(2, 4, -1, 1000));
    });

    it('should return a new vector', () => {
        const a = new Vector4(-1, 4, -3, 1000);
        const b = new Vector4(2, 1, -1, 0);

        const actual = Vector4.max(a, b);
        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.max.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L309
    it('should get maximum vector', () => {
        const a = new Vector4(-1, 4, -3, 1000);
        const b = new Vector4(2, 1, -1, 0);

        TestHelper.equal4(a.max(b), new Vector4(2, 4, -1, 1000));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector4(-1, 4, -3, 1000);
        const b = new Vector4(2, 1, -1, 0);

        a.max(b);

        TestHelper.equal4(a, new Vector4(2, 4, -1, 1000));
        TestHelper.equal4(b, new Vector4(2, 1, -1, 0));
    });

    it('should return the vector itself', () => {
        const a = new Vector4(-1, 4, -3, 1000);
        const b = new Vector4(2, 1, -1, 0);

        expect(a.max(b)).toBe(a);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.min.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L296
    it('should get minimum vector', () => {
        const a = new Vector4(-1, 4, -3, 1000);
        const b = new Vector4(2, 1, -1, 0);

        TestHelper.equal4(Vector4.min(a, b), new Vector4(-1, 1, -3, 0));
    });

    it('should return a new vector', () => {
        const a = new Vector4(-1, 4, -3, 1000);
        const b = new Vector4(2, 1, -1, 0);

        const actual = Vector4.min(a, b);
        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.min.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L296
    it('should get minimum vector', () => {
        const a = new Vector4(-1, 4, -3, 1000);
        const b = new Vector4(2, 1, -1, 0);

        TestHelper.equal4(a.min(b), new Vector4(-1, 1, -3, 0));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector4(-1, 4, -3, 1000);
        const b = new Vector4(2, 1, -1, 0);

        a.min(b);

        TestHelper.equal4(a, new Vector4(-1, 1, -3, 0));
        TestHelper.equal4(b, new Vector4(2, 1, -1, 0));
    });

    it('should return the vector itself', () => {
        const a = new Vector4(-1, 4, -3, 1000);
        const b = new Vector4(2, 1, -1, 0);

        expect(a.min(b)).toBe(a);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.clamp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L351
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector4(0.5, 0.3, 0.33, 0.44);
        const min = new Vector4(0, 0.1, 0.13, 0.14);
        const max = new Vector4(1, 1.1, 1.13, 1.14);

        TestHelper.equal4(Vector4.clamp(x, min, max), new Vector4(0.5, 0.3, 0.33, 0.44));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L357
    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector4(2, 3, 4, 5);
        const min = new Vector4(0, 0.1, 0.13, 0.14);
        const max = new Vector4(1, 1.1, 1.13, 1.14);

        TestHelper.equal4(Vector4.clamp(x, min, max), max);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L363
    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector4(-2, -3, -4, -5);
        const min = new Vector4(0, 0.1, 0.13, 0.14);
        const max = new Vector4(1, 1.1, 1.13, 1.14);

        TestHelper.equal4(Vector4.clamp(x, min, max), min);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L369
    it('should restrict a vector (combination case)', () => {
        const x = new Vector4(-2, 0.5, 4, -5);
        const min = new Vector4(0, 0.1, 0.13, 0.14);
        const max = new Vector4(1, 1.1, 1.13, 1.14);

        TestHelper.equal4(Vector4.clamp(x, min, max), new Vector4(min.x, x.y, max.z, min.w));
    });

    it('should restrict a vector (min > max)', () => {
        const max = new Vector4(0, 0.1, 0.13, 0.14);
        const min = new Vector4(1, 1.1, 1.13, 1.14);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L379
        TestHelper.equal4(Vector4.clamp(new Vector4(0.5, 0.3, 0.33, 0.44), min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L386
        TestHelper.equal4(Vector4.clamp(new Vector4(2, 3, 4, 5), min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L392
        TestHelper.equal4(Vector4.clamp(new Vector4(-2, -3, -4, -5), min, max), max);
    });

    it('should return a new vector', () => {
        const x = new Vector4(0.5, 0.3, 0.33, 0.44);
        const min = new Vector4(0, 0.1, 0.13, 0.14);
        const max = new Vector4(1, 1.1, 1.13, 1.14);

        const actual = Vector4.clamp(x, min, max);
        expect(actual).not.toBe(x);
        expect(actual).not.toBe(min);
        expect(actual).not.toBe(max);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.clamp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L351
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector4(0.5, 0.3, 0.33, 0.44);
        const min = new Vector4(0, 0.1, 0.13, 0.14);
        const max = new Vector4(1, 1.1, 1.13, 1.14);

        TestHelper.equal4(x.clamp(min, max), new Vector4(0.5, 0.3, 0.33, 0.44));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L357
    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector4(2, 3, 4, 5);
        const min = new Vector4(0, 0.1, 0.13, 0.14);
        const max = new Vector4(1, 1.1, 1.13, 1.14);

        TestHelper.equal4(x.clamp(min, max), max);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L363
    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector4(-2, -3, -4, -5);
        const min = new Vector4(0, 0.1, 0.13, 0.14);
        const max = new Vector4(1, 1.1, 1.13, 1.14);

        TestHelper.equal4(x.clamp(min, max), min);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L369
    it('should restrict a vector (combination case)', () => {
        const x = new Vector4(-2, 0.5, 4, -5);
        const min = new Vector4(0, 0.1, 0.13, 0.14);
        const max = new Vector4(1, 1.1, 1.13, 1.14);

        TestHelper.equal4(x.clamp(min, max), new Vector4(min.x, x.y, max.z, min.w));
    });

    it('should restrict a vector (min > max)', () => {
        const max = new Vector4(0, 0.1, 0.13, 0.14);
        const min = new Vector4(1, 1.1, 1.13, 1.14);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L379
        TestHelper.equal4(new Vector4(0.5, 0.3, 0.33, 0.44).clamp(min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L386
        TestHelper.equal4(new Vector4(2, 3, 4, 5).clamp(min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L392
        TestHelper.equal4(new Vector4(-2, -3, -4, -5).clamp(min, max), max);
    });

    it('should mutate the vector itself', () => {
        const x = new Vector4(0.5, 0.3, 0.33, 0.44);
        const min = new Vector4(0, 0.1, 0.13, 0.14);
        const max = new Vector4(1, 1.1, 1.13, 1.14);

        x.clamp(min, max);
        TestHelper.equal4(x, new Vector4(0.5, 0.3, 0.33, 0.44));
    });

    it('should return the vector itself', () => {
        const x = new Vector4(0.5, 0.3, 0.33, 0.44);
        const min = new Vector4(0, 0.1, 0.13, 0.14);
        const max = new Vector4(1, 1.1, 1.13, 1.14);

        const actual = x.clamp(min, max);
        expect(actual).toBe(x);
        expect(actual).not.toBe(min);
        expect(actual).not.toBe(max);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.clampScalar.name}\``, () => {
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector4(0.5, 0.3, 0.33, 0.44);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal4(Vector4.clampScalar(x, min, max), new Vector4(0.5, 0.3, 0.33, 0.44));
    });

    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector4(2, 3, 4, 5);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal4(Vector4.clampScalar(x, min, max), new Vector4(max, max, max, max));
    });

    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector4(-1, -2, -3, -4);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal4(Vector4.clampScalar(x, min, max), new Vector4(min, min, min, min));
    });

    it('should restrict a vector (combination case)', () => {
        const x = new Vector4(-2, 4, -3, 5);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal4(Vector4.clampScalar(x, min, max), new Vector4(min, max, min, max));
    });

    it('should restrict a vector (min > max)', () => {
        const max = 0.1;
        const min = 1.1;

        TestHelper.equal4(
            Vector4.clampScalar(new Vector4(0.5, 0.3, 0.33, 0.44), min, max),
            new Vector4(max, max, max, max),
        );
        TestHelper.equal4(Vector4.clampScalar(new Vector4(2, 3, 4, 5), min, max), new Vector4(max, max, max, max));
        TestHelper.equal4(Vector4.clampScalar(new Vector4(-2, -3, -4, -5), min, max), new Vector4(max, max, max, max));
    });

    it('should return a new vector', () => {
        const x = new Vector4(0.5, 0.3, 0.33, 0.44);
        const min = 0.1;
        const max = 1.1;

        const actual = Vector4.clampScalar(x, min, max);
        expect(actual).not.toBe(x);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.clampScalar.name}\``, () => {
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector4(0.5, 0.3, 0.33, 0.44);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal4(x.clampScalar(min, max), new Vector4(0.5, 0.3, 0.33, 0.44));
    });

    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector4(2, 3, 4, 5);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal4(x.clampScalar(min, max), new Vector4(max, max, max, max));
    });

    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector4(-1, -2, -3, -4);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal4(x.clampScalar(min, max), new Vector4(min, min, min, min));
    });

    it('should restrict a vector (combination case)', () => {
        const x = new Vector4(-2, 4, -3, 5);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal4(x.clampScalar(min, max), new Vector4(min, max, min, max));
    });

    it('should restrict a vector (min > max)', () => {
        const max = 0.1;
        const min = 1.1;

        TestHelper.equal4(new Vector4(0.5, 0.3, 0.33, 0.44).clampScalar(min, max), new Vector4(max, max, max, max));
        TestHelper.equal4(new Vector4(2, 3, 4, 5).clampScalar(min, max), new Vector4(max, max, max, max));
        TestHelper.equal4(new Vector4(-2, -3, -4, -5).clampScalar(min, max), new Vector4(max, max, max, max));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector4(0.5, 0.3, 0.33, 0.44);
        const min = 0.1;
        const max = 1.1;

        x.clampScalar(min, max);
        TestHelper.equal4(x, new Vector4(0.5, 0.3, 0.33, 0.44));
    });

    it('should return the vector itself', () => {
        const x = new Vector4(0.5, 0.3, 0.33, 0.44);
        const min = 0.1;
        const max = 1.1;

        const actual = x.clampScalar(min, max);
        expect(actual).toBe(x);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.floor.name}\``, () => {
    it('should round down a vector', () => {
        TestHelper.equal4(Vector4.floor(new Vector4(0.1, 1.1, 2.1, 3.1)), new Vector4(0, 1, 2, 3));
        TestHelper.equal4(Vector4.floor(new Vector4(-0.1, -1.1, -2.1, -3.1)), new Vector4(-1, -2, -3, -4));
    });

    it('should return a new vector', () => {
        const x = new Vector4(0.1, 1.1, 2.1, 3.1);
        expect(Vector4.floor(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.floor.name}\``, () => {
    it('should round down a vector', () => {
        TestHelper.equal4(new Vector4(0.1, 1.1, 2.1, 3.1).floor(), new Vector4(0, 1, 2, 3));
        TestHelper.equal4(new Vector4(-0.1, -1.1, -2.1, -3.1).floor(), new Vector4(-1, -2, -3, -4));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector4(0.1, 1.1, 2.1, 3.1);
        x.floor();
        TestHelper.equal4(x, new Vector4(0, 1, 2, 3));
    });

    it('should return the vector itself', () => {
        const x = new Vector4(0.1, 1.1, 2.1, 3.1);
        expect(x.floor()).toBe(x);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.ceil.name}\``, () => {
    it('should round up a vector', () => {
        TestHelper.equal4(Vector4.ceil(new Vector4(0.1, 1.1, 2.1, 3.1)), new Vector4(1, 2, 3, 4));
        TestHelper.equal4(Vector4.ceil(new Vector4(-0.1, -1.1, -2.1, -3.1)), new Vector4(-0, -1, -2, -3));
    });

    it('should return a new vector', () => {
        const x = new Vector4(0.1, 1.1, 2.1, 3.1);
        expect(Vector4.ceil(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.ceil.name}\``, () => {
    it('should round up a vector', () => {
        TestHelper.equal4(new Vector4(0.1, 1.1, 2.1, 3.1).ceil(), new Vector4(1, 2, 3, 4));
        TestHelper.equal4(new Vector4(-0.1, -1.1, -2.1, -3.1).ceil(), new Vector4(-0, -1, -2, -3));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector4(0.1, 1.1, 2.1, 3.1);
        x.ceil();
        TestHelper.equal4(x, new Vector4(1, 2, 3, 4));
    });

    it('should return the vector itself', () => {
        const x = new Vector4(0.1, 1.1, 2.1, 3.1);
        expect(x.ceil()).toBe(x);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.round.name}\``, () => {
    it('should round a vector', () => {
        TestHelper.equal4(
            Vector4.round(new Vector4(0.4, 0.5, 1.4, Number.POSITIVE_INFINITY)),
            new Vector4(0, 1, 1, Number.POSITIVE_INFINITY),
        );
        TestHelper.equal4(
            Vector4.round(new Vector4(-0.6, -0.5, -1.6, Number.NEGATIVE_INFINITY)),
            new Vector4(-1, -0, -2, Number.NEGATIVE_INFINITY),
        );
    });

    it('should return a new vector', () => {
        const x = new Vector4(0.4, 0.5, 1.4, Number.POSITIVE_INFINITY);
        expect(Vector4.round(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.round.name}\``, () => {
    it('should round a vector', () => {
        TestHelper.equal4(
            new Vector4(0.4, 0.5, 1.4, Number.POSITIVE_INFINITY).round(),
            new Vector4(0, 1, 1, Number.POSITIVE_INFINITY),
        );
        TestHelper.equal4(
            new Vector4(-0.6, -0.5, -1.6, Number.NEGATIVE_INFINITY).round(),
            new Vector4(-1, -0, -2, Number.NEGATIVE_INFINITY),
        );
    });

    it('should mutate the vector itself', () => {
        const x = new Vector4(0.4, 0.5, 1.4, Number.POSITIVE_INFINITY);
        x.round();
        TestHelper.equal4(x, new Vector4(0, 1, 1, Number.POSITIVE_INFINITY));
    });

    it('should return the vector itself', () => {
        const x = new Vector4(0.4, 0.5, 1.4, Number.POSITIVE_INFINITY);
        expect(x.round()).toBe(x);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.roundToZero.name}\``, () => {
    it('should round a vector towards zero', () => {
        TestHelper.equal4(
            Vector4.roundToZero(new Vector4(0.4, 1.5, Number.POSITIVE_INFINITY, Number.MIN_VALUE)),
            new Vector4(0, 1, Number.POSITIVE_INFINITY, 0),
        );
        TestHelper.equal4(
            Vector4.roundToZero(new Vector4(-0.4, -1.5, Number.NEGATIVE_INFINITY, -Number.MIN_VALUE)),
            new Vector4(-0, -1, Number.NEGATIVE_INFINITY, 0),
        );
    });

    it('should return a new vector', () => {
        const x = new Vector4(0.4, 1.5, Number.POSITIVE_INFINITY, Number.MIN_VALUE);
        expect(Vector4.roundToZero(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.roundToZero.name}\``, () => {
    it('should round a vector towards zero', () => {
        TestHelper.equal4(
            new Vector4(0.4, 1.5, Number.POSITIVE_INFINITY, Number.MIN_VALUE).roundToZero(),
            new Vector4(0, 1, Number.POSITIVE_INFINITY, 0),
        );
        TestHelper.equal4(
            new Vector4(-0.4, -1.5, Number.NEGATIVE_INFINITY, -Number.MIN_VALUE).roundToZero(),
            new Vector4(-0, -1, Number.NEGATIVE_INFINITY, 0),
        );
    });

    it('should mutate the vector itself', () => {
        const x = new Vector4(0.4, 1.5, Number.POSITIVE_INFINITY, Number.MIN_VALUE);
        x.roundToZero();
        TestHelper.equal4(x, new Vector4(0, 1, Number.POSITIVE_INFINITY, 0));
    });

    it('should return the vector itself', () => {
        const x = new Vector4(0.4, 1.5, Number.POSITIVE_INFINITY, Number.MIN_VALUE);
        expect(x.roundToZero()).toBe(x);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.neg.name}\``, () => {
    it('should negate a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L939
        TestHelper.equal4(Vector4.neg(new Vector4(1, 2, 3, 4)), new Vector4(-1, -2, -3, -4));
    });

    it('should return a new vector', () => {
        const x = new Vector4(1, 2, 3, 4);
        expect(Vector4.neg(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.neg.name}\``, () => {
    it('should negate a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L939
        TestHelper.equal4(new Vector4(1, 2, 3, 4).neg(), new Vector4(-1, -2, -3, -4));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector4(1, 2, 3, 4);
        x.neg();
        TestHelper.equal4(x, new Vector4(-1, -2, -3, -4));
    });

    it('should return the vector itself', () => {
        const x = new Vector4(1, 2, 3, 4);
        expect(x.neg()).toBe(x);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.dot.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L219
    it('should get dot product of vectors', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        expect(Vector4.dot(a, b)).toBe(70);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L234
    it('should get dot product of perpendicular vectors', () => {
        const a = new Vector3(1.55, 1.55, 1);
        const b = new Vector3(2.5, 3, 1.5);
        const c = Vector3.cross(a, b);

        const d = new Vector4(a.x, a.y, a.z, 0);
        const e = new Vector4(c.x, c.y, c.z, 0);

        TestHelper.equal(Vector4.dot(d, e), 0, 15);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.lengthSq.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L279
    it('should get squared length', () => {
        expect(new Vector4(1, 2, 3, 4).lengthSq()).toBe(30);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.length.name}\``, () => {
    it('should get length', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L249
        expect(new Vector4(1, 2, 3, 4).length()).toBe(Math.sqrt(30));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L267
        expect(new Vector4(0, 0, 0, 0).length()).toBe(0);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.normalize.name}\``, () => {
    it('should get normalize a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L898
        TestHelper.equal4(
            Vector4.normalize(new Vector4(1, 2, 3, 4)),
            new Vector4(0.18257418583505536, 0.3651483716701107, 0.5477225575051661, 0.7302967433402214),
        );

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L916
        TestHelper.equal4(Vector4.normalize(new Vector4(1, 0, 0, 0)), new Vector4(1, 0, 0, 0));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L928
        {
            const actual = Vector4.normalize(new Vector4());
            expect(actual.x).toBeNaN();
            expect(actual.y).toBeNaN();
            expect(actual.z).toBeNaN();
            expect(actual.w).toBeNaN();
        }
    });

    it('should return a new vector', () => {
        const x = new Vector4(1, 2, 3, 4);
        expect(Vector4.normalize(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.normalize.name}\``, () => {
    it('should get normalize a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L898
        TestHelper.equal4(
            new Vector4(1, 2, 3, 4).normalize(),
            new Vector4(0.18257418583505536, 0.3651483716701107, 0.5477225575051661, 0.7302967433402214),
        );

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L916
        TestHelper.equal4(new Vector4(1, 0, 0, 0).normalize(), new Vector4(1, 0, 0, 0));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L928
        {
            const actual = new Vector4().normalize();
            expect(actual.x).toBeNaN();
            expect(actual.y).toBeNaN();
            expect(actual.z).toBeNaN();
            expect(actual.w).toBeNaN();
        }
    });

    it('should mutate the vector itself', () => {
        const x = new Vector4(1, 2, 3, 4);
        x.normalize();
        TestHelper.equal4(
            x,
            new Vector4(0.18257418583505536, 0.3651483716701107, 0.5477225575051661, 0.7302967433402214),
        );
    });

    it('should return the vector itself', () => {
        const x = new Vector4(1, 2, 3, 4);
        expect(x.normalize()).toBe(x);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.abs.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1473
    it('should get absolute value of a vector', () => {
        TestHelper.equal4(Vector4.abs(new Vector4(-2.5, 2, 3, 3.3)), new Vector4(2.5, 2, 3, 3.3));

        {
            const actual = Vector4.abs(new Vector4(Number.POSITIVE_INFINITY, 0, Number.NEGATIVE_INFINITY, Number.NaN));
            expect(actual.x).toBe(Number.POSITIVE_INFINITY);
            expect(actual.y).toBe(0);
            expect(actual.z).toBe(Number.POSITIVE_INFINITY);
            expect(actual.w).toBeNaN();
        }
    });

    it('should return a new vector', () => {
        const x = new Vector4(-2.5, 2, 3, 3.3);
        expect(Vector4.abs(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.abs.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1473
    it('should get absolute value of a vector', () => {
        TestHelper.equal4(new Vector4(-2.5, 2, 3, 3.3).abs(), new Vector4(2.5, 2, 3, 3.3));

        {
            const actual = new Vector4(Number.POSITIVE_INFINITY, 0, Number.NEGATIVE_INFINITY, Number.NaN).abs();
            expect(actual.x).toBe(Number.POSITIVE_INFINITY);
            expect(actual.y).toBe(0);
            expect(actual.z).toBe(Number.POSITIVE_INFINITY);
            expect(actual.w).toBeNaN();
        }
    });

    it('should mutate the vector itself', () => {
        const x = new Vector4(-2.5, 2, 3, 3.3);
        x.abs();
        TestHelper.equal4(x, new Vector4(2.5, 2, 3, 3.3));
    });

    it('should return the vector itself', () => {
        const x = new Vector4(-2.5, 2, 3, 3.3);
        expect(x.abs()).toBe(x);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.distanceSq.name}\``, () => {
    it('should get squared distance between two vectors', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L178
        expect(Vector4.distanceSq(new Vector4(1, 2, 3, 4), new Vector4(5, 6, 7, 8))).toBe(64);

        expect(Vector4.distanceSq(new Vector4(1.051, 2.05, 3.478), new Vector4(1.051, 2.05, 3.478))).toBe(0);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.distance.name}\``, () => {
    it('should get distance between two vectors', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L192
        expect(Vector4.distance(new Vector4(1, 2, 3, 4), new Vector4(5, 6, 7, 8))).toBe(Math.sqrt(64));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L207
        expect(Vector4.distance(new Vector4(1.051, 2.05, 3.478, 1), new Vector4(1.051, 2.05, 3.478, 0))).toBe(1);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.lerp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L401
    it('should perform a linear interpolation', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        TestHelper.equal4(Vector4.lerp(a, b, 0.5), new Vector4(3, 4, 5, 6));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L418
    it('should perform a linear interpolation with factor 0', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(4, 5, 6, 7);

        TestHelper.equal4(Vector4.lerp(a, b, 0), new Vector4(1, 2, 3, 4));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L432
    it('should perform a linear interpolation with factor 1', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(4, 5, 6, 7);

        TestHelper.equal4(Vector4.lerp(a, b, 1), new Vector4(4, 5, 6, 7));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L446
    it('should perform a linear interpolation with factor > 1', () => {
        const a = Vector4.ZERO;
        const b = new Vector4(4, 5, 6, 7);

        TestHelper.equal4(Vector4.lerp(a, b, 2), new Vector4(8, 10, 12, 14));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L460
    it('should perform a linear interpolation with factor < 0', () => {
        const a = Vector4.ZERO;
        const b = new Vector4(4, 5, 6, 7);

        TestHelper.equal4(Vector4.lerp(a, b, -2), new Vector4(-8, -10, -12, -14));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L472
    it('should perform a linear interpolation with special vectors', () => {
        const a = new Vector4(45.67, 90.0, 0, 0);
        const b = new Vector4(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 0, 0);
        const actual = Vector4.lerp(a, b, 0.408);

        expect(actual.x).toBe(Number.POSITIVE_INFINITY);
        expect(actual.y).toBe(Number.NEGATIVE_INFINITY);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L488
    it('should perform a linear interpolation with same vectors', () => {
        const a = new Vector4(4, 5, 6, 7);
        const b = new Vector4(4, 5, 6, 7);

        TestHelper.equal4(Vector4.lerp(a, b, 0.5), new Vector4(4, 5, 6, 7));
    });

    it('should return a new vector', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        expect(Vector4.lerp(a, b, 0.5)).not.toBe(a);
        expect(Vector4.lerp(a, b, 0.5)).not.toBe(b);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.lerp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L401
    it('should perform a linear interpolation', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        TestHelper.equal4(a.lerp(b, 0.5), new Vector4(3, 4, 5, 6));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L418
    it('should perform a linear interpolation with factor 0', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(4, 5, 6, 7);

        TestHelper.equal4(a.lerp(b, 0), new Vector4(1, 2, 3, 4));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L432
    it('should perform a linear interpolation with factor 1', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(4, 5, 6, 7);

        TestHelper.equal4(a.lerp(b, 1), new Vector4(4, 5, 6, 7));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L446
    it('should perform a linear interpolation with factor > 1', () => {
        const a = Vector4.ZERO;
        const b = new Vector4(4, 5, 6, 7);

        TestHelper.equal4(a.lerp(b, 2), new Vector4(8, 10, 12, 14));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L460
    it('should perform a linear interpolation with factor < 0', () => {
        const a = Vector4.ZERO;
        const b = new Vector4(4, 5, 6, 7);

        TestHelper.equal4(a.lerp(b, -2), new Vector4(-8, -10, -12, -14));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L472
    it('should perform a linear interpolation with special vectors', () => {
        const a = new Vector4(45.67, 90.0, 0, 0);
        const b = new Vector4(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 0, 0);
        const actual = a.lerp(b, 0.408);

        expect(actual.x).toBe(Number.POSITIVE_INFINITY);
        expect(actual.y).toBe(Number.NEGATIVE_INFINITY);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L488
    it('should perform a linear interpolation with same vectors', () => {
        const a = new Vector4(4, 5, 6, 7);
        const b = new Vector4(4, 5, 6, 7);

        TestHelper.equal4(a.lerp(b, 0.5), new Vector4(4, 5, 6, 7));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        a.lerp(b, 0.5);

        TestHelper.equal4(a, new Vector4(3, 4, 5, 6));
    });

    it('should return the vector itself', () => {
        const a = new Vector4(1, 2, 3, 4);
        const b = new Vector4(5, 6, 7, 8);

        const actual = a.lerp(b, 0.5);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector4.name}.${Vector4.sqrt.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1489
    it('should get square root of a vector', () => {
        TestHelper.equal4(
            Vector4.sqrt(new Vector4(5.5, 4.5, 6.5, 7.5)),
            new Vector4(2.345207879911715, 2.1213203435596424, 2.5495097567963922, 2.7386127875258306),
        );

        const actual = Vector4.sqrt(new Vector4(-2.5, 2, 3, 3.3));
        expect(actual.x).toBeNaN();
    });

    it('should return a new vector', () => {
        const x = new Vector4(-2.5, 2, 3, 3.3);
        expect(Vector4.sqrt(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector4.name}.prototype.${Vector4.prototype.sqrt.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector4Tests.cs#L1489
    it('should get square root of a vector', () => {
        TestHelper.equal4(
            new Vector4(5.5, 4.5, 6.5, 7.5).sqrt(),
            new Vector4(2.345207879911715, 2.1213203435596424, 2.5495097567963922, 2.7386127875258306),
        );

        const actual = new Vector4(-2.5, 2, 3, 3.3).sqrt();
        expect(actual.x).toBeNaN();
    });

    it('should mutate the vector itself', () => {
        const x = new Vector4(5.5, 4.5, 6.5, 7.5);
        x.sqrt();
        TestHelper.equal4(
            x,
            new Vector4(2.345207879911715, 2.1213203435596424, 2.5495097567963922, 2.7386127875258306),
        );
    });

    it('should return the vector itself', () => {
        const x = new Vector4(-2.5, 2, 3, 3.3);
        expect(x.sqrt()).toBe(x);
    });
});
