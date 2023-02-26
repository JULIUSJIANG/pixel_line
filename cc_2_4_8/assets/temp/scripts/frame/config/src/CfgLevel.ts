
import UtilObjPool from "../../basic/UtilObjPool";
import UtilObjPoolType from "../../basic/UtilObjPoolType";

const APP = `CfgLevel`;

export default class CfgLevel {

	private constructor () {}

	private static _t = new UtilObjPoolType<CfgLevel> ({
		instantiate: () => {
			return new CfgLevel();
		},
		onPop: (t) => {

		},
		onPush: (t) => {

		},
        tag: APP
	});

	static Pop (apply: string, data: any[]) {
		let t = UtilObjPool.Pop(CfgLevel._t, apply);
		t.id = data[0];
		t.alpha_year = data[1];
		t.alpha_day = data[2];
		t.part_0_triger_ms = data[3];
		t.part_0_monster_id = data[4];
		t.part_0_monster_delay = data[5];
		t.part_0_monster_x = data[6];
		t.part_1_triger_ms = data[7];
		t.part_1_monster_id = data[8];
		t.part_1_monster_delay = data[9];
		t.part_1_monster_x = data[10];
		t.part_2_triger_ms = data[11];
		t.part_2_monster_id = data[12];
		t.part_2_monster_delay = data[13];
		t.part_2_monster_x = data[14];
		return t;
	}


	/**
	 * 标识
	 */
	id: number;

	/**
	 * 季节系数
	 */
	alpha_year: number;

	/**
	 * 日夜系数
	 */
	alpha_day: number;

	/**
	 * 波次 0 时间点
	 */
	part_0_triger_ms: number;

	/**
	 * 波次 0 单位 id
	 */
	part_0_monster_id: number[];

	/**
	 * 波次 0 单位延时
	 */
	part_0_monster_delay: number[];

	/**
	 * 波次 0 单位坐标
	 */
	part_0_monster_x: number[];

	/**
	 * 波次 1 时间点
	 */
	part_1_triger_ms: number;

	/**
	 * 波次 1 单位 id
	 */
	part_1_monster_id: number[];

	/**
	 * 波次 1 单位延时
	 */
	part_1_monster_delay: number[];

	/**
	 * 波次 1 单位坐标
	 */
	part_1_monster_x: number[];

	/**
	 * 波次 2 时间点
	 */
	part_2_triger_ms: number;

	/**
	 * 波次 2 单位 id
	 */
	part_2_monster_id: number[];

	/**
	 * 波次 2 单位延时
	 */
	part_2_monster_delay: number[];

	/**
	 * 波次 2 单位坐标
	 */
	part_2_monster_x: number[];


	/**
	 * 获取标识
	 * @param cfgItem 
	 */
	public static idGetter (cfgItem: CfgLevel): number {
		return cfgItem.id;
	}

	/**
	 * 获取季节系数
	 * @param cfgItem 
	 */
	public static alpha_yearGetter (cfgItem: CfgLevel): number {
		return cfgItem.alpha_year;
	}

	/**
	 * 获取日夜系数
	 * @param cfgItem 
	 */
	public static alpha_dayGetter (cfgItem: CfgLevel): number {
		return cfgItem.alpha_day;
	}

	/**
	 * 获取波次 0 时间点
	 * @param cfgItem 
	 */
	public static part_0_triger_msGetter (cfgItem: CfgLevel): number {
		return cfgItem.part_0_triger_ms;
	}

	/**
	 * 获取波次 0 单位 id
	 * @param cfgItem 
	 */
	public static part_0_monster_idGetter (cfgItem: CfgLevel): number[] {
		return cfgItem.part_0_monster_id;
	}

	/**
	 * 获取波次 0 单位延时
	 * @param cfgItem 
	 */
	public static part_0_monster_delayGetter (cfgItem: CfgLevel): number[] {
		return cfgItem.part_0_monster_delay;
	}

	/**
	 * 获取波次 0 单位坐标
	 * @param cfgItem 
	 */
	public static part_0_monster_xGetter (cfgItem: CfgLevel): number[] {
		return cfgItem.part_0_monster_x;
	}

	/**
	 * 获取波次 1 时间点
	 * @param cfgItem 
	 */
	public static part_1_triger_msGetter (cfgItem: CfgLevel): number {
		return cfgItem.part_1_triger_ms;
	}

	/**
	 * 获取波次 1 单位 id
	 * @param cfgItem 
	 */
	public static part_1_monster_idGetter (cfgItem: CfgLevel): number[] {
		return cfgItem.part_1_monster_id;
	}

	/**
	 * 获取波次 1 单位延时
	 * @param cfgItem 
	 */
	public static part_1_monster_delayGetter (cfgItem: CfgLevel): number[] {
		return cfgItem.part_1_monster_delay;
	}

	/**
	 * 获取波次 1 单位坐标
	 * @param cfgItem 
	 */
	public static part_1_monster_xGetter (cfgItem: CfgLevel): number[] {
		return cfgItem.part_1_monster_x;
	}

	/**
	 * 获取波次 2 时间点
	 * @param cfgItem 
	 */
	public static part_2_triger_msGetter (cfgItem: CfgLevel): number {
		return cfgItem.part_2_triger_ms;
	}

	/**
	 * 获取波次 2 单位 id
	 * @param cfgItem 
	 */
	public static part_2_monster_idGetter (cfgItem: CfgLevel): number[] {
		return cfgItem.part_2_monster_id;
	}

	/**
	 * 获取波次 2 单位延时
	 * @param cfgItem 
	 */
	public static part_2_monster_delayGetter (cfgItem: CfgLevel): number[] {
		return cfgItem.part_2_monster_delay;
	}

	/**
	 * 获取波次 2 单位坐标
	 * @param cfgItem 
	 */
	public static part_2_monster_xGetter (cfgItem: CfgLevel): number[] {
		return cfgItem.part_2_monster_x;
	}
}