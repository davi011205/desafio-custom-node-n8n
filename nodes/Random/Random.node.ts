import {
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import axios from 'axios';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:Random.svg',
		group: ['transform'],
		version: 1,
		description: 'Um conector do n8n que recebe um input de mínimo e máximo inteiro (ambos inclusos) para retornar um número aleatório!',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Minimo',
				name: 'min',
				type: 'number',
				default: 1,
				required: true,
				description: 'Valor minimo',
			},
			{
				displayName: 'Maximo',
				name: 'max',
				type: 'number',
				default: 1,
				required: true,
				description: 'Valor maximo',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let returnData: IDataObject[] = [];

		let min = this.getNodeParameter('min', 0) as number;
		let max = this.getNodeParameter('max', 0) as number;

		try {
			// Faz a chamada HTTP usando axios
			const response = await axios.get(`https://www.random.org/integers/`, {
				params: {
					num: 1,
					min,
					max,
					col: 1,
					base: 10,
					format: 'plain',
					rnd: 'new',
				},
				headers: {
					Accept: 'application/json',
				},
				responseType: 'text', 
			});

			let randomNumber = parseInt(response.data.toString().trim(), 10);

			returnData.push({
				random: randomNumber,
				min,
				max,
			});

		} catch (error) {
			throw new Error(`Erro ao buscar número aleatório: ${(error as Error).message}`);
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
