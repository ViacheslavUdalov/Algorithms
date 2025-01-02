import {AlgoStateInterface} from "./AlgoState.js";
import {AlgorithmModel} from "../serverModels/Algorithm.js";

export interface DbServiceInterface {
    config: any,
    deleteDb(): Promise<number>
    saveAllToDb(algoState: AlgoStateInterface): void
    find(): Promise<AlgorithmModel[]>
}