/**
 * Represents a vector with two double-precision floating-point values.
 */
export class Vector2 {
    /** The X component of this vector. */
    declare x: number;

    /** The Y component of this vector. */
    declare y: number;

    /* ------------------------------------------------------------------------------------------------- Constructors */

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /* ----------------------------------------------------------------------------------------- Predefined Constants */

    /**
     * Returns a vector whose 2 components are equal to zero.
     */
    static get ZERO() {
        return new Vector2(0, 0);
    }

    /**
     * Returns a vector whose 2 components are equal to one.
     */
    static get ONE() {
        return new Vector2(1, 1);
    }

    /**
     * Gets the vector `(1,0)`.
     */
    static get UNIT_X() {
        return new Vector2(1, 0);
    }

    /**
     * Gets the vector `(0,1)`.
     */
    static get UNIT_Y() {
        return new Vector2(0, 1);
    }

    /* ------------------------------------------------------------------------------------------- Array Transmutable */

    /**
     * Returns a vector whose components come from a specified array starting at a specified index position.
     * @param array The source array.
     * @param index The index at which to copy the value from the array.
     * @throws {Error} Index is out of range
     * @throws {Error} Space of source array is not enough to fill in vector
     */
    static fromArray(array: number[], index: number = 0) {
        if (index < 0 || index >= array.length) {
            throw new Error(`Index is out of range: ${index}, array length: ${array.length}`);
        }

        if (array.length - index < 2) {
            throw new Error(
                `Space of source array is not enough to fill in vector, index: ${index}, array length: ${array.length}`,
            );
        }

        return new Vector2(array[index], array[index + 1]);
    }

    /**
     * Copies the components of this vector to a specified array starting at a specified index position.
     * @param array The destination array.
     * @param index The index at which to copy the first component of this vector.
     * @throws {Error} Index should not be negative
     */
    toArray(array: number[], index: number = 0) {
        if (index < 0) {
            throw new Error(`Index should not be negative: ${index}`);
        }

        array[index] = this.x;
        array[index + 1] = this.y;
    }

    /* ---------------------------------------------------------------------------------------------------- Set & Get */

    /**
     * Sets the x and y components of this vector.
     * @param x The x component value.
     * @param y The y component value.
     */
    set(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Sets the component at the specified index.
     * @param index The index of the component to set.
     * @param value The value of the component to set.
     * @throws {Error} Index is out of range
     */
    setComponent(index: number, value: number) {
        // prettier-ignore
        switch (index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;

            /* istanbul ignore next */
            default:
                throw new Error(`Index is out of range: ${index}`);
        }
        return this;
    }

    /**
     * Gets the component at specified index.
     * @param index The index of the component to get.
     * @throws {Error} Index is out of range
     */
    getComponent(index: number) {
        // prettier-ignore
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;

            /* istanbul ignore next */
            default:
                throw new Error(`Index is out of range: ${index}`);
        }
    }

    /* ------------------------------------------------------------------------------------------------- Clone & Copy */

    /**
     * Returns a new vector with the same x and y values as this one.
     */
    clone() {
        return new Vector2(this.x, this.y);
    }

    /**
     * Copies the values of the passed vector's x and y components to this vector.
     * @param other The vector to be copied.
     */
    copy(other: Vector2) {
        this.x = other.x;
        this.y = other.y;
        return this;
    }

    /* --------------------------------------------------------------------------------------------------- Comparison */

    /**
     * Returns `true` if this vector and another vector are equal; `false` otherwise.
     * @param other The other vector.
     */
    eq(other: Vector2) {
        return this.x === other.x && this.y === other.y;
    }

    /**
     * Returns `true` if this vector and another vector are not equal; `false` otherwise.
     * @param other The other vector.
     */
    ne(other: Vector2) {
        return this.x !== other.x || this.y !== other.y;
    }

    /* -------------------------------------------------------------------------------------------- Basic Computation */

    /**
     * Adds two vectors together.
     * @param left The first vector to add.
     * @param right The second vector to add.
     */
    static add(left: Vector2, right: Vector2) {
        return new Vector2(left.x + right.x, left.y + right.y);
    }

