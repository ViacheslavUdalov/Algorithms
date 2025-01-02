var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import config from "../../config.js";
import Algorithm from "../schema/AlgorithmSchema.js";
const ARRAY_SIZES = config.arrayTypes;
const SORT_TYPES = config.sortTypes;
export class DBService {
    constructor(config) {
        this.config = config;
    }
    async deleteDb() {
        const result = await Algorithm.deleteMany({});
        return result.deletedCount;
    }
    async find() {
        const result = await Algorithm.find({}).lean();
        return result;
    }
    async saveAllToDb(algoState) {
        algoState.algosData.map(async (item) => {
            const { _id } = item, itemForDb = __rest(item, ["_id"]);
            const algo = await new Algorithm(itemForDb);
            algo.save();
        });
        algoState.updateEmitter.emit('writeToDb');
    }
}
