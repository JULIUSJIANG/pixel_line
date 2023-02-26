import UtilObjPool from "./frame/basic/UtilObjPool";
import UtilObjPoolType from "./frame/basic/UtilObjPoolType";
import jiang from "./frame/global/Jiang";
import ViewState from "./frame/ui/ViewState";
import IndexLayer from "./IndexLayer";
import IndexDataModule from "./IndexModule";
import indexDataStorageItem from "./IndexStorageItem";

const APP = `IndexViewState`;

export default class IndexViewState extends ViewState {
    private constructor () {
        super(
            IndexLayer.GAME,
            ViewState.BG_TYPE.SELF,
            false
        );
    }

    private static _t = new UtilObjPoolType<IndexViewState> ({
        instantiate: () => {
            return new IndexViewState();
        },
        onPop: (t) => {

        },
        onPush: (t) => {

        },
        tag: APP
    });

    static Pop (apply: string) {
        let val = UtilObjPool.Pop(IndexViewState._t, apply);
        return val;
    }

    OnInit(): void {
        jiang.mgrUI.evterUpdate.On(() => {
            jiang.mgrUI.ModuleRefresh(IndexDataModule.INDEX);
        });
    }
}