import { Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill,
  ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';

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

export type ChartOptionsTutors = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  @ViewChild('chart') chart: ChartComponent;
  public barChart: Partial<ChartOptionsBar>;
  public tutorPie: Partial<ChartOptionsTutors>;
  public eventPie: Partial<ChartOptionsTutors>;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Classes', cols: 2, rows: 1 },
          { title: 'Subscribers', cols: 2, rows: 1 },
          { title: 'Requests', cols: 2, rows: 1 },
          { title: 'Events', cols: 2, rows: 1 },
          { title: 'Recent Activity', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Classes', cols: 2, rows: 1 },
        { title: 'Subscribers', cols: 1, rows: 1 },
        { title: 'Requests', cols: 1, rows: 1 },
        { title: 'Events', cols: 1, rows: 1 },
        { title: 'Recent Activity', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {
    this.createBarChart();
    this.createTutorPie();
    this.createEventsPie();
  }

  createBarChart(){
    this.barChart = {
      series: [
        {
          name: 'Count',
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
          endingShape: 'flat'
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
          text: '(Count)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter(val) {
            return '# ' + val;
          }
        }
      }
    };
  }

  createTutorPie(){
    this.tutorPie = {
      series: [20, 80, 40],
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: ['Tutors', 'Students', 'Parents'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  createEventsPie(){
    this.eventPie = {
      series: [50, 20],
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: ['Classes', 'Demos'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }
}
