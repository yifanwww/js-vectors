import { Vector3 } from '../vector3';

import { TestHelper } from './helper';

describe(`Test ${Vector3.name}'s constructor`, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L909
    it('should construct a vector instance', () => {
        const x = 1;
        const y = 2;
        const z = 3;
        const target = new Vector3(x, y, z);

        expect(target.x).toBe(x);
        expect(target.y).toBe(y);
        expect(target.z).toBe(z);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L934
    it('should construct with no parameter', () => {
        const target = new Vector3();
        expect(target.x).toBe(0);
        expect(target.y).toBe(0);
        expect(target.z).toBe(0);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L946
    it('should construct with special floating values', () => {
        const target = new Vector3(Number.NaN, Number.MAX_VALUE, Number.POSITIVE_INFINITY);
        expect(target.x).toBeNaN();
        expect(target.y).toBe(Number.MAX_VALUE);
        expect(target.z).toBe(Number.POSITIVE_INFINITY);
    });
});

describe(`Test ${Vector3.name}'s predefined constant values`, () => {
    it('should be the correct vectors', () => {
        TestHelper.equal3(Vector3.ZERO, new Vector3(0, 0, 0));
        TestHelper.equal3(Vector3.ONE, new Vector3(1, 1, 1));
        TestHelper.equal3(Vector3.UNIT_X, new Vector3(1, 0, 0));
        TestHelper.equal3(Vector3.UNIT_Y, new Vector3(0, 1, 0));
        TestHelper.equal3(Vector3.UNIT_Z, new Vector3(0, 0, 1));
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.fromArray.name}\``, () => {
    it('should new a vector from array', () => {
        const array = [1, 2, 3, 4, 5, 6];

        TestHelper.equal3(Vector3.fromArray(array), new Vector3(1, 2, 3));
        TestHelper.equal3(Vector3.fromArray(array, 3), new Vector3(4, 5, 6));
    });

    it('should throw error if wrong parameters', () => {
        const array = [1, 2, 3, 4];

        expect(() => Vector3.fromArray(array, -1)).toThrow(Error);
        expect(() => Vector3.fromArray(array, 4)).toThrow(Error);
        expect(() => Vector3.fromArray(array, 3)).toThrow(Error);
    });
});

describe(`Test static method \`${Vector3.name}.prototype.${Vector3.prototype.toArray.name}\``, () => {
    it('should new a vector from array', () => {
        const array: number[] = [];

        new Vector3(1, 2, 3).toArray(array);
        new Vector3(4, 5, 6).toArray(array, 3);

        expect(array).toStrictEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should throw error if wrong parameters', () => {
        const array: number[] = [];
        expect(() => new Vector3(1, 2, 3).toArray(array, -1)).toThrow(Error);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.set.name}\``, () => {
    it('should set components', () => {
        const x = 1;
        const y = 2;
        const z = 3;

        const vector = Vector3.ZERO;
        vector.set(x, y, z);

        TestHelper.equal3(vector, new Vector3(x, y, z));
    });

    it('should return the vector itself', () => {
        const vector = Vector3.ZERO;
        expect(vector.set(1, 2, 3)).toBe(vector);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.setComponent.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L38
    it('should set a specified component', () => {
        const x = 1;
        const y = 2;
        const z = 3;

        const vector = Vector3.ZERO;
        vector.setComponent(0, x);
        vector.setComponent(1, y);
        vector.setComponent(2, z);
        expect(vector.x).toBe(x);
        expect(vector.y).toBe(y);
        expect(vector.z).toBe(z);
    });

    it('should return the vector itself', () => {
        const vector = Vector3.ZERO;
        expect(vector.setComponent(0, 1)).toBe(vector);
        expect(vector.setComponent(1, 2)).toBe(vector);
        expect(vector.setComponent(2, 3)).toBe(vector);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.getComponent.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L24
    it('should get a specified component value', () => {
        const x = 1;
        const y = 2;
        const z = 3;

        const vector = new Vector3(x, y, z);
        expect(vector.getComponent(0)).toBe(x);
        expect(vector.getComponent(1)).toBe(y);
        expect(vector.getComponent(2)).toBe(z);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.clone.name}\``, () => {
    it('should clone itself', () => {
        const vector = new Vector3(1, 2, 3);
        TestHelper.equal3(vector.clone(), new Vector3(1, 2, 3));
    });

    it('should return a new vector', () => {
        const vector = new Vector3(1, 2, 3);
        expect(vector.clone()).not.toBe(vector);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.copy.name}\``, () => {
    it('should copy another vector', () => {
        const a = new Vector3(1, 2, 3);
        const b = Vector3.ZERO;
        TestHelper.equal3(b.copy(a), a);
    });

    it('should return the vector itself', () => {
        const a = new Vector3(1, 2, 3);
        const b = Vector3.ZERO;
        expect(b.copy(a)).toBe(b);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.eq.name}\``, () => {
    it('should copy another vector', () => {
        expect(new Vector3(1, 2, 3).eq(new Vector3(1, 2, 3))).toBeTruthy();
        expect(new Vector3(1, 2, 3).eq(new Vector3(0, 2, 3))).toBeFalsy();
        expect(new Vector3(1, 2, 3).eq(new Vector3(1, 0, 3))).toBeFalsy();
        expect(new Vector3(1, 2, 3).eq(new Vector3(1, 2, 0))).toBeFalsy();
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.ne.name}\``, () => {
    it('should copy another vector', () => {
        expect(new Vector3(1, 2, 3).ne(new Vector3(1, 2, 3))).toBeFalsy();
        expect(new Vector3(1, 2, 3).ne(new Vector3(0, 2, 3))).toBeTruthy();
        expect(new Vector3(1, 2, 3).ne(new Vector3(1, 0, 3))).toBeTruthy();
        expect(new Vector3(1, 2, 3).ne(new Vector3(1, 2, 0))).toBeTruthy();
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.add.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L894
    it('should add two vectors', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(Vector3.add(a, b), new Vector3(5, 7, 9));
    });

    it('should not mutate vectors', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        Vector3.add(a, b);

        TestHelper.equal3(a, new Vector3(1, 2, 3));
        TestHelper.equal3(b, new Vector3(4, 5, 6));
    });

    it('should return a new vector', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        const actual = Vector3.add(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.add.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L894
    it('should add two vectors', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(a.add(b), new Vector3(5, 7, 9));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        a.add(b);

        TestHelper.equal3(a, new Vector3(5, 7, 9));
        TestHelper.equal3(b, new Vector3(4, 5, 6));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        const actual = a.add(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.addScalar.name}\``, () => {
    it('should add a vector and a scalar value', () => {
        const a = new Vector3(1, 2, 3);
        const b = 4;

        TestHelper.equal3(Vector3.addScalar(a, b), new Vector3(5, 6, 7));
    });

    it('should not mutate vectors', () => {
        const a = new Vector3(1, 2, 3);
        const b = 4;

        Vector3.addScalar(a, b);

        TestHelper.equal3(a, new Vector3(1, 2, 3));
    });

    it('should return a new vector', () => {
        const a = new Vector3(1, 2, 3);
        const b = 4;

        const actual = Vector3.addScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.addScalar.name}\``, () => {
    it('should add a vector and a scalar value', () => {
        const a = new Vector3(1, 2, 3);
        const b = 4;

        TestHelper.equal3(a.addScalar(b), new Vector3(5, 6, 7));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(1, 2, 3);
        const b = 4;

        a.addScalar(b);

        TestHelper.equal3(a, new Vector3(5, 6, 7));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(1, 2, 3);
        const b = 4;

        const actual = a.addScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.sub.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L767
    it('should subtract a vector from a vector', () => {
        const a = new Vector3(4, 2, 3);
        const b = new Vector3(1, 5, 7);

        TestHelper.equal3(Vector3.sub(a, b), new Vector3(3, -3, -4));
    });

    it('should not mutate vectors', () => {
        const a = new Vector3(4, 2, 3);
        const b = new Vector3(1, 5, 7);

        Vector3.sub(a, b);

        TestHelper.equal3(a, new Vector3(4, 2, 3));
        TestHelper.equal3(b, new Vector3(1, 5, 7));
    });

    it('should return a new vector', () => {
        const a = new Vector3(4, 2, 3);
        const b = new Vector3(1, 5, 7);

        const actual = Vector3.sub(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.sub.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L767
    it('should subtract a vector from a vector', () => {
        const a = new Vector3(4, 2, 3);
        const b = new Vector3(1, 5, 7);

        TestHelper.equal3(a.sub(b), new Vector3(3, -3, -4));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(4, 2, 3);
        const b = new Vector3(1, 5, 7);

        a.sub(b);

        TestHelper.equal3(a, new Vector3(3, -3, -4));
        TestHelper.equal3(b, new Vector3(1, 5, 7));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(4, 2, 3);
        const b = new Vector3(1, 5, 7);

        const actual = a.sub(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.subScalar.name}\``, () => {
    it('should subtract a scalar value from a vector', () => {
        const a = new Vector3(4, 2, 3);
        const b = 3;

        TestHelper.equal3(Vector3.subScalar(a, b), new Vector3(1, -1, 0));
    });

    it('should not mutate vectors', () => {
        const a = new Vector3(4, 2, 3);
        const b = 3;

        Vector3.subScalar(a, b);

        TestHelper.equal3(a, new Vector3(4, 2, 3));
    });

    it('should return a new vector', () => {
        const a = new Vector3(4, 2, 3);
        const b = 3;

        const actual = Vector3.subScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.subScalar.name}\``, () => {
    it('should subtract a scalar value from a vector', () => {
        const a = new Vector3(4, 2, 3);
        const b = 3;

        TestHelper.equal3(a.subScalar(b), new Vector3(1, -1, 0));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(4, 2, 3);
        const b = 3;

        a.subScalar(b);

        TestHelper.equal3(a, new Vector3(1, -1, 0));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(4, 2, 3);
        const b = 3;

        const actual = a.subScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.mul.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L815
    it('should multiply a vector by a vector', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(Vector3.mul(a, b), new Vector3(4, 10, 18));
    });

    it('should not mutate vectors', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        Vector3.mul(a, b);

        TestHelper.equal3(a, new Vector3(1, 2, 3));
        TestHelper.equal3(b, new Vector3(4, 5, 6));
    });

    it('should return a new vector', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        const actual = Vector3.mul(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.mul.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L815
    it('should multiply a vector by a vector', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(a.mul(b), new Vector3(4, 10, 18));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        a.mul(b);

        TestHelper.equal3(a, new Vector3(4, 10, 18));
        TestHelper.equal3(b, new Vector3(4, 5, 6));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        const actual = a.mul(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.mulScalar.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L783
    it('should multiply a vector by from a scalar value', () => {
        const a = new Vector3(1, 2, 3);
        const b = 2;

        TestHelper.equal3(Vector3.mulScalar(a, b), new Vector3(2, 4, 6));
    });

    it('should not mutate vectors', () => {
        const a = new Vector3(1, 2, 3);
        const b = 2;

        Vector3.mulScalar(a, b);

        TestHelper.equal3(a, new Vector3(1, 2, 3));
    });

    it('should return a new vector', () => {
        const a = new Vector3(1, 2, 3);
        const b = 2;

        const actual = Vector3.mulScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.mulScalar.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L783
    it('should multiply a vector by from a scalar value', () => {
        const a = new Vector3(1, 2, 3);
        const b = 2;

        TestHelper.equal3(a.mulScalar(b), new Vector3(2, 4, 6));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(1, 2, 3);
        const b = 2;

        a.mulScalar(b);

        TestHelper.equal3(a, new Vector3(2, 4, 6));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(1, 2, 3);
        const b = 2;

        const actual = a.mulScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.div.name}\``, () => {
    it('should divide a vector by a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L847
        {
            const a = new Vector3(4, 2, 3);
            const b = new Vector3(1, 5, 6);

            TestHelper.equal3(Vector3.div(a, b), new Vector3(4, 0.4, 0.5));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L880
        {
            const a = new Vector3(0.047, -3, Number.NEGATIVE_INFINITY);
            const b = new Vector3();

            TestHelper.equal3(
                Vector3.div(a, b),
                new Vector3(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
            );
        }
    });

    it('should not mutate vectors', () => {
        const a = new Vector3(4, 2, 3);
        const b = new Vector3(1, 5, 6);

        Vector3.div(a, b);

        TestHelper.equal3(a, new Vector3(4, 2, 3));
        TestHelper.equal3(b, new Vector3(1, 5, 6));
    });

    it('should return a new vector', () => {
        const a = new Vector3(4, 2, 3);
        const b = new Vector3(1, 5, 6);

        const actual = Vector3.div(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.div.name}\``, () => {
    it('should divide a vector by a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L847
        {
            const a = new Vector3(4, 2, 3);
            const b = new Vector3(1, 5, 6);

            TestHelper.equal3(a.div(b), new Vector3(4, 0.4, 0.5));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L880
        {
            const a = new Vector3(0.047, -3, Number.NEGATIVE_INFINITY);
            const b = new Vector3();

            TestHelper.equal3(
                a.div(b),
                new Vector3(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
            );
        }
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(4, 2, 3);
        const b = new Vector3(1, 5, 6);

        a.div(b);

        TestHelper.equal3(a, new Vector3(4, 0.4, 0.5));
        TestHelper.equal3(b, new Vector3(1, 5, 6));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(4, 2, 3);
        const b = new Vector3(1, 5, 6);

        const actual = a.div(b);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.divScalar.name}\``, () => {
    it('should divide a vector by from a scalar value', () => {
        {
            const a = new Vector3(4, 2, 3);
            const b = 4;

            TestHelper.equal3(Vector3.divScalar(a, b), new Vector3(1, 0.5, 0.75));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L864
        {
            const a = new Vector3(-2, 3, Number.MAX_VALUE);
            const b = 0;

            TestHelper.equal3(
                Vector3.divScalar(a, b),
                new Vector3(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
            );
        }
    });

    it('should not mutate vectors', () => {
        const a = new Vector3(4, 2, 3);
        const b = 4;

        Vector3.divScalar(a, b);

        TestHelper.equal3(a, new Vector3(4, 2, 3));
    });

    it('should return a new vector', () => {
        const a = new Vector3(4, 2, 3);
        const b = 4;

        const actual = Vector3.divScalar(a, b);

        expect(actual).not.toBe(a);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.divScalar.name}\``, () => {
    it('should divide a vector by from a scalar value', () => {
        {
            const a = new Vector3(4, 2, 3);
            const b = 4;

            TestHelper.equal3(a.divScalar(b), new Vector3(1, 0.5, 0.75));
        }

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L864
        {
            const a = new Vector3(-2, 3, Number.MAX_VALUE);
            const b = 0;

            TestHelper.equal3(
                a.divScalar(b),
                new Vector3(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
            );
        }
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(4, 2, 3);
        const b = 4;

        a.divScalar(b);

        TestHelper.equal3(a, new Vector3(1, 0.5, 0.75));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(4, 2, 3);
        const b = 4;

        const actual = a.divScalar(b);

        expect(actual).toBe(a);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.max.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L326
    it('should get maximum vector', () => {
        const a = new Vector3(-1, 4, -3);
        const b = new Vector3(2, 1, -1);

        TestHelper.equal3(Vector3.max(a, b), new Vector3(2, 4, -1));
    });

    it('should return a new vector', () => {
        const a = new Vector3(-1, 4, -3);
        const b = new Vector3(2, 1, -1);

        const actual = Vector3.max(a, b);
        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.max.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L326
    it('should get maximum vector', () => {
        const a = new Vector3(-1, 4, -3);
        const b = new Vector3(2, 1, -1);

        TestHelper.equal3(a.max(b), new Vector3(2, 4, -1));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(-1, 4, -3);
        const b = new Vector3(2, 1, -1);

        a.max(b);

        TestHelper.equal3(a, new Vector3(2, 4, -1));
        TestHelper.equal3(b, new Vector3(2, 1, -1));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(-1, 4, -3);
        const b = new Vector3(2, 1, -1);

        expect(a.max(b)).toBe(a);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.min.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L313
    it('should get minimum vector', () => {
        const a = new Vector3(-1, 4, -3);
        const b = new Vector3(2, 1, -1);

        TestHelper.equal3(Vector3.min(a, b), new Vector3(-1, 1, -3));
    });

    it('should return a new vector', () => {
        const a = new Vector3(-1, 4, -3);
        const b = new Vector3(2, 1, -1);

        const actual = Vector3.min(a, b);
        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.min.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L313
    it('should get minimum vector', () => {
        const a = new Vector3(-1, 4, -3);
        const b = new Vector3(2, 1, -1);

        TestHelper.equal3(a.min(b), new Vector3(-1, 1, -3));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(-1, 4, -3);
        const b = new Vector3(2, 1, -1);

        a.min(b);

        TestHelper.equal3(a, new Vector3(-1, 1, -3));
        TestHelper.equal3(b, new Vector3(2, 1, -1));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(-1, 4, -3);
        const b = new Vector3(2, 1, -1);

        expect(a.min(b)).toBe(a);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.clamp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L587
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector3(0.5, 0.3, 0.33);
        const min = new Vector3(0, 0.1, 0.13);
        const max = new Vector3(1, 1.1, 1.13);

        TestHelper.equal3(Vector3.clamp(x, min, max), new Vector3(0.5, 0.3, 0.33));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L593
    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector3(2, 3, 4);
        const min = new Vector3(0, 0.1, 0.13);
        const max = new Vector3(1, 1.1, 1.13);

        TestHelper.equal3(Vector3.clamp(x, min, max), max);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L599
    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector3(-2, -3, -4);
        const min = new Vector3(0, 0.1, 0.13);
        const max = new Vector3(1, 1.1, 1.13);

        TestHelper.equal3(Vector3.clamp(x, min, max), min);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L605
    it('should restrict a vector (combination case)', () => {
        const x = new Vector3(-2, 0.5, 4);
        const min = new Vector3(0, 0.1, 0.13);
        const max = new Vector3(1, 1.1, 1.13);

        TestHelper.equal3(Vector3.clamp(x, min, max), new Vector3(min.x, x.y, max.z));
    });

    it('should restrict a vector (min > max)', () => {
        const max = new Vector3(0, 0.1, 0.13);
        const min = new Vector3(1, 1.1, 1.13);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L615
        TestHelper.equal3(Vector3.clamp(new Vector3(0.5, 0.3, 0.33), min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L622
        TestHelper.equal3(Vector3.clamp(new Vector3(2, 3, 4), min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L628
        TestHelper.equal3(Vector3.clamp(new Vector3(-2, -3, -4), min, max), max);
    });

    it('should return a new vector', () => {
        const x = new Vector3(0.5, 0.3, 0.33);
        const min = new Vector3(0, 0.1, 0.13);
        const max = new Vector3(1, 1.1, 1.13);

        const actual = Vector3.clamp(x, min, max);
        expect(actual).not.toBe(x);
        expect(actual).not.toBe(min);
        expect(actual).not.toBe(max);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.clamp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L587
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector3(0.5, 0.3, 0.33);
        const min = new Vector3(0, 0.1, 0.13);
        const max = new Vector3(1, 1.1, 1.13);

        TestHelper.equal3(x.clamp(min, max), new Vector3(0.5, 0.3, 0.33));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L593
    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector3(2, 3, 4);
        const min = new Vector3(0, 0.1, 0.13);
        const max = new Vector3(1, 1.1, 1.13);

        TestHelper.equal3(x.clamp(min, max), max);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L599
    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector3(-2, -3, -4);
        const min = new Vector3(0, 0.1, 0.13);
        const max = new Vector3(1, 1.1, 1.13);

        TestHelper.equal3(x.clamp(min, max), min);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L605
    it('should restrict a vector (combination case)', () => {
        const x = new Vector3(-2, 0.5, 4);
        const min = new Vector3(0, 0.1, 0.13);
        const max = new Vector3(1, 1.1, 1.13);

        TestHelper.equal3(x.clamp(min, max), new Vector3(min.x, x.y, max.z));
    });

    it('should restrict a vector (min > max)', () => {
        const max = new Vector3(0, 0.1, 0.13);
        const min = new Vector3(1, 1.1, 1.13);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L615
        TestHelper.equal3(new Vector3(0.5, 0.3, 0.33).clamp(min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L622
        TestHelper.equal3(new Vector3(2, 3, 4).clamp(min, max), max);

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L628
        TestHelper.equal3(new Vector3(-2, -3, -4).clamp(min, max), max);
    });

    it('should mutate the vector itself', () => {
        const x = new Vector3(0.5, 0.3, 0.33);
        const min = new Vector3(0, 0.1, 0.13);
        const max = new Vector3(1, 1.1, 1.13);

        x.clamp(min, max);
        TestHelper.equal3(x, new Vector3(0.5, 0.3, 0.33));
    });

    it('should return the vector itself', () => {
        const x = new Vector3(0.5, 0.3, 0.33);
        const min = new Vector3(0, 0.1, 0.13);
        const max = new Vector3(1, 1.1, 1.13);

        const actual = x.clamp(min, max);
        expect(actual).toBe(x);
        expect(actual).not.toBe(min);
        expect(actual).not.toBe(max);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.clampScalar.name}\``, () => {
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector3(0.5, 0.3, 0.33);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal3(Vector3.clampScalar(x, min, max), new Vector3(0.5, 0.3, 0.33));
    });

    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector3(2, 3, 4);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal3(Vector3.clampScalar(x, min, max), new Vector3(max, max, max));
    });

    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector3(-1, -2, -3);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal3(Vector3.clampScalar(x, min, max), new Vector3(min, min, min));
    });

    it('should restrict a vector (combination case)', () => {
        const x = new Vector3(-2, 4, -3);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal3(Vector3.clampScalar(x, min, max), new Vector3(min, max, min));
    });

    it('should restrict a vector (min > max)', () => {
        const max = 0.1;
        const min = 1.1;

        TestHelper.equal3(Vector3.clampScalar(new Vector3(0.5, 0.3, 0.33), min, max), new Vector3(max, max, max));
        TestHelper.equal3(Vector3.clampScalar(new Vector3(2, 3, 4), min, max), new Vector3(max, max, max));
        TestHelper.equal3(Vector3.clampScalar(new Vector3(-2, -3, -4), min, max), new Vector3(max, max, max));
    });

    it('should return a new vector', () => {
        const x = new Vector3(0.5, 0.3, 0.33);
        const min = 0.1;
        const max = 1.1;

        const actual = Vector3.clampScalar(x, min, max);
        expect(actual).not.toBe(x);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.clampScalar.name}\``, () => {
    it('should restrict a vector (min < x < max)', () => {
        const x = new Vector3(0.5, 0.3, 0.33);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal3(x.clampScalar(min, max), new Vector3(0.5, 0.3, 0.33));
    });

    it('should restrict a vector (min < max < x)', () => {
        const x = new Vector3(2, 3, 4);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal3(x.clampScalar(min, max), new Vector3(max, max, max));
    });

    it('should restrict a vector (x < min < max)', () => {
        const x = new Vector3(-1, -2, -3);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal3(x.clampScalar(min, max), new Vector3(min, min, min));
    });

    it('should restrict a vector (combination case)', () => {
        const x = new Vector3(-2, 4, -3);
        const min = 0.1;
        const max = 1.1;

        TestHelper.equal3(x.clampScalar(min, max), new Vector3(min, max, min));
    });

    it('should restrict a vector (min > max)', () => {
        const max = 0.1;
        const min = 1.1;

        TestHelper.equal3(new Vector3(0.5, 0.3, 0.33).clampScalar(min, max), new Vector3(max, max, max));
        TestHelper.equal3(new Vector3(2, 3, 4).clampScalar(min, max), new Vector3(max, max, max));
        TestHelper.equal3(new Vector3(-2, -3, -4).clampScalar(min, max), new Vector3(max, max, max));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector3(0.5, 0.3, 0.33);
        const min = 0.1;
        const max = 1.1;

        x.clampScalar(min, max);
        TestHelper.equal3(x, new Vector3(0.5, 0.3, 0.33));
    });

    it('should return the vector itself', () => {
        const x = new Vector3(0.5, 0.3, 0.33);
        const min = 0.1;
        const max = 1.1;

        const actual = x.clampScalar(min, max);
        expect(actual).toBe(x);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.floor.name}\``, () => {
    it('should round down a vector', () => {
        TestHelper.equal3(Vector3.floor(new Vector3(0.1, 1.1, 2.1)), new Vector3(0, 1, 2));
        TestHelper.equal3(Vector3.floor(new Vector3(-0.1, -1.1, -2.1)), new Vector3(-1, -2, -3));
    });

    it('should return a new vector', () => {
        const x = new Vector3(0.1, 1.1, 2.1);
        expect(Vector3.floor(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.floor.name}\``, () => {
    it('should round down a vector', () => {
        TestHelper.equal3(new Vector3(0.1, 1.1, 2.1).floor(), new Vector3(0, 1, 2));
        TestHelper.equal3(new Vector3(-0.1, -1.1, -2.1).floor(), new Vector3(-1, -2, -3));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector3(0.1, 1.1, 2.1);
        x.floor();
        TestHelper.equal3(x, new Vector3(0, 1, 2));
    });

    it('should return the vector itself', () => {
        const x = new Vector3(0.1, 1.1, 2.1);
        expect(x.floor()).toBe(x);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.ceil.name}\``, () => {
    it('should round up a vector', () => {
        TestHelper.equal3(Vector3.ceil(new Vector3(0.1, 1.1, 2.1)), new Vector3(1, 2, 3));
        TestHelper.equal3(Vector3.ceil(new Vector3(-0.1, -1.1, -2.1)), new Vector3(-0, -1, -2));
    });

    it('should return a new vector', () => {
        const x = new Vector3(0.1, 1.1, 2.1);
        expect(Vector3.ceil(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.ceil.name}\``, () => {
    it('should round up a vector', () => {
        TestHelper.equal3(new Vector3(0.1, 1.1, 2.1).ceil(), new Vector3(1, 2, 3));
        TestHelper.equal3(new Vector3(-0.1, -1.1, -2.1).ceil(), new Vector3(-0, -1, -2));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector3(0.1, 1.1, 2.1);
        x.ceil();
        TestHelper.equal3(x, new Vector3(1, 2, 3));
    });

    it('should return the vector itself', () => {
        const x = new Vector3(0.1, 1.1, 2.1);
        expect(x.ceil()).toBe(x);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.round.name}\``, () => {
    it('should round a vector', () => {
        TestHelper.equal3(Vector3.round(new Vector3(0.4, 0.5, 1.4)), new Vector3(0, 1, 1));
        TestHelper.equal3(Vector3.round(new Vector3(-0.6, -0.5, -1.6)), new Vector3(-1, -0, -2));
    });

    it('should return a new vector', () => {
        const x = new Vector3(0.4, 0.5, 1.4);
        expect(Vector3.round(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.round.name}\``, () => {
    it('should round a vector', () => {
        TestHelper.equal3(new Vector3(0.4, 0.5, 1.4).round(), new Vector3(0, 1, 1));
        TestHelper.equal3(new Vector3(-0.6, -0.5, -1.6).round(), new Vector3(-1, -0, -2));
    });

    it('should mutate the vector itself', () => {
        const x = new Vector3(0.4, 0.5, 1.4);
        x.round();
        TestHelper.equal3(x, new Vector3(0, 1, 1));
    });

    it('should return the vector itself', () => {
        const x = new Vector3(0.4, 0.5, 1.4);
        expect(x.round()).toBe(x);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.roundToZero.name}\``, () => {
    it('should round a vector towards zero', () => {
        TestHelper.equal3(
            Vector3.roundToZero(new Vector3(0.4, 1.5, Number.POSITIVE_INFINITY)),
            new Vector3(0, 1, Number.POSITIVE_INFINITY),
        );
        TestHelper.equal3(
            Vector3.roundToZero(new Vector3(-0.4, -1.5, Number.NEGATIVE_INFINITY)),
            new Vector3(-0, -1, Number.NEGATIVE_INFINITY),
        );
    });

    it('should return a new vector', () => {
        const x = new Vector3(0.4, 1.5, Number.POSITIVE_INFINITY);
        expect(Vector3.roundToZero(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.roundToZero.name}\``, () => {
    it('should round a vector towards zero', () => {
        TestHelper.equal3(
            new Vector3(0.4, 1.5, Number.POSITIVE_INFINITY).roundToZero(),
            new Vector3(0, 1, Number.POSITIVE_INFINITY),
        );
        TestHelper.equal3(
            new Vector3(-0.4, -1.5, Number.NEGATIVE_INFINITY).roundToZero(),
            new Vector3(-0, -1, Number.NEGATIVE_INFINITY),
        );
    });

    it('should mutate the vector itself', () => {
        const x = new Vector3(0.4, 1.5, Number.POSITIVE_INFINITY);
        x.roundToZero();
        TestHelper.equal3(x, new Vector3(0, 1, Number.POSITIVE_INFINITY));
    });

    it('should return the vector itself', () => {
        const x = new Vector3(0.4, 1.5, Number.POSITIVE_INFINITY);
        expect(x.roundToZero()).toBe(x);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.neg.name}\``, () => {
    it('should negate a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L740
        TestHelper.equal3(Vector3.neg(new Vector3(1, 2, 3)), new Vector3(-1, -2, -3));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L753
        {
            const x = new Vector3(Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
            const actual = Vector3.neg(x);

            expect(actual.x).toBeNaN();
            expect(actual.y).toStrictEqual(Number.NEGATIVE_INFINITY);
            expect(actual.z).toStrictEqual(Number.POSITIVE_INFINITY);
        }
    });

    it('should return a new vector', () => {
        const x = new Vector3(1, 2, 3);
        expect(Vector3.neg(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.neg.name}\``, () => {
    it('should negate a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L740
        TestHelper.equal3(new Vector3(1, 2, 3).neg(), new Vector3(-1, -2, -3));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L753
        {
            const x = new Vector3(Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
            const actual = Vector3.neg(x);

            expect(actual.x).toBeNaN();
            expect(actual.y).toStrictEqual(Number.NEGATIVE_INFINITY);
            expect(actual.z).toStrictEqual(Number.POSITIVE_INFINITY);
        }
    });

    it('should mutate the vector itself', () => {
        const x = new Vector3(1, 2, 3);
        x.neg();
        TestHelper.equal3(x, new Vector3(-1, -2, -3));
    });

    it('should return the vector itself', () => {
        const x = new Vector3(1, 2, 3);
        expect(x.neg()).toBe(x);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.dot.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L237
    it('should get dot product of vectors', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        expect(Vector3.dot(a, b)).toBe(32);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L252
    it('should get dot product of perpendicular vectors', () => {
        const a = new Vector3(1.55, 1.55, 1);
        const b = new Vector3(2.5, 3, 1.5);
        const c = Vector3.cross(a, b);

        TestHelper.equal(Vector3.dot(a, c), 0, 15);
        TestHelper.equal(Vector3.dot(b, c), 0, 15);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.cross.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L168
    it('should get cross product of vectors', () => {
        const a = new Vector3(1, 0, 0);
        const b = new Vector3(0, 1, 0);

        TestHelper.equal3(Vector3.cross(a, b), new Vector3(0, 0, 1));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L183
    it('should get cross product of same vectors', () => {
        const a = new Vector3(0, 1, 0);
        const b = new Vector3(0, 1, 0);

        TestHelper.equal3(Vector3.cross(a, b), new Vector3(0, 0, 0));
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.cross.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L168
    it('should get cross product of vectors', () => {
        const a = new Vector3(1, 0, 0);
        const b = new Vector3(0, 1, 0);

        TestHelper.equal3(a.cross(b), new Vector3(0, 0, 1));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L183
    it('should get cross product of same vectors', () => {
        const a = new Vector3(0, 1, 0);
        const b = new Vector3(0, 1, 0);

        TestHelper.equal3(a.cross(b), new Vector3(0, 0, 0));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(1, 0, 0);
        const b = new Vector3(0, 1, 0);
        a.cross(b);
        TestHelper.equal3(a, new Vector3(0, 0, 1));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(1, 0, 0);
        const b = new Vector3(0, 1, 0);
        expect(a.cross(b)).toBe(a);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.lengthSq.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L296
    it('should get squared length', () => {
        expect(new Vector3(1, 2, 3).lengthSq()).toBe(14);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.length.name}\``, () => {
    it('should get length', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L267
        expect(new Vector3(1, 2, 3).length()).toBe(Math.sqrt(14));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L285
        expect(new Vector3(0, 0, 0).length()).toBe(0);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.normalize.name}\``, () => {
    it('should get normalize a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L700
        TestHelper.equal3(
            Vector3.normalize(new Vector3(1, 2, 3)),
            new Vector3(0.2672612419124244, 0.5345224838248488, 0.8017837257372732),
        );

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L717
        TestHelper.equal3(Vector3.normalize(new Vector3(1, 0, 0)), new Vector3(1, 0, 0));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L729
        {
            const actual = Vector3.normalize(new Vector3());
            expect(actual.x).toBeNaN();
            expect(actual.y).toBeNaN();
            expect(actual.z).toBeNaN();
        }
    });

    it('should return a new vector', () => {
        const x = new Vector3(1, 2, 3);
        expect(Vector3.normalize(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.normalize.name}\``, () => {
    it('should get normalize a vector', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L700
        TestHelper.equal3(
            new Vector3(1, 2, 3).normalize(),
            new Vector3(0.2672612419124244, 0.5345224838248488, 0.8017837257372732),
        );

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L717
        TestHelper.equal3(new Vector3(1, 0, 0).normalize(), new Vector3(1, 0, 0));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L729
        {
            const actual = new Vector3().normalize();
            expect(actual.x).toBeNaN();
            expect(actual.y).toBeNaN();
            expect(actual.z).toBeNaN();
        }
    });

    it('should mutate the vector itself', () => {
        const x = new Vector3(1, 2, 3);
        x.normalize();
        TestHelper.equal3(x, new Vector3(0.2672612419124244, 0.5345224838248488, 0.8017837257372732));
    });

    it('should return the vector itself', () => {
        const x = new Vector3(1, 2, 3);
        expect(x.normalize()).toBe(x);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.abs.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L1243
    it('should get absolute value of a vector', () => {
        TestHelper.equal3(Vector3.abs(new Vector3(-2.5, 2, 0.5)), new Vector3(2.5, 2, 0.5));

        {
            const actual = Vector3.abs(new Vector3(0, Number.NEGATIVE_INFINITY, Number.NaN));
            expect(actual.x).toBe(0);
            expect(actual.y).toBe(Number.POSITIVE_INFINITY);
            expect(actual.z).toBeNaN();
        }
    });

    it('should return a new vector', () => {
        const x = new Vector3(-2.5, 2, 0.5);
        expect(Vector3.abs(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.abs.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L1243
    it('should get absolute value of a vector', () => {
        TestHelper.equal3(new Vector3(-2.5, 2, 0.5).abs(), new Vector3(2.5, 2, 0.5));

        {
            const actual = new Vector3(0, Number.NEGATIVE_INFINITY, Number.NaN).abs();
            expect(actual.x).toBe(0);
            expect(actual.y).toBe(Number.POSITIVE_INFINITY);
            expect(actual.z).toBeNaN();
        }
    });

    it('should mutate the vector itself', () => {
        const x = new Vector3(-2.5, 2, 0.5);
        x.abs();
        TestHelper.equal3(x, new Vector3(2.5, 2, 0.5));
    });

    it('should return the vector itself', () => {
        const x = new Vector3(-2.5, 2, 0.5);
        expect(x.abs()).toBe(x);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.distanceSq.name}\``, () => {
    it('should get squared distance between two vectors', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L223
        expect(Vector3.distanceSq(new Vector3(1, 2, 3), new Vector3(4, 5, 6))).toBe(27);

        expect(Vector3.distanceSq(new Vector3(1.051, 2.05, 3.478), new Vector3(1.051, 2.05, 3.478))).toBe(0);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.distance.name}\``, () => {
    it('should get distance between two vectors', () => {
        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L195
        expect(Vector3.distance(new Vector3(1, 2, 3), new Vector3(4, 5, 6))).toBe(Math.sqrt(27));

        // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L210
        expect(Vector3.distance(new Vector3(1.051, 2.05, 3.478), new Vector3(1.051, 2.05, 3.478))).toBe(0);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.lerp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L361
    it('should perform a linear interpolation', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(Vector3.lerp(a, b, 0.5), new Vector3(2.5, 3.5, 4.5));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L378
    it('should perform a linear interpolation with factor 0', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(Vector3.lerp(a, b, 0), new Vector3(1, 2, 3));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L392
    it('should perform a linear interpolation with factor 1', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(Vector3.lerp(a, b, 1), new Vector3(4, 5, 6));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L406
    it('should perform a linear interpolation with factor > 1', () => {
        const a = Vector3.ZERO;
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(Vector3.lerp(a, b, 2), new Vector3(8, 10, 12));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L420
    it('should perform a linear interpolation with factor < 0', () => {
        const a = Vector3.ZERO;
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(Vector3.lerp(a, b, -2), new Vector3(-8, -10, -12));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L434
    it('should perform a linear interpolation with special vectors', () => {
        const a = new Vector3(45.67, 90.0, 0);
        const b = new Vector3(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 0);
        const actual = Vector3.lerp(a, b, 0.408);

        expect(actual.x).toBe(Number.POSITIVE_INFINITY);
        expect(actual.y).toBe(Number.NEGATIVE_INFINITY);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L448
    it('should perform a linear interpolation with same vectors', () => {
        const a = new Vector3(1.68, 2.34, 5.43);
        const b = new Vector3(1.68, 2.34, 5.43);

        TestHelper.equal3(Vector3.lerp(a, b, 0.5), new Vector3(1.68, 2.34, 5.43));
    });

    it('should return a new vector', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        expect(Vector3.lerp(a, b, 0.5)).not.toBe(a);
        expect(Vector3.lerp(a, b, 0.5)).not.toBe(b);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.lerp.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L361
    it('should perform a linear interpolation', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(a.lerp(b, 0.5), new Vector3(2.5, 3.5, 4.5));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L378
    it('should perform a linear interpolation with factor 0', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(a.lerp(b, 0), new Vector3(1, 2, 3));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L392
    it('should perform a linear interpolation with factor 1', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(a.lerp(b, 1), new Vector3(4, 5, 6));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L406
    it('should perform a linear interpolation with factor > 1', () => {
        const a = Vector3.ZERO;
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(a.lerp(b, 2), new Vector3(8, 10, 12));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L420
    it('should perform a linear interpolation with factor < 0', () => {
        const a = Vector3.ZERO;
        const b = new Vector3(4, 5, 6);

        TestHelper.equal3(a.lerp(b, -2), new Vector3(-8, -10, -12));
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L434
    it('should perform a linear interpolation with special vectors', () => {
        const a = new Vector3(45.67, 90.0, 0);
        const b = new Vector3(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 0);
        const actual = a.lerp(b, 0.408);

        expect(actual.x).toBe(Number.POSITIVE_INFINITY);
        expect(actual.y).toBe(Number.NEGATIVE_INFINITY);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L448
    it('should perform a linear interpolation with same vectors', () => {
        const a = new Vector3(1.68, 2.34, 5.43);
        const b = new Vector3(1.68, 2.34, 5.43);

        TestHelper.equal3(a.lerp(b, 0.5), new Vector3(1.68, 2.34, 5.43));
    });

    it('should mutate the vector itself', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        a.lerp(b, 0.5);

        TestHelper.equal3(a, new Vector3(2.5, 3.5, 4.5));
    });

    it('should return the vector itself', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(4, 5, 6);

        const actual = a.lerp(b, 0.5);

        expect(actual).toBe(a);
        expect(actual).not.toBe(b);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.sqrt.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L1257
    it('should get square root of a vector', () => {
        TestHelper.equal3(
            Vector3.sqrt(new Vector3(5.5, 4.5, 16.5)),
            new Vector3(2.345207879911715, 2.1213203435596424, 4.06201920231798),
        );

        const actual = Vector3.sqrt(new Vector3(-2.5, 2, 0.5));
        expect(actual.x).toBeNaN();
    });

    it('should return a new vector', () => {
        const x = new Vector3(-2.5, 2, 0.5);
        expect(Vector3.sqrt(x)).not.toBe(x);
    });
});

describe(`Test method \`${Vector3.name}.prototype.${Vector3.prototype.sqrt.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L1257
    it('should get square root of a vector', () => {
        TestHelper.equal3(
            new Vector3(5.5, 4.5, 16.5).sqrt(),
            new Vector3(2.345207879911715, 2.1213203435596424, 4.06201920231798),
        );

        const actual = new Vector3(-2.5, 2, 0.5).sqrt();
        expect(actual.x).toBeNaN();
    });

    it('should mutate the vector itself', () => {
        const x = new Vector3(5.5, 4.5, 16.5);
        x.sqrt();
        TestHelper.equal3(x, new Vector3(2.345207879911715, 2.1213203435596424, 4.06201920231798));
    });

    it('should return the vector itself', () => {
        const x = new Vector3(-2.5, 2, 0.5);
        expect(x.sqrt()).toBe(x);
    });
});

describe(`Test static method \`${Vector3.name}.${Vector3.reflect.name}\``, () => {
    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L492
    it('should reflect a vector to another vector', () => {
        const vector = Vector3.normalize(Vector3.ONE);

        // Reflect on XZ plane
        {
            const n = new Vector3(0, 1, 0);
            TestHelper.equal3(Vector3.reflect(vector, n), new Vector3(vector.x, -vector.y, vector.z));
        }

        // Reflect on XY plane
        {
            const n = new Vector3(0, 0, 1);
            TestHelper.equal3(Vector3.reflect(vector, n), new Vector3(vector.x, vector.y, -vector.z));
        }

        // Reflect on YZ plane
        {
            const n = new Vector3(1, 0, 0);
            TestHelper.equal3(Vector3.reflect(vector, n), new Vector3(-vector.x, vector.y, vector.z));
        }
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector3Tests.cs#L518
    it('should reflect a vector when normal and source are the same', () => {
        const vector = Vector3.normalize(new Vector3(0.45, 1.28, 0.86));

        TestHelper.equal3(Vector3.reflect(vector, vector), Vector3.neg(vector), 15);
    });

    // ref: https://github.com/dotnet/runtime/blob/v7.0.2/src/libraries/System.Numerics.Vectors/tests/Vector2Tests.cs#L1196
    it('should reflect a vector when normal and source are negation', () => {
        const n = Vector3.normalize(new Vector3(0.45, 1.28, 0.86));
        const vector = Vector3.neg(n);

        TestHelper.equal3(Vector3.reflect(vector, n), n, 15);
    });

    it('should return a new vector', () => {
        const a = new Vector3(1, 2, 3);
        const b = new Vector3(1, 2, 3);
        const actual = Vector3.reflect(a, b);

        expect(actual).not.toBe(a);
        expect(actual).not.toBe(b);
    });
});