    /**
     * Adds the specified vector to this vector.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector to add.
     */
    add(other: Vector2) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    /**
     * Adds the scalar value to the specified vector.
     * @param left The vector.
     * @param right The scalar value.
     */
    static addScalar(left: Vector2, right: number) {
        return new Vector2(left.x + right, left.y + right);
    }

    /**
     * Adds the scalar value to this vector.
     *
     * *This method mutates this vector itself.*
     *
     * @param scalar The scalar value.
     */
    addScalar(scalar: number) {
        this.x += scalar;
        this.y += scalar;
        return this;
    }

    /**
     * Subtracts the second vector from the first.
     * @param left The first vector.
     * @param right The second vector.
     */
    static sub(left: Vector2, right: Vector2) {
        return new Vector2(left.x - right.x, left.y - right.y);
    }

    /**
     * Subtracts the specified vector from this vector.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector to subtracts.
     */
    sub(other: Vector2) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    /**
     * Subtracts the scalar value from the specified vector.
     * @param left The vector.
     * @param right The scalar value.
     */
    static subScalar(left: Vector2, right: number) {
        return new Vector2(left.x - right, left.y - right);
    }

    /**
     * Subtracts the scalar value from this vector.
     *
     * *This method mutates this vector itself.*
     *
     * @param scalar The scalar value.
     */
    subScalar(scalar: number) {
        this.x -= scalar;
        this.y -= scalar;
        return this;
    }

    /**
     * Multiples the first vector by the second.
     * @param left The first vector.
     * @param right The second vector.
     */
    static mul(left: Vector2, right: Vector2) {
        return new Vector2(left.x * right.x, left.y * right.y);
    }

    /**
     * Multiplies this vector by the specified vector.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector to multiply.
     */
    mul(other: Vector2) {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }

    /**
     * Multipes the specified vector by the scalar value.
     * @param left The vector.
     * @param right The scalar value.
     */
    static mulScalar(left: Vector2, right: number) {
        return new Vector2(left.x * right, left.y * right);
    }

