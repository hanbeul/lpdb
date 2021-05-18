import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props){
        super(props); 
        this.state = {
            chartData:{
                labels: props.label,
                datasets:[
                    {
                        label: 'Visits',
                        data:[
                            14,
                            42,
                            26,
                            66,
                            22            
                        ],
                        backgroundColor:[
                            'rgba(54, 162, 235, 0.4)',
                            'rgba(54, 162, 235, 0.4)',
                            'rgba(54, 162, 235, 0.4)',
                            'rgba(54, 162, 235, 0.4)',
                            'rgba(54, 162, 235, 0.4)'
                        ]
                    }
                ]
            }
        }
    }


    static defaultProps ={
        displayTitle:true,
        displayLegend:true,
        legendPosition:'bottom'
    }


    render() {
        return (
            <div className="chart">
                <Line
                data={this.state.chartData}
                options={{
                    title:{
                        display:this.props.displayTitle,
                        text:'Visits This Month',
                        fontSize:15
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 50
                            }
                        }]
                    },
                    legend:{
                        display:this.props.displayLegend,
                        position: this.props.legendPosition
                    }
                }}
                />
            </div>
        )
    }
}

export default Chart
