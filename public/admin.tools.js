import {createArray, createSortedArray, createSortedReverseArray} from "../utils/CreateArrayFunc.js";
import {program} from "commander";
import {recreateDb} from "./admin.js";

const options = program.opts();
await useToolingForAdmin();
async function useToolingForAdmin() {
    if (options.admin) {
        switch (options.admin) {
            case 'recreate-all' :
                await recreateDb();
                break;
            case 'recreate-one' :
                switch (options.sortType) {
                    case 'bubble' :
                        await recreateDb('bubbleSort');
                        break;
                    case 'choice' :
                        await recreateDb('choiceSort');
                        break;
                    case 'insert' :
                        await recreateDb('insertSort');
                        break;
                    case 'merge' :
                        await recreateDb('mergeSort');
                        break;
                    case 'quick' :
                        await recreateDb('quickSort');
                        break;
                    default:
                        await recreateDb('bubbleSort');
                        break;
                }
                break;
            default:
                console.log('defaultAdmin')
                await recreateDb();
                break;
        }
    }
}