// used by React-Redux @connect() - needed to stop @type from complaining
// https://github.com/Microsoft/TypeScript-React-Starter/issues/29#issuecomment-304775473
export const mergePropsForConnect = (stateProps: object, dispatchProps: object, ownProps: object): object => {

    return Object.assign({}, ownProps, stateProps, dispatchProps);

};

export const createLineChartData = (times: Array<number>, multi: number): any => {

	const strokes: Array<number> = times;
    const timeAxisTicks: Array<string> = ['0:00'];
    const firstStroke: number = strokes[0];
    const chartStrokesData: Array<any> = [{
        x: 0,
        y: '0'
    }];

    let samplePointSeconds: number = multi;

    strokes.forEach((strokeData: number, index: number) => {

        const samplePoint: number = samplePointSeconds * 1000;
        const stroke: number = strokeData - firstStroke;

        if(stroke >= samplePoint){

            const ratio: number = stroke / samplePoint;

            chartStrokesData.push({
                x: stroke,
                y: (((index * 10) / 4.805) / ratio).toFixed(2)
            });

            timeAxisTicks.push(samplePointSeconds % 60 === 0 ? samplePointSeconds / 60 + ':00' : Math.floor(samplePointSeconds / 60) + ':' + samplePointSeconds % 60);

            samplePointSeconds += multi;

        }

    });

    const chartData: any = {
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
    };

    const chartOptions: any = {
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
    };

    return {
    	data: chartData,
    	options: chartOptions
    };


};