    /**
     * Multiples this vector by the scalar value.
     *
     * *This method mutates this vector itself.*
     *
     * @param scalar The scalar value.
     */
    mulScalar(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Divides the first vector by the second.
     * @param left The first vector.
     * @param right The second vector.
     */
    static div(left: Vector2, right: Vector2) {
        return new Vector2(left.x / right.x, left.y / right.y);
    }

    /**
     * Divides this vector by the specified vector.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector.
     */
    div(other: Vector2) {
        this.x /= other.x;
        this.y /= other.y;
        return this;
    }

    /**
     * Divides the specified vector by the scalar value.
     * @param left The vector.
     * @param right The scalar value.
     */
    static divScalar(left: Vector2, right: number) {
        return new Vector2(left.x / right, left.y / right);
    }

    /**
     * Divides this vector by the scalar value.
     *
     * *This method mutates this vector itself.*
     *
     * @param scalar The scalar value.
     */
    divScalar(scalar: number) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    /* -------------------------------------------------------------------------------------------- Other Computation */

    /**
     * Returns a vector whose components are the maximum of each of the pairs of components in two specified vectors.
     * @param a The first vector.
     * @param b The second vector.
     */
    static max(a: Vector2, b: Vector2) {
        return new Vector2(Math.max(a.x, b.x), Math.max(a.y, b.y));
    }

    /**
     * If this vector's x or y value is less than `other`'s x or y value,
     * replace that value with the corresponding max value.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector to compare.
     */
    max(other: Vector2) {
        this.x = Math.max(this.x, other.x);
        this.y = Math.max(this.y, other.y);
        return this;
    }

    /**
     * Returns a vector whose components are the minimum of each of the pairs of components in two specified vectors.
     * @param a The first vector.
     * @param b The second vector.
     */
    static min(a: Vector2, b: Vector2) {
        return new Vector2(Math.min(a.x, b.x), Math.min(a.y, b.y));
    }

    /**
     * If this vector's x or y value is greater than `other`'s x or y value,
     * replace that value with the corresponding min value.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector to compare.
     */
    min(other: Vector2) {
        this.x = Math.min(this.x, other.x);
        this.y = Math.min(this.y, other.y);
        return this;
    }

    /**
     * Restricts a vector between a minimum and a maximum value.
     *
     * References:
     * - https://thebookofshaders.com/glossary/?search=clamp
     * - https://registry.khronos.org/OpenGL-Refpages/gl4/html/clamp.xhtml
     *
     * NOTE: `min` must be less than or equal to `max`, otherwise the behaviour is undefined.
     *
     * @param value The vector to restrict.
     * @param min The minimum value.
     * @param max The maximum value.
     */
    static clamp(value: Vector2, min: Vector2, max: Vector2) {
        return new Vector2(Math.min(Math.max(value.x, min.x), max.x), Math.min(Math.max(value.y, min.y), max.y));
    }

    /**
     * Restricts this vector between a minimum and a maximum value.
     *
     * *This method mutates this vector itself.*
     *
     * References:
     * - https://thebookofshaders.com/glossary/?search=clamp
     * - https://registry.khronos.org/OpenGL-Refpages/gl4/html/clamp.xhtml
     *
     * NOTE: `min` must be less than or equal to `max`, otherwise the behaviour is undefined.
     *
     * @param min The minimum value.
     * @param max The maximum value.
     */
    clamp(min: Vector2, max: Vector2) {
        this.x = Math.min(Math.max(this.x, min.x), max.x);
        this.y = Math.min(Math.max(this.y, min.y), max.y);
        return this;
    }

    /**
     * Restricts a vector between a minimum and a maximum value.
     *
     * References:
     * - https://thebookofshaders.com/glossary/?search=clamp
     * - https://registry.khronos.org/OpenGL-Refpages/gl4/html/clamp.xhtml
     *
     * NOTE: `min` must be less than or equal to `max`, otherwise the behaviour is undefined.
     *
     * @param value The vector to restrict.
     * @param min The minimum value.
     * @param max The maximum value.
     */
    static clampScalar(value: Vector2, min: number, max: number) {
        return new Vector2(Math.min(Math.max(value.x, min), max), Math.min(Math.max(value.y, min), max));
    }

    /**
     * Restricts this vector between a minimum and a maximum value.
     *
     * *This method mutates this vector itself.*
     *
     * References:
     * - https://thebookofshaders.com/glossary/?search=clamp
     * - https://registry.khronos.org/OpenGL-Refpages/gl4/html/clamp.xhtml
     *
     * NOTE: `min` must be less than or equal to `max`, otherwise the behaviour is undefined.
     *
     * @param min The minimum value.
     * @param max The maximum value.
     */
    clampScalar(min: number, max: number) {
        this.x = Math.min(Math.max(this.x, min), max);
        this.y = Math.min(Math.max(this.y, min), max);
        return this;
    }

    /**
     * Rounds down the components of a vector to the nearest integer value.
     * @param value The vector.
     */
    static floor(value: Vector2) {
        return new Vector2(Math.floor(value.x), Math.floor(value.y));
    }

    /**
     * Rounds down the components of this vector to the nearest integer value.
     *
     * *This method mutates this vector itself.*
     */
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    /**
     * Rounds up the components of a vector to the nearest integer value.
     * @param value The vector.
     */
    static ceil(value: Vector2) {
        return new Vector2(Math.ceil(value.x), Math.ceil(value.y));
    }

    /**
     * Rounds up the components of this vector to the nearest integer value.
     *
     * *This method mutates this vector itself.*
     */
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    /**
     * Rounds the components of a vector to the nearest integer value.
     * @param value The vector.
     */
    static round(value: Vector2) {
        return new Vector2(Math.round(value.x), Math.round(value.y));
    }

    /**
     * Rounds the components of this vector to the nearest integer value.
     *
     * *This method mutates this vector itself.*
     */
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    /**
     * Rounds the components of a vector towards zero (up if negative, down if positive) to an integer value.
     * @param value The vector.
     */
    static roundToZero(value: Vector2) {
        return new Vector2(
            value.x < 0 ? Math.ceil(value.x) : Math.floor(value.x),
            value.y < 0 ? Math.ceil(value.y) : Math.floor(value.y),
        );
    }

    /**
     * Rounds the components of this vector towards zero (up if negative, down if positive) to an integer value.
     *
     * *This method mutates this vector itself.*
     */
    roundToZero() {
        this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
        return this;
    }

    /**
     * Negates the specified vector.
     * @param value The vector to negate.
     */
    static neg(value: Vector2) {
        return new Vector2(-value.x, -value.y);
    }

    /**
     * Negates this vector.
     *
     * *This method mutates this vector itself.*
     */
    neg() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    /**
     * Returns the dot product of two vectors.
     * @param left The first vector.
     * @param right The second vector.
     */
    static dot(left: Vector2, right: Vector2) {
        return left.x * right.x + left.y * right.y;
    }

    /**
     * Returns the cross product of two vectors.
     *
     * Note that `cross-product` in 2D is not well-defined.
     * This function computes a geometric cross-product commonly used in 2D graphics.
     *
     * @param left The first vector.
     * @param right The second vector.
     */
    static cross(left: Vector2, right: Vector2) {
        return left.x * right.y - left.y * right.x;
    }

    /**
     * Returns the squared length of this vector.
     */
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * Returns the length of this vector.
     */
    length() {
        return Math.sqrt(this.lengthSq());
    }

    /**
     * Returns a vector with the same direction as the specified vector, but with a length of one.
     * @param value The vector to normalize.
     */
    static normalize(value: Vector2) {
        return Vector2.divScalar(value, value.length());
    }

    /**
     * Makes this vector have a length of 1.
     *
     * *This method mutates this vector itself.*
     */
    normalize() {
        return this.divScalar(this.length());
    }

    /**
     * Returns a vector whose components are the absolute values of each of specified vector's components.
     * @param value The vector.
     */
    static abs(value: Vector2) {
        return new Vector2(Math.abs(value.x), Math.abs(value.y));
    }

    /**
     * Makes components of this vector to be absolute values.
     *
     * *This method mutates this vector itself.*
     */
    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }

