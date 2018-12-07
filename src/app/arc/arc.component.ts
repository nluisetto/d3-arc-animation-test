import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import * as d3 from 'd3';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DefaultArcObject} from 'd3';

const TAU: number = 2 * Math.PI;

@Component({
  selector: 'app-arc',
  templateUrl: './arc.component.html',
  styleUrls: ['./arc.component.scss']
})
export class ArcComponent implements OnInit, OnChanges, OnDestroy {
  @Input() start?: number;
  @Input() end?: number;
  @Input() color?: string;

  startStream: BehaviorSubject<number>;
  endStream: BehaviorSubject<number>;
  colorStream: BehaviorSubject<string>;

  private _subscriptions: Array<Subscription> = [];

  constructor() { }

  ngOnInit() {

    const canvasWidth = 600;
    const canvasHeight = 600;

    const innerRadius = 200;
    const outerRadius = 200;

    const arcPath = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const svg = d3
      .select('#chart')
      .append('svg');

    svg.attr('width', canvasWidth)
      .attr('height', canvasHeight);

    const g = svg
      .append('g')
      .attr('transform', 'translate(' + (canvasWidth / 2) + ', ' + (canvasHeight / 2) + ')');

    const arc = g
      .append('path')
      // .datum({ startAngle: 0.25 * TAU, endAngle: 0.127 * TAU + 0.25 * TAU })
      .datum({
        // startAngle: 0.25 * TAU,
        // endAngle: 0.127 * TAU + 0.25 * TAU
        startAngle: 0,
        endAngle: TAU
      })
      // .style('fill', 'orange')
      // .style('fill', 'none')
      .style('stroke', 'green')
      .style('stroke-width', '30')
      .style('stroke-linejoin', 'round')
      .attr('d', arcPath);

    d3.interval(
      () => {
        arc
          .transition()
          .duration(2000)
          .attrTween('d', (data: DefaultArcObject) => {
            const interpolateStartAngle = d3.interpolate(data.startAngle, Math.random() * TAU  + 0.25 * TAU);
            const interpolateEndAngle = d3.interpolate(data.endAngle, Math.random() * TAU  + 0.25 * TAU);

            return (t) => {
              data.startAngle = interpolateStartAngle(t);
              data.endAngle = interpolateEndAngle(t);
              return arcPath(data);
            };
          });
      },
      2100
    );

    this.startStream = new BehaviorSubject(this.start);
    this._subscriptions.push(
      this.startStream
        .pipe()
        .subscribe()
    );

    this.endStream = new BehaviorSubject(this.end);
    this._subscriptions.push(
      this.startStream
        .pipe()
        .subscribe()
    );

    this.colorStream = new BehaviorSubject(this.color);
    this._subscriptions.push(
      this.startStream
        .pipe()
        .subscribe()
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const startChange: SimpleChange = changes.start;
    this.startStream.next(startChange.currentValue);

    const endChange: SimpleChange = changes.end;
    this.endStream.next(endChange.currentValue);

    const colorChange: SimpleChange = changes.color;
    this.colorStream.next(colorChange.currentValue);
  }

  ngOnDestroy(): void {
    this._subscriptions
      .forEach(
        (subscription) => subscription.unsubscribe()
      );
  }

}
