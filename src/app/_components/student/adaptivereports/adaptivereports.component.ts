import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexFill
} from 'ng-apexcharts';
import { months } from 'moment';

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

export type RadialChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-adaptivereports',
  templateUrl: './adaptivereports.component.html',
  styleUrls: ['./adaptivereports.component.css']
})
export class AdaptivereportsComponent implements OnInit {


  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<LineChartOptions>;
  public radialChartOptions: Partial<RadialChartOptions>;

  radialCharts = [];

  constructor() {
    this.lineChartData();
    this.getradialCharts();

  }

  reportDate = new Date();

  lineChartData(){
    const dayArray = [];
    for (let index = 1; index < 31; index++) {
      dayArray.push(index);
    }
    this.chartOptions = {
      series: [
        {
          name: 'Chapters Completed',
          data: [8, 9, 3, 12, 15, 4 , 15, 3, 8, 9, 6, 2, 8, 9, 12, 2, 15, 4 , 3, 8, 9, 3, 6, 12, 15, 4 , 3, 2, 3]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      // title: {
      //   text: 'Average Chapter Completions',
      //   align: 'left',
      // },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: dayArray,
        title: {
          text: 'Days'
        }
      },
      yaxis: {
        title: {
          text: 'Chapters'
        },
        min: 1,
        max: 20
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

  getradialCharts(){
    this.radialChartOptions = {
      series: [75],
      chart: {
        height: 250,
        type: 'radialBar',
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '40%',
            background: '#fff',
            image: undefined,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '5%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '12px'
            },
            value: {
              formatter: (val) => {
                return parseInt(val.toString(), 10).toString();
              },
              color: '#111',
              fontSize: '14px',
              show: true
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ff5e3a'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Percent']
    };

    for (let index = 0; index < 4; index++) {
      this.radialCharts.push(this.radialChartOptions);
    }

  }

  ngOnInit(): void {
  }

}
