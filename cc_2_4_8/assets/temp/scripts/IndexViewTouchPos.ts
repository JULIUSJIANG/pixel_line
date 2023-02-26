import ComponentNodeEventer from "./frame/component/ComponentNodeEventer";

/**
 * 交互位置
 */
export default class IndexViewTouchPos {
    /**
     * 事件派发器
     */
    evter: ComponentNodeEventer;

    constructor (
        evter: ComponentNodeEventer
    ) 
    {
        this.evter = evter;
    }
}