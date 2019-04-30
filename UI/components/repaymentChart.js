import { users } from '../components/user.js';
import { countDownToNextRepayment, getNextDueRepayment, getTotalDue, amountOfRepaymentsPosted, numberOfRepaymentsPosted, numberOfRepaymentsLeft, checkUserType} from '../components/user.js';

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  const data = google.visualization.arrayToDataTable([
    ['Repayments', 'number of repayments'],
    ['pending',     3],
    ['logged',      1],
    ['posted',  2]
  ]);

  const options = {
    title: 'Repayment Stats',
    pieHole: 0.7,
    pieSliceBorderColor: 'none',
    colors: ['#EDECFE', '#A3A1FB', '#6F6DCE'],
    legend: {
      position: "none",
      alignment: 'end',
      textStyle: {
        color: '#43425D',
      }
    },
    pieSliceText: 'none',
    tooltip: {
      trigger: 'hover'
    },
    height: 160,
    width: '100%',
    titleTextStyle: {
      color: '#43425D',
      bold: 'false',
      fontSize: 12,
    }
  };

  const chart = new google.visualization.PieChart(document.querySelector('#repayment-chart'));
  chart.draw(data, options);
};
const container = document.querySelector('#container');
container.addEventListener("load", drawChart());

