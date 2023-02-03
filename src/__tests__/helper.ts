import type { Vector2 } from '../vector2';

const EPSILON = 16;

export class TestHelper {
    static equal2(actual: Vector2, expected: Vector2, epsilon: number = EPSILON) {
        expect(actual.x).toBeCloseTo(expected.x, epsilon);
        expect(actual.y).toBeCloseTo(expected.y, epsilon);
    }
}