    /**
     * Returns the squared euclidean distance between two specified vectors.
     * @param a The first vector.
     * @param b The second vector.
     */
    static distanceSq(a: Vector2, b: Vector2) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return dx * dx + dy * dy;
    }

    /**
     * Returns the Euclidean distance between two specified vectors.
     * @param a The first vector.
     * @param b The second vector.
     */
    static distance(a: Vector2, b: Vector2) {
        return Math.sqrt(Vector2.distanceSq(a, b));
    }

    /**
     * Performs a linear interpolation between two vectors based on the given interpolation factor.
     * @param a The first vector.
     * @param b The second vector.
     * @param alpha Interpolation factor, typically in the closed interval `[0,1]`.
     */
    static lerp(a: Vector2, b: Vector2, alpha: number) {
        // don't change to `a + (b - a) * alpha`, refer to https://learn.microsoft.com/en-us/dotnet/core/compatibility/core-libraries/5.0/vector-lerp-behavior-change
        return new Vector2(a.x * (1 - alpha) + b.x * alpha, a.y * (1 - alpha) + b.y * alpha);
    }

    /**
     * Performs a linear interpolation between two vectors based on the given interpolation factor.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector.
     * @param alpha Interpolation factor, typically in the closed interval `[0,1]`.
     */
    lerp(other: Vector2, alpha: number) {
        // don't change to `a + (b - a) * alpha`, refer to https://learn.microsoft.com/en-us/dotnet/core/compatibility/core-libraries/5.0/vector-lerp-behavior-change
        this.x = this.x * (1 - alpha) + other.x * alpha;
        this.y = this.y * (1 - alpha) + other.y * alpha;
        return this;
    }

    /**
     * Return a vector whose components are the square root of each of a specified vector's components.
     * @param value A vector.
     */
    static sqrt(value: Vector2) {
        return new Vector2(Math.sqrt(value.x), Math.sqrt(value.y));
    }

    /**
     * Makes components of this vector to be the square root of each of the previous values.
     *
     * *This method mutates this vector itself.*
     */
    sqrt() {
        this.x = Math.sqrt(this.x);
        this.y = Math.sqrt(this.y);
        return this;
    }

    /**
     * Returns the reflection of a vector off a surface that has the specified normal.
     * @param vector The source vector.
     * @param normal The normal of the surface being reflected off.
     */
    static reflect(vector: Vector2, normal: Vector2) {
        const dot = Vector2.dot(vector, normal);
        return new Vector2(vector.x - 2 * dot * normal.x, vector.y - 2 * dot * normal.y);
    }
}
