import BCType from "./frame/basic/BCType";
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
 * 根界面
 */
@ccclass
export default class IndexView extends UIViewComponent {
    /**
     * 画笔
     */
    @property(cc.Graphics)
    graphics: cc.Graphics = null;

    /**
     * 用于交互的节点集合
     */
    @property([ComponentNodeEventer])
    listNodeTouchPos: ComponentNodeEventer[] = [];

    /**
     * 交互节点的信息记录
     */
    listNodeTouchPosRec: IndexViewTouchPos[] = [];

    /**
     * 画面绘制器
     */
    drawer: GraphicsDrawer;

    protected onLoad(): void {
        this.drawer = GraphicsDrawer.Pop(APP, this.graphics);
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
                            // 清除画面
                            com.drawer._graphics.clear();

                            // 网格
                            let horCount = Math.floor(jiang.mgrUI._containerUI.width / 2 / GRID_SIZE);
                            let verCount = Math.floor(jiang.mgrUI._containerUI.height / 2 / GRID_SIZE);

                            for (let i = 0; i <= horCount; i++) {
                                com.drawer.StraightLine(
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

                                com.drawer.StraightLine(
                                    - i * GRID_SIZE,
                                    -jiang.mgrUI._containerUI.height / 2,

                                    - i * GRID_SIZE,
                                    jiang.mgrUI._containerUI.height / 2,

                                    LINE_WIDTH,
                                    LINE_COLOR
                                );
                            };
                            for (let i = 0; i <= verCount; i++) {
                                com.drawer.StraightLine(
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
                                
                                com.drawer.StraightLine(
                                    -jiang.mgrUI._containerUI.width / 2,
                                    - i * GRID_SIZE,

                                    jiang.mgrUI._containerUI.width / 2,
                                    - i * GRID_SIZE,

                                    LINE_WIDTH,
                                    LINE_COLOR
                                );
                            };

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
                                com.drawer.RoundLine(
                                    rec.evter.node.x,
                                    rec.evter.node.y,

                                    GRID_SIZE / 4 * (i + 1),
                                    LINE_WIDTH,
                                    cc.Color.GREEN
                                );

                                let nextI = (i + 1) % com.listNodeTouchPosRec.length;
                                let nextX = jiang.mgrData.Get(indexDataStorageItem.touchedPos)[nextI * 2];
                                let nextY = jiang.mgrData.Get(indexDataStorageItem.touchedPos)[nextI * 2 + 1];

                                // 连线
                                com.drawer.StraightLine(
                                    rec.evter.node.x,
                                    rec.evter.node.y,

                                    nextX,
                                    nextY,

                                    LINE_WIDTH,
                                    cc.Color.GREEN
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
                        }
                    }
                )
            ],
            childrenCreator: [],
            propsType: BCType.typeNumber
        }
    );
}
