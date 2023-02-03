/**
 * Represents a vector with three double-precision floating-point values.
 */
export class Vector3 {
    /** The x component of this vector. */
    declare x: number;

    /** The y component of this vector. */
    declare y: number;

    /** The z component of this vector. */
    declare z: number;

    /* ------------------------------------------------------------------------------------------------- Constructors */

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /* ----------------------------------------------------------------------------------------- Predefined Constants */

    /**
     * Returns the vector `(0,0,0)`.
     */
    static get ZERO() {
        return new Vector3(0, 0, 0);
    }

    /**
     * Returns the vector `(1,1,1)`.
     */
    static get ONE() {
        return new Vector3(1, 1, 1);
    }

    /**
     * Returns the vector `(1,0,0)`.
     */
    static get UNIT_X() {
        return new Vector3(1, 0, 0);
    }

    /**
     * Returns the vector `(0,1,0)`.
     */
    static get UNIT_Y() {
        return new Vector3(0, 1, 0);
    }

    /**
     * Returns the vector `(0,0,1)`.
     */
    static get UNIT_Z() {
        return new Vector3(0, 0, 1);
    }

    /* ------------------------------------------------------------------------------------------- Array Transmutable */

    /**
     * Returns a vector whose components come from a specified array starting at a specified index position.
     * @param array The source array.
     * @param index The index at which to copy the value from the array.
     * @throws {Error} Index is out of range
     * @throws {Error} Values in source array is not enough
     */
    static fromArray(array: number[], index: number = 0) {
        if (index < 0 || index >= array.length) {
            throw new Error(`Index is out of range: ${index}, array length: ${array.length}`);
        }

        if (array.length - index < 3) {
            throw new Error(`Values in source array is not enough, index: ${index}, array length: ${array.length}`);
        }

        return new Vector3(array[index], array[index + 1], array[index + 2]);
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
        array[index + 2] = this.z;
    }

    /* ---------------------------------------------------------------------------------------------------- Set & Get */

