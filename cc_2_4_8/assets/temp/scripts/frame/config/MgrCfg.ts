
import BCCollection from "../basic/BCCollection";
import UtilObjPool from "../basic/UtilObjPool";
import UtilObjPoolType from "../basic/UtilObjPoolType";
import MgrRes from "../res/MgrRes";
import CfgBuffProps from "./src/CfgBuffProps";
import CfgCommon from "./src/CfgCommon";
import CfgEff from "./src/CfgEff";
import CfgEquipmentLevel from "./src/CfgEquipmentLevel";
import CfgEquipmentProps from "./src/CfgEquipmentProps";
import CfgGameElement from "./src/CfgGameElement";
import CfgLevel from "./src/CfgLevel";
import CfgVoiceOgg from "./src/CfgVoiceOgg";

const APP = `MgrCfg`;

/**
 * 配置管理器
 */
class MgrCfg {

	private constructor () {}

	private static _t = new UtilObjPoolType<MgrCfg>({
		instantiate: () => {
			return new MgrCfg();
		},
		onPop: (t) => {

		},
		onPush: (t) => {

		},
        tag: APP
	});

	static Pop (apply: string) {
		return UtilObjPool.Pop(MgrCfg._t, apply);
	}

    /**
     * 单例
     */
    public static inst = MgrCfg.Pop(APP);

	/**
	 * 所有加载异步
	 */
	public promiseArr: Promise<unknown>[];
    
	public cfgBuffProps: BCCollection<CfgBuffProps> = BCCollection.Pop<CfgBuffProps>(APP);
	public cfgCommon: BCCollection<CfgCommon> = BCCollection.Pop<CfgCommon>(APP);
	public cfgEff: BCCollection<CfgEff> = BCCollection.Pop<CfgEff>(APP);
	public cfgEquipmentLevel: BCCollection<CfgEquipmentLevel> = BCCollection.Pop<CfgEquipmentLevel>(APP);
	public cfgEquipmentProps: BCCollection<CfgEquipmentProps> = BCCollection.Pop<CfgEquipmentProps>(APP);
	public cfgGameElement: BCCollection<CfgGameElement> = BCCollection.Pop<CfgGameElement>(APP);
	public cfgLevel: BCCollection<CfgLevel> = BCCollection.Pop<CfgLevel>(APP);
	public cfgVoiceOgg: BCCollection<CfgVoiceOgg> = BCCollection.Pop<CfgVoiceOgg>(APP);

    /**
     * 初始化
     */
    public Init () {
        this.promiseArr = [
			MgrRes.inst.CertainLoadAsset<any>("json_config/CfgBuffProps").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
						this.cfgBuffProps.add(CfgBuffProps.Pop(APP, item));
					});
			}),
			MgrRes.inst.CertainLoadAsset<any>("json_config/CfgCommon").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
						this.cfgCommon.add(CfgCommon.Pop(APP, item));
					});
			}),
			MgrRes.inst.CertainLoadAsset<any>("json_config/CfgEff").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
						this.cfgEff.add(CfgEff.Pop(APP, item));
					});
			}),
			MgrRes.inst.CertainLoadAsset<any>("json_config/CfgEquipmentLevel").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
						this.cfgEquipmentLevel.add(CfgEquipmentLevel.Pop(APP, item));
					});
			}),
			MgrRes.inst.CertainLoadAsset<any>("json_config/CfgEquipmentProps").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
						this.cfgEquipmentProps.add(CfgEquipmentProps.Pop(APP, item));
					});
			}),
			MgrRes.inst.CertainLoadAsset<any>("json_config/CfgGameElement").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
						this.cfgGameElement.add(CfgGameElement.Pop(APP, item));
					});
			}),
			MgrRes.inst.CertainLoadAsset<any>("json_config/CfgLevel").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
						this.cfgLevel.add(CfgLevel.Pop(APP, item));
					});
			}),
			MgrRes.inst.CertainLoadAsset<any>("json_config/CfgVoiceOgg").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
						this.cfgVoiceOgg.add(CfgVoiceOgg.Pop(APP, item));
					});
			})
        ];
    }
}

export default MgrCfg;
