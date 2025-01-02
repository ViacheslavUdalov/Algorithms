import {AlgoStateInterface} from "./AlgoState.js";
import {AlgorithmModel, ArrayType} from "../serverModels/Algorithm.js";


export interface JobServiceInterface {
    config: any,
    executeFuncForString(algoState: AlgoStateInterface, sortType: string, arraySize: number): Promise<AlgorithmModel>,
    executeFuncForCell(algoState: AlgoStateInterface, arraySize: number,
                       sortType: string, arrayType: ArrayType) : Promise<string>,
    executeFuncForAllAlgos(algoState: AlgoStateInterface): Promise<AlgorithmModel[]>,
    checkBdForData(): Promise<any>
}