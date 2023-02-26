import MgrDataItem from "./frame/data/MgrDataItem";
import MgrDataType from "./frame/data/MgrDataType";
import DebugViewDefine from "./frame/debug/DebugViewDefine";

const APP = `indexCtrlModule`;
namespace indexDebugModuleCtrl {
    export const drawB2joint = DebugViewDefine.ModuleInfo.Pop(
        APP,
        `b2-绘制关节`,
        MgrDataItem.Pop(
            APP,
            `drawB2joint`,
            MgrDataType.typeBool,
            false
        )
    );
    export const drawB2transform = DebugViewDefine.ModuleInfo.Pop(
        APP,
        `b2-绘制变换`,
        MgrDataItem.Pop(
            APP,
            `drawB2transform`,
            MgrDataType.typeBool,
            false
        )
    );
    export const drawB2aabb = DebugViewDefine.ModuleInfo.Pop(
        APP,
        `b2-绘制箱盒`,
        MgrDataItem.Pop(
            APP,
            `drawB2aabb`,
            MgrDataType.typeBool,
            false
        )
    );
    export const drawB2shape = DebugViewDefine.ModuleInfo.Pop(
        APP,
        `b2-绘制形状`,
        MgrDataItem.Pop(
            APP,
            `drawB2shape`,
            MgrDataType.typeBool,
            false
        )
    );
    export const drawB2particle = DebugViewDefine.ModuleInfo.Pop(
        APP,
        `b2-绘制粒子`,
        MgrDataItem.Pop(
            APP,
            `drawB2particle`,
            MgrDataType.typeBool,
            false
        )
    );
    export const drawB2controller = DebugViewDefine.ModuleInfo.Pop(
        APP,
        `b2-绘制马达`,
        MgrDataItem.Pop(
            APP,
            `drawB2controller`,
            MgrDataType.typeBool,
            false
        )
    );
    export const drawB2contact = DebugViewDefine.ModuleInfo.Pop(
        APP,
        `b2-绘制碰撞`,
        MgrDataItem.Pop(
            APP,
            `drawB2contact`,
            MgrDataType.typeBool,
            false
        )
    );
}

export default indexDebugModuleCtrl;