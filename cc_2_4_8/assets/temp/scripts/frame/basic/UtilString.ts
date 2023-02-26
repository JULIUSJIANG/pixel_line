import UtilObjPool from "./UtilObjPool";

const EMPTY_STRING = "null";
const APP = `utilString`;
namespace utilString {
    export function CheckIsNullOrEmpty (val: string) {
        if (val == null || val == "" || val == EMPTY_STRING) {
            return true
        };
        return false;
    }

    export function ParseStrToCCColor (str: string) {
        let split = str.split(`,`);
        return UtilObjPool.PopCCColor(
            APP,
            Number.parseFloat(split[0]),
            Number.parseFloat(split[1]),
            Number.parseFloat(split[2]),
            255
        );
    }
}

export default utilString;