    /**
     * Sets the x, y and z components of this vector.
     * @param x The x component value.
     * @param y The y component value.
     * @param z The z component value.
     */
    set(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
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
            case 2: this.z = value; break;

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
            case 2: return this.z;

            /* istanbul ignore next */
            default:
                throw new Error(`Index is out of range: ${index}`);
        }
    }

    /* ------------------------------------------------------------------------------------------------- Clone & Copy */

    /**
     * Returns a new vector with the same x, y and z values as this one.
     */
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * Copies the values of the passed vector's x, y and z components to this vector.
     * @param other The vector to be copied.
     */
    copy(other: Vector3) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        return this;
    }

    /* --------------------------------------------------------------------------------------------------- Comparison */

    /**
     * Returns `true` if this vector and another vector are equal; `false` otherwise.
     * @param other The other vector.
     */
    eq(other: Vector3) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }

    /**
     * Returns `true` if this vector and another vector are not equal; `false` otherwise.
     * @param other The other vector.
     */
    ne(other: Vector3) {
        return this.x !== other.x || this.y !== other.y || this.z !== other.z;
    }

    /* -------------------------------------------------------------------------------------------- Basic Computation */

    /**
     * Adds two vectors together.
     * @param left The first vector to add.
     * @param right The second vector to add.
     */
    static add(left: Vector3, right: Vector3) {
        return new Vector3(left.x + right.x, left.y + right.y, left.z + right.z);
    }

    /**
     * Adds the specified vector to this vector.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector to add.
     */
    add(other: Vector3) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    /**
     * Adds the scalar value to the specified vector.
     * @param left The vector.
     * @param right The scalar value.
     */
    static addScalar(left: Vector3, right: number) {
        return new Vector3(left.x + right, left.y + right, left.z + right);
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
        this.z += scalar;
        return this;
    }

    /**
     * Subtracts the second vector from the first.
     * @param left The first vector.
     * @param right The second vector.
     */
    static sub(left: Vector3, right: Vector3) {
        return new Vector3(left.x - right.x, left.y - right.y, left.z - right.z);
    }

    /**
     * Subtracts the specified vector from this vector.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector to subtracts.
     */
    sub(other: Vector3) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    /**
     * Subtracts the scalar value from the specified vector.
     * @param left The vector.
     * @param right The scalar value.
     */
    static subScalar(left: Vector3, right: number) {
        return new Vector3(left.x - right, left.y - right, left.z - right);
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
        this.z -= scalar;
        return this;
    }

    /**
     * Multiples the first vector by the second.
     * @param left The first vector.
     * @param right The second vector.
     */
    static mul(left: Vector3, right: Vector3) {
        return new Vector3(left.x * right.x, left.y * right.y, left.z * right.z);
    }

    /**
     * Multiplies this vector by the specified vector.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector to multiply.
     */
    mul(other: Vector3) {
        this.x *= other.x;
        this.y *= other.y;
        this.z *= other.z;
        return this;
    }

    /**
     * Multipes the specified vector by the scalar value.
     * @param left The vector.
     * @param right The scalar value.
     */
    static mulScalar(left: Vector3, right: number) {
        return new Vector3(left.x * right, left.y * right, left.z * right);
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
        this.z *= scalar;
        return this;
    }

    /**
     * Divides the first vector by the second.
     * @param left The first vector.
     * @param right The second vector.
     */
    static div(left: Vector3, right: Vector3) {
        return new Vector3(left.x / right.x, left.y / right.y, left.z / right.z);
    }

    /**
     * Divides this vector by the specified vector.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector.
     */
    div(other: Vector3) {
        this.x /= other.x;
        this.y /= other.y;
        this.z /= other.z;
        return this;
    }

    /**
     * Divides the specified vector by the scalar value.
     * @param left The vector.
     * @param right The scalar value.
     */
    static divScalar(left: Vector3, right: number) {
        return new Vector3(left.x / right, left.y / right, left.z / right);
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
        this.z /= scalar;
        return this;
    }

    /* -------------------------------------------------------------------------------------------- Other Computation */

    /**
     * Returns a vector whose components are the maximum of each of the pairs of components in two specified vectors.
     * @param a The first vector.
     * @param b The second vector.
     */
    static max(a: Vector3, b: Vector3) {
        return new Vector3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
    }

    /**
     * If this vector's x, y or z value is less than `other`'s x, y or z value,
     * replace that value with the corresponding max value.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector to compare.
     */
    max(other: Vector3) {
        this.x = Math.max(this.x, other.x);
        this.y = Math.max(this.y, other.y);
        this.z = Math.max(this.z, other.z);
        return this;
    }

    /**
     * Returns a vector whose components are the minimum of each of the pairs of components in two specified vectors.
     * @param a The first vector.
     * @param b The second vector.
     */
    static min(a: Vector3, b: Vector3) {
        return new Vector3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
    }

    /**
     * If this vector's x, y or z value is greater than `other`'s x, y or z value,
     * replace that value with the corresponding min value.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector to compare.
     */
    min(other: Vector3) {
        this.x = Math.min(this.x, other.x);
        this.y = Math.min(this.y, other.y);
        this.z = Math.min(this.z, other.z);
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
    static clamp(value: Vector3, min: Vector3, max: Vector3) {
        return new Vector3(
            Math.min(Math.max(value.x, min.x), max.x),
            Math.min(Math.max(value.y, min.y), max.y),
            Math.min(Math.max(value.z, min.z), max.z),
        );
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
    clamp(min: Vector3, max: Vector3) {
        this.x = Math.min(Math.max(this.x, min.x), max.x);
        this.y = Math.min(Math.max(this.y, min.y), max.y);
        this.z = Math.min(Math.max(this.z, min.z), max.z);
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
    static clampScalar(value: Vector3, min: number, max: number) {
        return new Vector3(
            Math.min(Math.max(value.x, min), max),
            Math.min(Math.max(value.y, min), max),
            Math.min(Math.max(value.z, min), max),
        );
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
        this.z = Math.min(Math.max(this.z, min), max);
        return this;
    }

    /**
     * Rounds down the components of a vector to the nearest integer value.
     * @param value The vector.
     */
    static floor(value: Vector3) {
        return new Vector3(Math.floor(value.x), Math.floor(value.y), Math.floor(value.z));
    }

    /**
     * Rounds down the components of this vector to the nearest integer value.
     *
     * *This method mutates this vector itself.*
     */
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }

    /**
     * Rounds up the components of a vector to the nearest integer value.
     * @param value The vector.
     */
    static ceil(value: Vector3) {
        return new Vector3(Math.ceil(value.x), Math.ceil(value.y), Math.ceil(value.z));
    }

    /**
     * Rounds up the components of this vector to the nearest integer value.
     *
     * *This method mutates this vector itself.*
     */
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }

    /**
     * Rounds the components of a vector to the nearest integer value.
     * @param value The vector.
     */
    static round(value: Vector3) {
        return new Vector3(Math.round(value.x), Math.round(value.y), Math.round(value.z));
    }

    /**
     * Rounds the components of this vector to the nearest integer value.
     *
     * *This method mutates this vector itself.*
     */
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }

    /**
     * Rounds the components of a vector towards zero (up if negative, down if positive) to an integer value.
     * @param value The vector.
     */
    static roundToZero(value: Vector3) {
        return new Vector3(
            value.x < 0 ? Math.ceil(value.x) : Math.floor(value.x),
            value.y < 0 ? Math.ceil(value.y) : Math.floor(value.y),
            value.z < 0 ? Math.ceil(value.z) : Math.floor(value.z),
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
        this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
        return this;
    }

    /**
     * Negates the specified vector.
     * @param value The vector to negate.
     */
    static neg(value: Vector3) {
        return new Vector3(-value.x, -value.y, -value.z);
    }

    /**
     * Negates this vector.
     *
     * *This method mutates this vector itself.*
     */
    neg() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    /**
     * Returns the dot product of two vectors.
     * @param left The first vector.
     * @param right The second vector.
     */
    static dot(left: Vector3, right: Vector3) {
        return left.x * right.x + left.y * right.y + left.z * right.z;
    }

    /**
     * Returns the cross product of two vectors.
     *
     * @param left The first vector.
     * @param right The second vector.
     */
    static cross(left: Vector3, right: Vector3) {
        return new Vector3(
            left.y * right.z - left.z * right.y,
            left.z * right.x - left.x * right.z,
            left.x * right.y - left.y * right.x,
        );
    }

    /**
     * Returns the cross product of two vectors.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The other vector.
     */
    cross(other: Vector3) {
        const x = this.y * other.z - this.z * other.y;
        const y = this.z * other.x - this.x * other.z;
        const z = this.x * other.y - this.y * other.x;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     * Returns the squared length of this vector.
     */
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
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
    static normalize(value: Vector3) {
        return Vector3.divScalar(value, value.length());
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
    static abs(value: Vector3) {
        return new Vector3(Math.abs(value.x), Math.abs(value.y), Math.abs(value.z));
    }

    /**
     * Makes components of this vector to be absolute values.
     *
     * *This method mutates this vector itself.*
     */
    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }

    /**
     * Returns the squared euclidean distance between two specified vectors.
     * @param a The first vector.
     * @param b The second vector.
     */
    static distanceSq(a: Vector3, b: Vector3) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return dx * dx + dy * dy + dz * dz;
    }

    /**
     * Returns the Euclidean distance between two specified vectors.
     * @param a The first vector.
     * @param b The second vector.
     */
    static distance(a: Vector3, b: Vector3) {
        return Math.sqrt(Vector3.distanceSq(a, b));
    }

    /**
     * Performs a linear interpolation between two vectors based on the given interpolation factor.
     * @param a The first vector.
     * @param b The second vector.
     * @param alpha Interpolation factor, typically in the closed interval `[0,1]`.
     */
    static lerp(a: Vector3, b: Vector3, alpha: number) {
        // don't change to `a + (b - a) * alpha`
        // refer to https://learn.microsoft.com/en-us/dotnet/core/compatibility/core-libraries/5.0/vector-lerp-behavior-change
        return new Vector3(
            a.x * (1 - alpha) + b.x * alpha,
            a.y * (1 - alpha) + b.y * alpha,
            a.z * (1 - alpha) + b.z * alpha,
        );
    }

    /**
     * Performs a linear interpolation between two vectors based on the given interpolation factor.
     *
     * *This method mutates this vector itself.*
     *
     * @param other The vector.
     * @param alpha Interpolation factor, typically in the closed interval `[0,1]`.
     */
    lerp(other: Vector3, alpha: number) {
        // don't change to `a + (b - a) * alpha`
        // refer to https://learn.microsoft.com/en-us/dotnet/core/compatibility/core-libraries/5.0/vector-lerp-behavior-change
        this.x = this.x * (1 - alpha) + other.x * alpha;
        this.y = this.y * (1 - alpha) + other.y * alpha;
        this.z = this.z * (1 - alpha) + other.z * alpha;
        return this;
    }

    /**
     * Return a vector whose components are the square root of each of a specified vector's components.
     * @param value A vector.
     */
    static sqrt(value: Vector3) {
        return new Vector3(Math.sqrt(value.x), Math.sqrt(value.y), Math.sqrt(value.z));
    }

    /**
     * Makes components of this vector to be the square root of each of the previous values.
     *
     * *This method mutates this vector itself.*
     */
    sqrt() {
        this.x = Math.sqrt(this.x);
        this.y = Math.sqrt(this.y);
        this.z = Math.sqrt(this.z);
        return this;
    }

    /**
     * Returns the reflection of a vector off a surface that has the specified normal.
     * @param vector The source vector.
     * @param normal The normal of the surface being reflected off.
     */
    static reflect(vector: Vector3, normal: Vector3) {
        const dot = Vector3.dot(vector, normal);
        return new Vector3(vector.x - 2 * dot * normal.x, vector.y - 2 * dot * normal.y, vector.z - 2 * dot * normal.z);
    }
}
