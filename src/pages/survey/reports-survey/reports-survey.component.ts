import { Component, OnInit, VERSION, ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-reports-survey',
  templateUrl: './reports-survey.component.html',
  styleUrls: ['./reports-survey.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportsSurveyComponent implements OnInit {

  content;
  prev;
  next;
  idlePeriod = 100;
  animationDuration = 1000;
  lastAnimation = 0;
  index = 0;

// charts

single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {

  }

     toggleText = (index, state) => {
    if (state === 'show') {
      this.content[index].querySelector('.text').classList.add('show');
    } else {
      this.content[index].querySelector('.text').classList.remove('show');
    }
  };

  ngOnInit(): void {
      this.loadLibrary();
          Object.assign(this, { single })


  }

  loadLibrary(): void {

    this.content = document.querySelectorAll('.section');
    this.prev = document.querySelector('.prev');
    this.next = document.querySelector('.next');

    this.toggleText(0, 'show');

    this.prev.addEventListener('click', () => {
      if (this.index < 1) return;
      this.toggleText(this.index, 'hide');
      this.index--;
      this.content.forEach((section, i) => {
        if (i === this.index) {
          this.toggleText(i, 'show');
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    this.next.addEventListener('click', () => {
      if (this.index > 2) return;
      this.toggleText(this.index, 'hide');
      this.index++;
      this.content.forEach((section, i) => {
        if (i === this.index) {
          this.toggleText(i, 'show');
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    document.addEventListener('wheel', (event: WheelEvent) => {
      var delta = 0;
      if (event['wheelDelta']) {
        delta = event['wheelDelta'];
      }
      var timeNow = new Date().getTime();
      // Cancel scroll if currently animating or within quiet period
      if (timeNow - this.lastAnimation < this.idlePeriod + this.animationDuration) {
        event.preventDefault();
        return;
      }

      if (delta < 0) {
        var event_temp = new Event('click');
        this.next.dispatchEvent(event_temp);
      } else {
        var event_temp = new Event('click');
        this.prev.dispatchEvent(event_temp);
      }

      this.lastAnimation = timeNow;
    });
  }


  onSelect(event): void {
    console.log(event);
  }

  }

  

  
  export let single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];
 

  

 

