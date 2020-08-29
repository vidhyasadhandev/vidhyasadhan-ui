import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ChartComponent,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip} from 'ng-apexcharts';

export type ChartOptionsRad = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};
export type ChartOptionsBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-allreports',
  templateUrl: './allreports.component.html',
  styleUrls: ['./allreports.component.css']
})
export class AllreportsComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptionsRad>;
  public barChart: Partial<ChartOptionsBar>;

  constructor() {
    this.chartOptions = {
      series: [85, 55, 75],
      chart: {
        height: 265,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px'
            },
            value: {
              fontSize: '16px'
            },
            total: {
              show: true,
              label: 'Average',
              formatter(w) {
                return '50';
              }
            }
          }
        }
      },
      labels: ['Learn', 'Practice', 'Test']
    };

    this.barChart = {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }
      ],
      chart: {
        type: 'bar',
        height: 250
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '35%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct'
        ]
      },
      yaxis: {
        title: {
          text: '(hours)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter(val) {
            return '$ ' + val + ' hours';
          }
        }
      }
    };
  }


  ngOnInit(): void {
  }

}
