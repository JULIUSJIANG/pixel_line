import IndexDataModule from "../../IndexModule";
import BCType from "../basic/BCType";
import ComponentNodeEventer from "../component/ComponentNodeEventer";
import jiang from "../global/Jiang";
import UINodeType from "./UINodeType";
import UIViewComponent from "./UIViewComponent";

const {ccclass, property} = cc._decorator;

const APP = `UIMask`;

/**
 * ui 的通用遮罩
 */
@ccclass
export default class UIMask extends UIViewComponent {
    /**
     * 按钮 - 遮罩
     */
    @property(ComponentNodeEventer)
    btnMask: ComponentNodeEventer = null;

    static nodeType = UINodeType.Pop<UIMask, number, number>(
        APP,
        {
            prefabPath: `UIMask`,
            componentGetter: node => node.getComponent(UIMask),
            listModuleStyle: [
                UINodeType.ModuleStyle.Pop<UIMask, number, number>(
                    APP,
                    {
                        listRefModule: [
                            IndexDataModule.DEFAULT
                        ],
                        propsFilter: (com, state, props) => {
                            com.btnMask.evterTouchEnd.On(() => {
                                jiang.mgrUI._listViewDisplay[jiang.mgrUI._maskIdx].tState.OnMaskTouch();
                            });
                        }
                    }
                )
            ],
            childrenCreator: [],
            propsType: BCType.typeNumber
        }
    );
}