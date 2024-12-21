import EventEmitter from "node:events";

export const ALGO_STATUSES = {
	VALID: 'VALID',
	MISSING: 'MISSING',
	CALCULATING: 'CALCULATING',
	INVALID: 'INVALID',
};

export const ALGO_MESSAGES = {
	oneUpdated: 'oneUpdated',
	allUpdated: 'allUpdated',
};

class AlgoResults {
	id;
	sortType;
	arraySize;
	times = {
		random: undefined,
		sorted: undefined,
		reversed: undefined
	};
	status;
	isValid;
}

export class AlgorithmState {
	config;
	db;
	algosData = [];
	updateEmitter = new EventEmitter();

	constructor(db, config) {
		this.db = db;
		this.config = config;
	}

	async init() {
		await this._syncAlgoDataWithDB();
	}

	getData() {
		return this.algosData;
	}

	updateOneAlgo(algo) {
		const oldAlgo = this.algosData.find(nextAlgo => {
			return nextAlgo.arraySize === algo.arraySize && nextAlgo.sortType === algo.sortType;
		});
		if (oldAlgo) {
			Object.assign(oldAlgo, algo);
			oldAlgo.isValid = this._getIsAlgoValid(oldAlgo);
		} else {
			algo.isValid = this._getIsAlgoValid(algo);
			this.algosData.push(algo);
		}
		this.updateEmitter.emit('oneUpdated', oldAlgo || algo);
	}

	updateAllAlgos(algos) {
		const algoStates = algos.map(algo => algo.toObject());
		this._populateAlgosValidity(algoStates);
		algoStates.push(...this._getMissingAlgos(algoStates));
		this.algosData = algoStates;
		this.updateEmitter.emit('allUpdated', this.algosData);
	}

	updateAlgos(algos) {
		algos.forEach(algo => this.updateOneAlgo(algo));
	}

	async _syncAlgoDataWithDB() {
		const algos = await this.db.find({});
		this.updateAllAlgos(algos);
	}

	_populateAlgosValidity(algos) {
		algos.forEach((algo, index, algos) => {
			algos[index].isValid = this._getIsAlgoValid(algo);
			console.log('algos[index]', algos[index]);
		});
	}

	_getIsAlgoValid(algo) {
		return this.config.arrayTypes.includes(algo.arraySize) && this.config.sortTypes.includes(algo.sortType);
	}

	_getMissingAlgos(algos) {
		const missingAlgos = [];
		this.config.arrayTypes.forEach(arraySize => {
			this.config.sortTypes.forEach(sortType => {
				if (!algos.find(algo => algo.sortType === sortType && algo.arraySize === arraySize)) {
					const newAlgo = Object.assign(new AlgoResults(), {
						sortType: sortType,
						arraySize: arraySize,
						status: ALGO_STATUSES.MISSING,
						isValid: true,
					});

					missingAlgos.push(newAlgo);
				}
			});
		});
		return missingAlgos;
	}
}
