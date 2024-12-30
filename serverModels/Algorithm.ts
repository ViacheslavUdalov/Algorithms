import {Types} from "mongoose";

export type AlgorithmModel = {
    _id?: Types.ObjectId;
    sortType: string;
    arraySize: number;
    times : Times,
status: string | undefined;
isValid: boolean | undefined; 
createdAt?: Date
}

export type ArrayType = keyof Times

type Times = {
    random: string | undefined,
    sorted: string | undefined,
    reversed: string | undefined
}