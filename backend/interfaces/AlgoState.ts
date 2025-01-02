import EventEmitter from "node:events";
import {AlgorithmModel, ArrayType} from "../serverModels/Algorithm.js";

export interface AlgoStateInterface {
    config: any,
    db: any,
    algosData: AlgorithmModel[],
    updateEmitter: EventEmitter
    init(): void,
    getData(): AlgorithmModel[],
    updateOneAlgo(arraySize: number, sortType: string, arrayType: ArrayType, result: string): Promise<false | undefined>,
    updateAllAlgos(algos : AlgorithmModel[]): void,
    _syncAlgoDataWithDB(): void,
    _populateAlgosValidity(algos : AlgorithmModel[]):  void,
    _getIsAlgoValid(algo : AlgorithmModel): boolean,
    _getMissingAlgos(algos : AlgorithmModel[]): AlgorithmModel[],
    _getExtraAlgos(algos : AlgorithmModel[]): void,
}