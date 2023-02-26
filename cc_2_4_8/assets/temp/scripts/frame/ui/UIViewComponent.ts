import utilNode from "../basic/UtilNode";
import UtilObjPool from "../basic/UtilObjPool";
import ComponentNodeEventer from "../component/ComponentNodeEventer";
import PlayAnimationOnEnable from "../component/PlayAnimationOnEnable";
import PlayAudioOnEnable from "../component/PlayAudioOnEnable";

const {ccclass, property} = cc._decorator;

const APP = `UIViewComponent`;

/**
 * 窗口的根组件
 */
@ccclass
export default class UIViewComponent extends cc.Component {
    /**
     * 节点事件派发器
     */
    _nodeEvterList: Array<ComponentNodeEventer> = UtilObjPool.Pop(UtilObjPool.typeArray, APP);

    /**
     * 动画播放
     */
    _animOnEnable: Array<PlayAnimationOnEnable> = UtilObjPool.Pop(UtilObjPool.typeArray, APP);

    /**
     * 音频播放
     */
    _audioOnEnable: Array<PlayAudioOnEnable> = UtilObjPool.Pop(UtilObjPool.typeArray, APP);

    /**
     * 颜色记录
     */
    _listColor: Map<cc.Node, Array<number>> = UtilObjPool.Pop(UtilObjPool.typeMap, APP);

    Record(): void {
        this._nodeEvterList = this.node.getComponentsInChildren(ComponentNodeEventer);
        this._animOnEnable = this.node.getComponentsInChildren(PlayAnimationOnEnable);
        this._audioOnEnable = this.node.getComponentsInChildren(PlayAudioOnEnable);

        // 记录下所有节点颜色
        utilNode.WalkAllNode(this.node, (n) => {
            let color = UtilObjPool.Pop(UtilObjPool.typeArray, APP);
            color.push(n.color.r, n.color.g, n.color.b);
            this._listColor.set(n, color);
        });
    }

    /**
     * 设置层
     * @param group 
     */
    SetGroup (group: number) {
        this._listColor.forEach((color, n) => {
            if (!n.isValid) {
                return;
            };
            n.groupIndex = group;
        });
    }

    /**
     * 置灰
     */
    BeGray (darkRate = 1) {
        this._listColor.forEach((color, n) => {
            if (!n.isValid) {
                return;
            };
            let c = color[0] + color[1] + color[2];
            c /= 3;
            c *= darkRate;
            let col = UtilObjPool.PopCCColor(APP, c, c, c, color[3]);
            UtilObjPool.Push(n.color);
            n.color = col;
        });
    }

    /**
     * 置彩色
     */
    BeColorFul () {
        this._listColor.forEach((color, n) => {
            if (!n.isValid) {
                return;
            };
            let col = UtilObjPool.PopCCColor(APP, color[0], color[1], color[2], color[3]);
            UtilObjPool.Push(n.color);
            n.color = col;
        });
    }

    /**
     * 取消所有事件监听
     */
    OffAll () {
        this._nodeEvterList.forEach(( evter ) => {
            if (!evter.isValid) {
                return;
            };
            evter.OffAll();
        });
    }
} 