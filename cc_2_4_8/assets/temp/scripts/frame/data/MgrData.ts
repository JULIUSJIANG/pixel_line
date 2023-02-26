import BCPromiseCtrl from "../basic/BCPromiseCtrl";
import UtilObjPool from "../basic/UtilObjPool";
import UtilObjPoolType from "../basic/UtilObjPoolType";
import utilString from "../basic/UtilString";
import MgrSdk from "../sdk/MgrSdk";
import MgrDataItem from "./MgrDataItem";

const APP = `MgrData`;

/**
 * 数据中心
 */
export default class MgrData {

    private constructor () {}

    private static _t = new UtilObjPoolType<MgrData> ({
        instantiate: () => {
            return new MgrData();
        },
        onPop: (t) => {

        },
        onPush: (t) => {

        },
        tag: APP
    });

    static Pop (apply: string) {
        return UtilObjPool.Pop(MgrData._t, apply);
    }

    /**
     * 全局唯一的单例
     */
    static inst = MgrData.Pop(APP);
    /**
     * 当前模块
     */
    _moduleSet: Set<MgrDataItem<unknown>> = UtilObjPool.Pop(UtilObjPool.typeSet, APP) as Set<MgrDataItem<unknown>>;
    
    /**
     * 添加模块
     * @param dataItem 
     */
    AddModule (dataItem: MgrDataItem<unknown>) {
        this._moduleSet.add(dataItem);
    }

    /**
     * 数据缓存
     */
    _dataCache: Map<MgrDataItem<any>, any> = UtilObjPool.Pop(UtilObjPool.typeMap, APP);

    /**
     * 所有异步初始化
     */
    promiseArr: Array<Promise<unknown>> = UtilObjPool.Pop(UtilObjPool.typeArray, APP);

    /**
     * 初始化的进程
     */
    initPromise = BCPromiseCtrl.Pop(APP);

    Init () {
        this._moduleSet.forEach(( dateItem ) => {
            this.promiseArr.push(this.InitDataItem(dateItem));
        });
        Promise.all(this.promiseArr)
            .then(() => {
                this.initPromise.resolve(null);
            });
    }

    /**
     * 读取模块
     * @param dataItem 
     * @returns 
     */
    InitDataItem<T> (dataItem: MgrDataItem<T>): Promise<T> {
        // 先确保 _dataCache 里面有值
        return UtilObjPool.PopPromise<void>(
            APP,
            ( resolve ) => {
                // 如果还没缓存这个键
                if (!this._dataCache.has(dataItem)) {
                    MgrSdk.inst.core.Get(dataItem.tag)
                        .then((val) => {
                            if (utilString.CheckIsNullOrEmpty(val)) {
                                this._dataCache.set(dataItem, dataItem.defVal);
                            }
                            else {
                                this._dataCache.set(dataItem, dataItem.valType.toVal(val));
                            };
                            resolve();
                        })
                }
                else {
                    resolve();
                };
            }
        )
        // 然后返回 _dataCache 里面的值
            .then(() => {
                return Promise.resolve(this._dataCache.get(dataItem));
            })
    }

    /**
     * 读取数据
     * @param dataItem 
     * @returns 
     */
    Get<T> (dataItem: MgrDataItem<T>): T {
        return this._dataCache.get(dataItem);
    }

    /**
     * 存储数据
     * @param dataItem 
     * @param t 
     * @returns 
     */
    Set<T> (dataItem: MgrDataItem<T>, t: T): void {
        this._dataCache.set(dataItem, t);
    }

    /**
     * 存储
     */
    Save () {
        this._dataCache.forEach(( val, index ) => {
            let localStr = index.valType.toString(val);
            MgrSdk.inst.core.Set(index.tag, localStr);
        });
    }
}

// 每次程序隐藏的时候，存储一次数据
cc.game.on(cc.game.EVENT_HIDE, () => {
    MgrData.inst.Save();
});