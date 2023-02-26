import UtilObjPool from "../basic/UtilObjPool";
import UtilObjPoolType from "../basic/UtilObjPoolType";
import MgrSdkCore from "./MgrSdkCore";
import MgrSdkCoreH5 from "./MgrSdkCoreH5";

const APP = `MgrSdk`;

/**
 * sdk 管理器
 */
export default class MgrSdk {

    private constructor () {
        this.core = MgrSdkCoreH5.Pop(APP);
    }

    private static _t = new UtilObjPoolType<MgrSdk>({
        instantiate: () => {
            return new MgrSdk();
        },
        onPop: (t) => {

        },
        onPush: (t) => {

        },
        tag: APP
    });

    static Pop (apply: string) {
        return UtilObjPool.Pop(MgrSdk._t, apply);
    }

    /**
     * 全局实例
     */
    static inst = MgrSdk.Pop(APP);

    /**
     * 实际核心
     */
    core: MgrSdkCore;
}