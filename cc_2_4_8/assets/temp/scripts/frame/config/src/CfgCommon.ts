
import UtilObjPool from "../../basic/UtilObjPool";
import UtilObjPoolType from "../../basic/UtilObjPoolType";

const APP = `CfgCommon`;

export default class CfgCommon {

	private constructor () {}

	private static _t = new UtilObjPoolType<CfgCommon> ({
		instantiate: () => {
			return new CfgCommon();
		},
		onPop: (t) => {

		},
		onPush: (t) => {

		},
        tag: APP
	});

	static Pop (apply: string, data: any[]) {
		let t = UtilObjPool.Pop(CfgCommon._t, apply);
		t.tips_ms = data[0];
		t.book_info_count_per_page = data[1];
		t.unit_count_per_chapter = data[2];
		t.level_count_per_unit = data[3];
		t.rain_speed_x = data[4];
		t.rain_speed_y = data[5];
		t.rain_count_per_ms_max = data[6];
		t.snow_speed_x = data[7];
		t.snow_speed_y = data[8];
		t.snow_count_per_ms_max = data[9];
		t.particle_random_offset = data[10];
		return t;
	}


	/**
	 * 提示信息存在时长
	 */
	tips_ms: number;

	/**
	 * 图鉴界面每页信息量
	 */
	book_info_count_per_page: number;

	/**
	 * 每章节的小节数量
	 */
	unit_count_per_chapter: number;

	/**
	 * 每小节的关卡数量
	 */
	level_count_per_unit: number;

	/**
	 * 降雨速度x(像素/毫秒)
	 */
	rain_speed_x: number;

	/**
	 * 降雨速度y(像素/毫秒)
	 */
	rain_speed_y: number;

	/**
	 * 最大降雨量(个数/毫秒)
	 */
	rain_count_per_ms_max: number;

	/**
	 * 降雪速度x(像素/毫秒)
	 */
	snow_speed_x: number;

	/**
	 * 降雪速度y(像素/毫秒)
	 */
	snow_speed_y: number;

	/**
	 * 最大降雪量(个数/毫秒)
	 */
	snow_count_per_ms_max: number;

	/**
	 * 粒子速度随机误差
	 */
	particle_random_offset: number;


	/**
	 * 获取提示信息存在时长
	 * @param cfgItem 
	 */
	public static tips_msGetter (cfgItem: CfgCommon): number {
		return cfgItem.tips_ms;
	}

	/**
	 * 获取图鉴界面每页信息量
	 * @param cfgItem 
	 */
	public static book_info_count_per_pageGetter (cfgItem: CfgCommon): number {
		return cfgItem.book_info_count_per_page;
	}

	/**
	 * 获取每章节的小节数量
	 * @param cfgItem 
	 */
	public static unit_count_per_chapterGetter (cfgItem: CfgCommon): number {
		return cfgItem.unit_count_per_chapter;
	}

	/**
	 * 获取每小节的关卡数量
	 * @param cfgItem 
	 */
	public static level_count_per_unitGetter (cfgItem: CfgCommon): number {
		return cfgItem.level_count_per_unit;
	}

	/**
	 * 获取降雨速度x(像素/毫秒)
	 * @param cfgItem 
	 */
	public static rain_speed_xGetter (cfgItem: CfgCommon): number {
		return cfgItem.rain_speed_x;
	}

	/**
	 * 获取降雨速度y(像素/毫秒)
	 * @param cfgItem 
	 */
	public static rain_speed_yGetter (cfgItem: CfgCommon): number {
		return cfgItem.rain_speed_y;
	}

	/**
	 * 获取最大降雨量(个数/毫秒)
	 * @param cfgItem 
	 */
	public static rain_count_per_ms_maxGetter (cfgItem: CfgCommon): number {
		return cfgItem.rain_count_per_ms_max;
	}

	/**
	 * 获取降雪速度x(像素/毫秒)
	 * @param cfgItem 
	 */
	public static snow_speed_xGetter (cfgItem: CfgCommon): number {
		return cfgItem.snow_speed_x;
	}

	/**
	 * 获取降雪速度y(像素/毫秒)
	 * @param cfgItem 
	 */
	public static snow_speed_yGetter (cfgItem: CfgCommon): number {
		return cfgItem.snow_speed_y;
	}

	/**
	 * 获取最大降雪量(个数/毫秒)
	 * @param cfgItem 
	 */
	public static snow_count_per_ms_maxGetter (cfgItem: CfgCommon): number {
		return cfgItem.snow_count_per_ms_max;
	}

	/**
	 * 获取粒子速度随机误差
	 * @param cfgItem 
	 */
	public static particle_random_offsetGetter (cfgItem: CfgCommon): number {
		return cfgItem.particle_random_offset;
	}
}