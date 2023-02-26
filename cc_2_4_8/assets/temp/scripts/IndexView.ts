import BCType from "./frame/basic/BCType";
import UtilObjPool from "./frame/basic/UtilObjPool";
import ComponentNodeEventer from "./frame/component/ComponentNodeEventer";
import GraphicsDrawer from "./frame/extend/graphics_drawer/GraphicsDrawer";
import jiang from "./frame/global/Jiang";
import UINodeType from "./frame/ui/UINodeType";
import UIViewComponent from "./frame/ui/UIViewComponent";
import IndexDataModule from "./IndexModule";
import indexDataStorageItem from "./IndexStorageItem";
import IndexViewState from "./IndexViewState";
import IndexViewTouchPos from "./IndexViewTouchPos";

const {ccclass, property} = cc._decorator;

const APP = `IndexView`;

/**
 * 格子尺寸
 */
const GRID_SIZE = 30;

/**
 * 线宽
 */
const LINE_WIDTH = 4;

/**
 * 线的颜色
 */
const LINE_COLOR = new cc.Color(125, 125, 125);

/**
 * 表示激活的颜色
 */
const ACTIVE_COLOR = new cc.Color(0, 255, 0, 255);

/**
 * 用于填充的颜色
 */
const GRID_FILL_COLOR = new cc.Color(255, 255, 255, 150);

/**
 * 根界面
 */
@ccclass
export default class IndexView extends UIViewComponent {
    /**
     * 画笔 - 交互专用
     */
    @property(cc.Graphics)
    graphicsTouch: cc.Graphics = null;
    /**
     * 画笔 - 线格专用
     */
    @property(cc.Graphics)
    graphicsGridLine: cc.Graphics = null;
    /**
     * 画笔 - 线填充专用
     */
    @property(cc.Graphics)
    graphicsGridFill: cc.Graphics = null;
    /**
     * 画笔 - 格点专用
     */
    @property(cc.Graphics)
    grahpicsGridDot: cc.Graphics = null;

    /**
     * 画笔 - 交互专用 - 画面绘制器
     */
    graphicsTouchDrawer: GraphicsDrawer;
    /**
     * 画笔 - 线格专用 - 画面绘制器
     */
    graphicsGridLineDrawer: GraphicsDrawer;
    /**
     * 画笔 - 线填充专用 - 画面绘制器
     */
    graphicsGridFillDrawer: GraphicsDrawer;
    /**
     * 画笔 - 格点专用 - 画面绘制器
     */
    grahpicsGridDotDrawer: GraphicsDrawer;

    /**
     * 用于交互的节点集合
     */
    @property([ComponentNodeEventer])
    listNodeTouchPos: ComponentNodeEventer[] = [];

    /**
     * 交互节点的信息记录
     */
    listNodeTouchPosRec: IndexViewTouchPos[] = [];

    protected onLoad(): void {
        this.graphicsTouchDrawer = GraphicsDrawer.Pop(APP, this.graphicsTouch);
        this.graphicsGridLineDrawer = GraphicsDrawer.Pop(APP, this.graphicsGridLine);
        this.graphicsGridFillDrawer = GraphicsDrawer.Pop(APP, this.graphicsGridFill);
        this.grahpicsGridDotDrawer = GraphicsDrawer.Pop(APP, this.grahpicsGridDot);
        for (let i = 0; i < this.listNodeTouchPos.length; i++) {
            this.listNodeTouchPosRec.push(new IndexViewTouchPos(this.listNodeTouchPos[i]));
        };
    }

