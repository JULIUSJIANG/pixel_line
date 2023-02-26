import BCEventer from "../basic/BCEventer";
const {ccclass, property} = cc._decorator;

const APP = `ComponentNodeEventer`;

/**
 * 节点事件派发器
 */
@ccclass
export default class ComponentNodeEventer extends cc.Component {
    /**
     * 事件派发器-交互开始
     */
    evterTouchStart: BCEventer<cc.Event.EventTouch> = BCEventer.Pop(APP);

    /**
     * 事件派发器-交互中
     */
    evterTouchMove: BCEventer<cc.Event.EventTouch> = BCEventer.Pop(APP);

    /**
     * 事件派发-交互结束
     */
    evterTouchEnd: BCEventer<cc.Event.EventTouch> = BCEventer.Pop(APP);

    /**
     * 开始编辑
     */
    evterEditDidBegan: BCEventer<unknown> = BCEventer.Pop(APP);
    /**
     * 文本变化
     */
    evterEditDidChanged: BCEventer<unknown> = BCEventer.Pop(APP);
    /**
     * 编辑结束
     */
    evterEditDidEnd: BCEventer<unknown> = BCEventer.Pop(APP);
    /**
     * 编辑结束
     */
    evterEditReturn: BCEventer<unknown> = BCEventer.Pop(APP);
    /**
     * 编辑框
     */
    editBox: cc.EditBox;

    /**
     * 滑条
     */
    evterSlide: BCEventer<unknown> = BCEventer.Pop(APP);
    /**
     * 滑条
     */
    slider: cc.Slider;

    /**
     * 滚动视图变化
     */
    evterScrolling: BCEventer<unknown> = BCEventer.Pop(APP);
    /**
     * 滚动视图
     */
    scroll: cc.ScrollView;

    /**
     * 事件派发 - 动画结束
     */
    evterAnimFinished: BCEventer<unknown> = BCEventer.Pop(APP);
    /**
     * 动画组件
     */
    anim: cc.Animation;

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, (args) => {
            let node = args.target;
            this.evterTouchStart.Call(args);
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (args) => {
            this.evterTouchMove.Call(args);
        });
        let btn = this.node.getComponent(cc.Button);
        if (btn == null) {
            this.node.on(cc.Node.EventType.TOUCH_END, (args) => {
                this.evterTouchEnd.Call(args);
            });
        }
        else {
            this.node.on(`click`, (args) => {
                this.evterTouchEnd.Call(args);
            });
        };
        this.node.on('editing-did-began', (args) => {
            this.evterEditDidBegan.Call(args);
        });
        this.node.on('text-changed', (args) => {
            this.evterEditDidChanged.Call(args);
        });
        this.node.on('editing-did-ended', (args) => {
            this.evterEditDidEnd.Call(args);
        });
        this.node.on('editing-return', (args) => {
            this.evterEditReturn.Call(args);
        });
        this.editBox = this.node.getComponent(cc.EditBox);

        this.node.on('slide', (args) => {
            this.evterSlide.Call(args);
        });
        this.slider = this.node.getComponent(cc.Slider);

        this.node.on(`scrolling`, (args) => {
            this.evterScrolling.Call(args);
        });
        this.scroll = this.node.getComponent(cc.ScrollView);

        this.anim = this.node.getComponent(cc.Animation);
        if (this.anim != null) {
            this.anim.on(cc.Animation.EventType.FINISHED, (args) => {
                this.evterAnimFinished.Call(args);
            });
        };
    }

    /**
     * 取消所有监听
     */
    OffAll () {
        if (!this.isValid) {
            return;
        };
        this.evterTouchStart.Clear();
        this.evterTouchMove.Clear();
        this.evterTouchEnd.Clear();

        this.evterEditDidBegan.Clear();
        this.evterEditDidChanged.Clear();
        this.evterEditDidEnd.Clear();
        this.evterEditReturn.Clear();

        this.evterSlide.Clear();
    }
}