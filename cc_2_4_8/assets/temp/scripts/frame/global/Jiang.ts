import MgrCfg from '../config/MgrCfg';
import MgrData from '../data/MgrData';
import MgrEvter from '../evter/MgrEvter';
import MgrRes from "../res/MgrRes";
import MgrUI from '../ui/MgrUI';


namespace jiang {
    /**
     * 资源管理器
     */
    export const mgrRes = MgrRes.inst;

    /**
     * 视图管理器
     */
    export const mgrUI = MgrUI.inst;

    /**
     * 配置管理器
     */
    export const mgrCfg = MgrCfg.inst;

    /**
     * 数据管理器
     */
    export const mgrData = MgrData.inst;

    /**
     * 事件管理器
     */
    export const mgrEvter = MgrEvter.inst;
}


window["jiang"] = jiang;
export default jiang;
declare const window: any;