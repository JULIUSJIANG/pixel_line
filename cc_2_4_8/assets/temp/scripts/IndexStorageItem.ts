import MgrDataItem from "./frame/data/MgrDataItem";
import MgrDataType from "./frame/data/MgrDataType";

/**
 * 数据版本，只应该在调试阶段改这个值
 */
const version = 3;

const APP = `indexDataStorageItem`;

namespace indexDataStorageItem {
    /**
     * 交互的位置记录
     */
    export const touchedPos = MgrDataItem.Pop(
        APP,
        `touchedPos_${version}`,
        MgrDataType.typeObject,
        null
    );
}

export default indexDataStorageItem;