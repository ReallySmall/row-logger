import * as $ from 'jquery';
import * as Chart from 'chart.js';

export class RowingStatLineChart {

	constructor(selector: any, constant: number, data: Array<any>, samplePointSeconds: number){

		const ctx = selector.getContext('2d');
		const strokes: Array<any> = data;
		const timeAxisTicks: Array<string> = ['0:00'];
		const firstStroke: number = strokes[0];
		const chartStrokesData: Array<any> = [{
			x: 0,
			y: '0'
		}];

		strokes.forEach((strokeData: number, index: number)=>{

			const stroke: number = strokeData - firstStroke;
			const samplePoint = samplePointSeconds * 1000;

			if(stroke >= samplePoint){

				const ratio: number = stroke / samplePoint;

				chartStrokesData.push({
					x: stroke,
					y: ((index * (10 / constant)) / ratio).toFixed(2)
				})

				timeAxisTicks.push(samplePointSeconds % 60 === 0 ? samplePointSeconds / 60 + ':00' : Math.floor(samplePointSeconds / 60) + ':' + samplePointSeconds % 60);

				samplePointSeconds += samplePointSeconds;

			}

		});
	
		const lineChart = new Chart(ctx, {
			type:'line',
			data: {
				labels: timeAxisTicks,
				datasets: [
					{
						label: 'This session',
						data: chartStrokesData,
						backgroundColor: 'rgba(75, 192, 192, 0.4)',
						borderColor: 'rgba(75, 192, 192, 1)',
						lineTension: 0.3
					}
				]
			},
			'options': {
				animation: {
					duration: 0
				},
				legend: {
					display: false
				},
				scales: {
	                xAxes: [{
	                    display: true,
	                    scaleLabel: {
	                        display: true,
	                        labelString: 'Minutes'
	                    },
	                    ticks: {
	                        callback: (dataLabel, index) => {
	                            return dataLabel.slice(-2) === '00' ? dataLabel : null;
	                        }
	                    }
	                }],
	                yAxes: [{
	                    display: true,
	                    scaleLabel: {
	                        display: true,
	                        labelString: 'Metres'
	                    },
	                    ticks: {
	                    	stepSize: 500
	                    }
	                }]
	            }
			}
		});

	}

}