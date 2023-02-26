import BCPromiseCtrl from "../basic/BCPromiseCtrl";
import UtilObjPool from "../basic/UtilObjPool";
import UtilObjPoolType from "../basic/UtilObjPoolType";

const APP = `MgrRes`;

// 加载的线程数
const LINE_COUNT = 1;

// 加载的线程池
let lineList: Array<Promise<any>> = UtilObjPool.Pop(UtilObjPool.typeArray, APP);
lineList.length = LINE_COUNT;
for (let i = 0; i < lineList.length; i++) {
    lineList[i] = Promise.resolve();
};

// 加载的索引
let loadIdx: number = 0;

/**
 * 资源管理器
 */
class MgrRes {

    private constructor () {}

    private static _t = new UtilObjPoolType<MgrRes>({
        instantiate: () => {
            return new MgrRes();
        },
        onPop: (t) => {

        },
        onPush: (t) => {

        },
        tag: APP
    });

    static Pop (apply: string) {
        return UtilObjPool.Pop(MgrRes._t, apply);
    }

    /**
     * 实例
     */
    static inst = MgrRes.Pop(APP);
    
    /**
     * 资源加载记录
     */
    _assetsCtrlRec: Map<string, MgrRes.AssetLoadCtrl<any>> = UtilObjPool.Pop(UtilObjPool.typeMap, APP);

    /**
     * 确保下载某个预制体
     * @param resPath 
     */
    CertainLoadBundle (resPath: string): MgrRes.AssetLoadCtrl<cc.AssetManager.Bundle> {
        var ctrl = this._assetsCtrlRec.get(resPath);
        if (ctrl == null) {
            ctrl = this.DoLoadBundle(resPath);
            this._assetsCtrlRec.set(resPath, ctrl);
        };
        return ctrl;
    }

    /**
     * 确保下载某个预制体
     * @param resPath 
     */
    CertainLoadAsset<T extends cc.Asset> (resPath: string): MgrRes.AssetLoadCtrl<T> {
        var ctrl = this._assetsCtrlRec.get(resPath);
        if (ctrl == null) {
            ctrl = this.DoLoadAsset(resPath);         
            this._assetsCtrlRec.set(resPath, ctrl);
        };
        return ctrl as MgrRes.AssetLoadCtrl<T>;
    }

    /**
     * 获取纹理
     * @param resPath 
     * @returns 
     */
    GetTexture2D (resPath: string) {
        return this.CertainLoadAsset(resPath).content as cc.Texture2D;
    }

    /**
     * 静态的预制体缓存
     */
    _staticPrefabCache: Map<string, cc.Prefab> = UtilObjPool.Pop(UtilObjPool.typeMap, APP);

    /**
     * 预制体读取的缓存
     */
    _prefabGetterCache: Map<string, cc.Prefab> = UtilObjPool.Pop(UtilObjPool.typeMap, APP);

    /**
     * 获取预制体
     * @param resPath 
     * @returns 
     */
    GetPrefab (resPath: string) {
        if (this._staticPrefabCache.has(resPath)) {
            return this._staticPrefabCache.get(resPath);
        };
        return this.CertainLoadAsset(resPath).content as cc.Prefab;
    }

    private DoGetPrefab (resPath: string) {
        if (this._staticPrefabCache.has(resPath)) {
            return this._staticPrefabCache.get(resPath);
        };
        return this.CertainLoadAsset(resPath).content as cc.Prefab;
    }

    /**
     * 图片资源缓存
     */
    _sprfMap: Map<string, cc.SpriteFrame> = UtilObjPool.Pop(UtilObjPool.typeMap, APP);
    
    /**
     * 获取图片资源
     * @param resPath 
     */
    GetSpriteFrame (resPath: string) {
        if (!this._sprfMap.has(resPath)) {
            let ctrl = this.CertainLoadAsset<cc.Texture2D>(resPath);
            if (ctrl.content != null) {
                let sprf = UtilObjPool.Pop(UtilObjPool.typeCCSpriteFrame, APP);
                sprf.setTexture(ctrl.content);
                this._sprfMap.set(resPath, sprf);
            };
        };
        return this._sprfMap.get(resPath);
    }

    /**
     * 对象格式的 json 数据
     */
    _jsonMap: Map<string, any> = UtilObjPool.Pop(UtilObjPool.typeMap, APP);
    /**
     * 获取 json 格式的内容
     * @param resPath 
     * @returns 
     */
    GetJson (resPath: string) {
        if (!this._jsonMap.has(resPath)) {
            let ctrl = this.CertainLoadAsset<cc.JsonAsset>(resPath);
            if (ctrl.content != null) {
                this._jsonMap.set(resPath, ctrl.content.json);
            };
        };
        return this._jsonMap.get(resPath);
    }

    /**
     * 列表 - 当前所有的分包
     */
    _listBundle: Array<cc.AssetManager.Bundle> = UtilObjPool.Pop(UtilObjPool.typeArray, APP);

