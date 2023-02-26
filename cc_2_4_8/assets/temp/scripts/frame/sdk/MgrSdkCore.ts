/**
 * sdk 核心
 */
abstract class MgrSdkCore {
    /**
     * 存储
     * @param key 
     * @param val 
     */
    abstract Set (key: string, val: string): Promise<unknown>;
    /**
     * 读取
     * @param key 
     */
     abstract Get(key: string): Promise<string>;
    /**
     * 进行视频观看
     */
     abstract Video (): Promise<MgrSdkCore.VideoCtx>;
}

namespace MgrSdkCore {
    /**
     * 视频观看结果的上下文
     */
    export interface VideoCtx {
        /**
         * 结果的状态码
         */
        code: number;
        /**
         * 该状态的信息
         */
        ctx: any;
    }
}

export default MgrSdkCore;