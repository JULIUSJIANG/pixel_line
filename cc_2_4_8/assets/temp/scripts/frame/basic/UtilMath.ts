namespace utilMath {
    /**
     * 坐标
     */
    export interface Position {
        /**
         * x 坐标
         */
        x: number;
        /**
         * y 坐标
         */
        y: number;
    }

    /**
     * 取正模
     * @param curr 
     * @param mod 
     * @returns 
     */
    export function Mod(curr: number, mod: number) {
        curr %= mod;
        curr += mod;
        curr %= mod;
        return curr;
    }

    /**
     * a < b 的话返回 0，否则返回 1
     * @param a 
     * @param b 
     * @returns 
     */
    export function Step (a: number, b: number) {
        return a < b ? 1 : 0;
    }

    /**
     * 使用权重在 a 和 b 中间插值
     * @param a 
     * @param b 
     * @param w 
     * @returns 
     */
    export function Lerp (a: number, b: number, w: number) {
        return (1 - w) * a + w * b;
    }
}

export default utilMath;