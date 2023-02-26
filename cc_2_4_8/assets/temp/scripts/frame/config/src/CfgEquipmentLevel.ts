
import UtilObjPool from "../../basic/UtilObjPool";
import UtilObjPoolType from "../../basic/UtilObjPoolType";

const APP = `CfgEquipmentLevel`;

export default class CfgEquipmentLevel {

	private constructor () {}

	private static _t = new UtilObjPoolType<CfgEquipmentLevel> ({
		instantiate: () => {
			return new CfgEquipmentLevel();
		},
		onPop: (t) => {

		},
		onPush: (t) => {

		},
        tag: APP
	});

	static Pop (apply: string, data: any[]) {
		let t = UtilObjPool.Pop(CfgEquipmentLevel._t, apply);
		t.lev = data[0];
		t.count = data[1];
		return t;
	}


	/**
	 * 标识
	 */
	lev: number;

	/**
	 * 要求数量
	 */
	count: number;


	/**
	 * 获取标识
	 * @param cfgItem 
	 */
	public static levGetter (cfgItem: CfgEquipmentLevel): number {
		return cfgItem.lev;
	}

	/**
	 * 获取要求数量
	 * @param cfgItem 
	 */
	public static countGetter (cfgItem: CfgEquipmentLevel): number {
		return cfgItem.count;
	}
}