    /**
     * 加载分包
     * @param resPath 
     * @returns 
     */
    DoLoadBundle (resPath: string): MgrRes.AssetLoadCtrl<cc.AssetManager.Bundle> {
        var loadingPromiseCtrl = BCPromiseCtrl.Pop<cc.AssetManager.Bundle>(APP);
        
        loadIdx++;
        let lineIdx = loadIdx % lineList.length;
        lineList[lineIdx] = lineList[lineIdx].then(() => {
            console.log(`加载 [${resPath}]..`);
            cc.assetManager.loadBundle(resPath, (err: any) => {
                if (err) {
                    loadingPromiseCtrl.reject(err);
                }
                else {
                    let bundle = cc.assetManager.getBundle(resPath);
                    this._listBundle.push(bundle);
                    loadingPromiseCtrl.resolve(bundle);
                };
            });
            return loadingPromiseCtrl._promise;
        });

        return MgrRes.AssetLoadCtrl.Pop<cc.AssetManager.Bundle>(APP, loadingPromiseCtrl._promise);
    }

    /**
     * 确切进行某个预制体的下载
     * @param resPath 
     */
    DoLoadAsset (resPath: string): MgrRes.AssetLoadCtrl<cc.Asset> {
        var loadingPromiseCtrl = BCPromiseCtrl.Pop<cc.Asset>(APP);
        
        loadIdx++;
        let lineIdx = loadIdx % lineList.length;
        lineList[lineIdx] = lineList[lineIdx].then(() => {
            console.log(`加载 [${resPath}]..`);
            // 尝试先从子包中查找内容
            for (let i = 0; i < this._listBundle.length; i++) {
                let bundle = this._listBundle[i];
                let info = bundle.getInfoWithPath(resPath);
                if (!info) {
                    continue;
                };
                // 确实在子包里面，那么通过子包加载
                bundle.load<cc.Asset>(resPath, (err: any) => {
                    if (err) {
                        loadingPromiseCtrl.reject(err);
                    }
                    else {
                        loadingPromiseCtrl.resolve(bundle.get<cc.Asset>(resPath));
                    };
                });
                return loadingPromiseCtrl._promise;
            };
            cc.resources.load<cc.Asset>(resPath, (err: any) => {
                if (err) {
                    loadingPromiseCtrl.reject(err);
                }
                else {
                    loadingPromiseCtrl.resolve(cc.resources.get<cc.Asset>(resPath));
                };
            });
            return loadingPromiseCtrl._promise;
        });

        return MgrRes.AssetLoadCtrl.Pop<cc.Asset>(APP, loadingPromiseCtrl._promise);
    }

    /**
     * 用于读取资源缓存记录的
     */
    _symCache = Symbol(`SYM_CACHE`);

    /**
     * 实例化数量的记录
     */
    instantiateCountMap: Map<cc.Prefab, MgrRes.PrefabInfo> = UtilObjPool.Pop(UtilObjPool.typeMap, APP);

    /**
     * 获取实例
     * @param prefab 
     */
    GetInst (prefab: cc.Prefab): cc.Node {
        if (!this.instantiateCountMap.has(prefab)) {
            this.instantiateCountMap.set(
                prefab, 
                {
                    prefab: prefab,
                    instCount: 0,
                    pool: UtilObjPool.Pop(UtilObjPool.typeArray, APP)
                }
            );
        };
        let info = this.instantiateCountMap.get(prefab);
        let list = info.pool;
        let inst: cc.Node;
        if (0 < list.length) {
            inst = list.pop();
        }
        else {
            this.instantiateCountMap.get(prefab).instCount++;
            inst = cc.instantiate(prefab);
            inst[this._symCache] = info;
        };
        inst.active = true;
        return inst;
    }

    /**
     * 回收下面的所有子节点
     * @param node 
     * @returns 
     */
    RecoverChildren (node: cc.Node) {
        if (node == null) {
            return;
        };
        while (0 < node.childrenCount) {
            this.Recover(node.children[0]);
        };
    }

    /**
     * 回收
     * @param node 
     * @returns 
     */
    Recover (node: cc.Node) {
        let info = node[this._symCache];
        if (info == null) {
            node.destroy();
            return;
        };
        node.setParent(null);
        node.active = false;
        info.pool.push(node);
    }
}

namespace MgrRes {
    export class AssetLoadCtrl<T> {
        /**
         * 实际内容
         */
        content: T;

        /**
         * 加载的进度
         */
        loadingPromise: Promise<T> = null as any;

        private constructor () {}

        private static _t = new UtilObjPoolType<AssetLoadCtrl<any>>({
            instantiate: () => {
                return new AssetLoadCtrl();
            },
            onPop: (t) => {
    
            },
            onPush: (t) => {
    
            },
            tag: `AssetLoadCtrl`
        });
    
        static Pop<T> (apply: string, loadingPromise: Promise<T>) {
            let val = UtilObjPool.Pop(AssetLoadCtrl._t, apply);
            loadingPromise.then(( t ) => {
                val.content = t;
            });
            val.loadingPromise = loadingPromise;
            return val;
        }
    }
};

namespace MgrRes {
    /**
     * 预制体信息
     */
    export interface PrefabInfo {
        /**
         * 预制体
         */
        prefab: cc.Prefab;
        /**
         * 实例数量记录
         */
        instCount: number;
        /**
         * 对应的节点对象池
         */
        pool: Array<cc.Node>;
    }
}

export default MgrRes;