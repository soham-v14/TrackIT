import React from 'react'
import { Line  } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';

function ChartComponent({sortedTransactions}) {
    const data = sortedTransactions.map((item) => {
        return {date:item.date, amount: item.amount};
    });

    let spendingData = sortedTransactions.filter((transaction) =>{
        if(transaction.type == "expense") {
            return {tag: transaction.tag, amount: transaction.amount};
        }
    });

    let finalSpending = spendingData.reduce((acc, obj) => {
        let key = obj.tag;
        if(!acc[key]) {
            acc[key] = {tag: obj.tag, amount: obj.amount};
        }else{
            acc[key].amount += obj.amount;
        }
        return acc;
    }, {});

    
    const config = {
        data:data,
        height: 500,
        autoFit: false,
        xField: "date",
        yField: "amount",
        point: {
            size: 5,
            shape: "diamond",
        },
        label: {
            style: {
                fill: "grey",
            },
        },
    };

    const spendingConfig = {
        data: Object.values(finalSpending),
        width: 500,
        angleField: "amount",
        colorField: "tag",
    };



    let chart;
    let pieChart;
    return (
        <div className='charts-wrapper' >
        <div>
        <h2>Your Analytics</h2> 
        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)}/>
        </div>

        <div>
        <h2>Your Spendings</h2> 
        <Pie {...spendingConfig}
        onReady={(chartInstance) => (pieChart = chartInstance)} />
        </div>
        </div>
    );
    }

    export default ChartComponent;
