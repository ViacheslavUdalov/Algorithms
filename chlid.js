import {exec} from 'node:child_process';
import {promisify} from 'node:util';
const execAsync = promisify(exec);
export function runChild(arraySize, sortType, arrayType) {

    return  execAsync(`node ./sorts/${sortType.replace("Sort", "")}.tools.js -t ${arraySize} -a ${arrayType} -v`)
        .then((res) => {
            if (res.stderr) {
                throw new Error(res.stderr);
            }
            return res.stdout;
        })
}