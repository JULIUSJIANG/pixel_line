import UtilObjPool from "../basic/UtilObjPool";
import UtilObjPoolType from "../basic/UtilObjPoolType";
import MgrSdkCore from "./MgrSdkCore";

const APP = `MgrSdkCoreH5`;

/**
 * sdk 核心-h5
 */
export default class MgrSdkCoreH5 extends MgrSdkCore {

    private constructor () {
        super();
    }

    private static _t = new UtilObjPoolType<MgrSdkCoreH5>({
        instantiate: () => {
            return new MgrSdkCoreH5();
        },
        onPop: (t) => {

        },
        onPush: (t) => {

        },
        tag: APP
    });

    static Pop (apply: string) {
        return UtilObjPool.Pop(MgrSdkCoreH5._t, apply);
    }

    /**
     * 存储
     * @param key 
     * @param val 
     * @returns 
     */
    Set(key: string, val: string): Promise<unknown> {
        localStorage.setItem(key, val);
        return Promise.resolve();
    }

    /**
     * 读取
     * @param key 
     * @returns 
     */
    Get(key: string): Promise<string> {
        return Promise.resolve(localStorage.getItem(key));
    }

    /**
     * 进行视频观看
     * @returns 
     */
    Video () {
        return Promise.resolve({
            code: 0,
            ctx: null
        });
    }
}