    static nodeType = UINodeType.Pop<IndexView, IndexViewState, number>(
        APP,
        {
            prefabPath: `IndexView`,
            componentGetter: node => node.getComponent(IndexView),
            listModuleStyle: [
                UINodeType.ModuleStyle.Pop<IndexView, IndexViewState, number>(
                    APP, 
                    {
                        listRefModule: [
                            IndexDataModule.INDEX
                        ],
                        propsFilter: (com, state, props) => {
                            // 【网格】
                            com.graphicsGridLineDrawer._graphics.clear();
                            let horCount = Math.floor(jiang.mgrUI._containerUI.width / 2 / GRID_SIZE);
                            let verCount = Math.floor(jiang.mgrUI._containerUI.height / 2 / GRID_SIZE);
                            for (let i = 0; i <= horCount; i++) {
                                com.graphicsGridLineDrawer.StraightLine(
                                    i * GRID_SIZE,
                                    -jiang.mgrUI._containerUI.height / 2,

                                    i * GRID_SIZE,
                                    jiang.mgrUI._containerUI.height / 2,

                                    LINE_WIDTH,
                                    LINE_COLOR
                                );

                                if (i == 0) {
                                    continue;
                                };

                                com.graphicsGridLineDrawer.StraightLine(
                                    - i * GRID_SIZE,
                                    -jiang.mgrUI._containerUI.height / 2,

                                    - i * GRID_SIZE,
                                    jiang.mgrUI._containerUI.height / 2,

                                    LINE_WIDTH,
                                    LINE_COLOR
                                );
                            };
                            for (let i = 0; i <= verCount; i++) {
                                com.graphicsGridLineDrawer.StraightLine(
                                    -jiang.mgrUI._containerUI.width / 2,
                                    i * GRID_SIZE,

                                    jiang.mgrUI._containerUI.width / 2,
                                    i * GRID_SIZE,

                                    LINE_WIDTH,
                                    LINE_COLOR
                                );

                                if (i == 0) {
                                    continue;
                                };
                                
                                com.graphicsGridLineDrawer.StraightLine(
                                    -jiang.mgrUI._containerUI.width / 2,
                                    - i * GRID_SIZE,

                                    jiang.mgrUI._containerUI.width / 2,
                                    - i * GRID_SIZE,

                                    LINE_WIDTH,
                                    LINE_COLOR
                                );
                            };

                            //【交互】
                            com.graphicsTouchDrawer._graphics.clear();
                            if (jiang.mgrData.Get(indexDataStorageItem.touchedPos) == null) {
                                let arr: number[] = [];
                                for (let i = 0; i < com.listNodeTouchPosRec.length; i++) {
                                    arr.push(0, 0);
                                };
                                jiang.mgrData.Set(indexDataStorageItem.touchedPos, arr);
                            };
                            for (let i = 0; i < com.listNodeTouchPosRec.length; i++) {
                                let iRec = i;
                                let rec = com.listNodeTouchPosRec[i];
                                rec.evter.node.x = jiang.mgrData.Get(indexDataStorageItem.touchedPos)[i * 2];
                                rec.evter.node.y = jiang.mgrData.Get(indexDataStorageItem.touchedPos)[i * 2 + 1];

                                // 在对应位置标准圆圈
                                com.graphicsTouchDrawer.RoundLine(
                                    rec.evter.node.x,
                                    rec.evter.node.y,

                                    GRID_SIZE / 4 * (i + 1),
                                    LINE_WIDTH,
                                    ACTIVE_COLOR
                                );

                                let nextI = (i + 1) % com.listNodeTouchPosRec.length;
                                let nextX = jiang.mgrData.Get(indexDataStorageItem.touchedPos)[nextI * 2];
                                let nextY = jiang.mgrData.Get(indexDataStorageItem.touchedPos)[nextI * 2 + 1];

                                // 连线
                                com.graphicsTouchDrawer.StraightLine(
                                    rec.evter.node.x,
                                    rec.evter.node.y,

                                    nextX,
                                    nextY,

                                    LINE_WIDTH,
                                    ACTIVE_COLOR
                                );

                                rec.evter.evterTouchStart.On((pos) => {
                                    jiang.mgrData.Get(indexDataStorageItem.touchedPos)[iRec * 2] = pos.getLocationX() - jiang.mgrUI._containerUI.width / 2;
                                    jiang.mgrData.Get(indexDataStorageItem.touchedPos)[iRec * 2 + 1] = pos.getLocationY() - jiang.mgrUI._containerUI.height / 2;
                                });
                                rec.evter.evterTouchMove.On((pos) => {
                                    jiang.mgrData.Get(indexDataStorageItem.touchedPos)[iRec * 2] = pos.getLocationX() - jiang.mgrUI._containerUI.width / 2;
                                    jiang.mgrData.Get(indexDataStorageItem.touchedPos)[iRec * 2 + 1] = pos.getLocationY() - jiang.mgrUI._containerUI.height / 2;
                                });
                            };
                            
                            //【格点】
                            com.graphicsGridFillDrawer._graphics.clear();
                            com.grahpicsGridDotDrawer._graphics.clear();
                            let recA = com.listNodeTouchPosRec[2];
                            let recO = com.listNodeTouchPosRec[1];
                            let recB = com.listNodeTouchPosRec[0];
                            // 向量 OA
                            let vecOAX = recA.evter.node.x - recO.evter.node.x;
                            let vecOAY = recA.evter.node.y - recO.evter.node.y;
                            // 向量 OB
                            let vecOBX = recB.evter.node.x - recO.evter.node.x;
                            let vecOBY = recB.evter.node.y - recO.evter.node.y;
                            // 叉乘方向
                            let dir = vecOAX * vecOBY - vecOAY * vecOBX;
                            // 许可
                            let ableCheck: (num: number) => boolean;
                            // 向屏幕外的方向
                            if (0 < dir) {
                                ableCheck = (num) => {
                                    return 0 < num;
                                };
                            };
                            // 向屏幕内的方向
                            if (dir < 0) {
                                ableCheck = (num) => {
                                    return num < 0;
                                };
                            };
                            // 记录下用于围蔽三角形的各个向量
                            for (let i = 0; i < com.listNodeTouchPosRec.length; i++) {
                                let rec = com.listNodeTouchPosRec[i];
                                let nextI = (i + 1) % com.listNodeTouchPosRec.length;
                                let vecX = jiang.mgrData.Get(indexDataStorageItem.touchedPos)[nextI * 2] - jiang.mgrData.Get(indexDataStorageItem.touchedPos)[i * 2];
                                let vecY = jiang.mgrData.Get(indexDataStorageItem.touchedPos)[nextI * 2 + 1] - jiang.mgrData.Get(indexDataStorageItem.touchedPos)[i * 2 + 1];
                                
                                rec.vecLeftX = Math.cos(Math.PI / 2) * vecX - Math.sin(Math.PI / 2) * vecY;
                                rec.vecLeftY = Math.sin(Math.PI / 2) * vecX + Math.cos(Math.PI / 2) * vecY;
                            };
                            let gridHorMin = - horCount - 1;
                            let gridHorMax = horCount + 1;
                            let gridVerMin = - verCount - 1;
                            let gridVerMax = verCount + 1;
                            for (let i = gridHorMin; i <= gridHorMax; i++) {
                                for (let j = gridVerMin; j <= gridVerMax; j++) {
                                    let gridCenterX = (i + 0.5) * GRID_SIZE;
                                    let gridCenterY = (j + 0.5) * GRID_SIZE;
                                    // 被环绕
                                    let isAround = true;
                                    for (let i = 0; i < com.listNodeTouchPosRec.length; i++) {
                                        let rec = com.listNodeTouchPosRec[i];
                                        let relX = gridCenterX - rec.evter.node.x;
                                        let relY = gridCenterY - rec.evter.node.y;
                                        // 点乘
                                        let dot = relX * rec.vecLeftX + relY * rec.vecLeftY;
                                        if (ableCheck(dot)) {
                                            continue;
                                        };
                                        // 没有被环绕的话，终止
                                        isAround = false;
                                    };
                                    // 环绕成功，绘制完整矩形
                                    if (isAround) {
                                        let lb = UtilObjPool.Pop(UtilObjPool.typeccVec2, APP);
                                        lb.x = gridCenterX - GRID_SIZE / 2;
                                        lb.y = gridCenterY - GRID_SIZE / 2;
                                        let rb = UtilObjPool.Pop(UtilObjPool.typeccVec2, APP);
                                        rb.x = gridCenterX + GRID_SIZE / 2;
                                        rb.y = gridCenterY - GRID_SIZE / 2;
                                        let rt = UtilObjPool.Pop(UtilObjPool.typeccVec2, APP);
                                        rt.x = gridCenterX + GRID_SIZE / 2;
                                        rt.y = gridCenterY + GRID_SIZE / 2;
                                        let lt = UtilObjPool.Pop(UtilObjPool.typeccVec2, APP);
                                        lt.x = gridCenterX - GRID_SIZE / 2;
                                        lt.y = gridCenterY + GRID_SIZE / 2;
                                        let list = UtilObjPool.Pop(UtilObjPool.typeArray, APP);
                                        list.push(lb, rb, rt, lt);
                                        com.graphicsGridFillDrawer.FillPosSetAll(list, GRID_FILL_COLOR);
                                        com.grahpicsGridDotDrawer.RoundFill(
                                            gridCenterX,
                                            gridCenterY,
        
                                            LINE_WIDTH / 2,
                                            ACTIVE_COLOR
                                        );
                                        for (let i = 0; i < list.length; i++) {
                                            UtilObjPool.Push(list[i]);
                                        };
                                        UtilObjPool.Push(list);
                                    };
                                    // 否则仅绘制点
                                    if (!isAround) {
                                        com.grahpicsGridDotDrawer.RoundFill(
                                            gridCenterX,
                                            gridCenterY,
        
                                            LINE_WIDTH / 2,
                                            LINE_COLOR
                                        );
                                    };
                                };
                            };
                        }
                    }
                )
            ],
            childrenCreator: [],
            propsType: BCType.typeNumber
        }
    );
}
