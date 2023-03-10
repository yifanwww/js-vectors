import type { Vector2 } from '../vector2';
import type { Vector3 } from '../vector3';
import type { Vector4 } from '../vector4';

const EPSILON = 16;

export class TestHelper {
    static equal(actual: number, expected: number, epsilon: number = EPSILON) {
        expect(actual).toBeCloseTo(expected, epsilon);
    }

    static equal2(actual: Vector2, expected: Vector2, epsilon: number = EPSILON) {
        expect(actual.x).toBeCloseTo(expected.x, epsilon);
        expect(actual.y).toBeCloseTo(expected.y, epsilon);
    }

    static equal3(actual: Vector3, expected: Vector3, epsilon: number = EPSILON) {
        expect(actual.x).toBeCloseTo(expected.x, epsilon);
        expect(actual.y).toBeCloseTo(expected.y, epsilon);
        expect(actual.z).toBeCloseTo(expected.z, epsilon);
    }

    static equal4(actual: Vector4, expected: Vector4, epsilon: number = EPSILON) {
        expect(actual.x).toBeCloseTo(expected.x, epsilon);
        expect(actual.y).toBeCloseTo(expected.y, epsilon);
        expect(actual.z).toBeCloseTo(expected.z, epsilon);
        expect(actual.w).toBeCloseTo(expected.w, epsilon);
    }
}
