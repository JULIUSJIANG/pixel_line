import UtilObjPool from "./frame/basic/UtilObjPool";
import DebugViewDefine from "./frame/debug/DebugViewDefine";

const APP = `indexCommon`;

interface AppRec {
    app: string;
    type: string;
    num: number;
};
let listAppRec: Array<AppRec> = UtilObjPool.Pop(UtilObjPool.typeArray, APP);

interface CountRec {
    type: string;
    num: number;
}
let listCountRec: Array<CountRec> = UtilObjPool.Pop(UtilObjPool.typeArray, APP);

namespace indexDebugModuleConsole {
    export const tree = DebugViewDefine.MsgGroup.Pop(
        APP,
        `hello world`,
        () => {
            return `hello world`;
        }
    );
}

export default indexDebugModuleConsole;