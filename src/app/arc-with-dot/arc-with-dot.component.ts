import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import * as d3 from 'd3';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DefaultArcObject} from 'd3';

const TAU: number = 2 * Math.PI;

@Component({
  selector: 'app-arc-with-dot',
  templateUrl: './arc-with-dot.component.html',
  styleUrls: ['./arc-with-dot.component.scss']
})
export class ArcWithDotComponent implements OnInit, OnChanges, OnDestroy {
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

    const radius = 200;

    const arcPath = d3
      .arc();
      // .innerRadius(radius)
      // .outerRadius(radius);

    const svg = d3
      .select('#chart')
      .append('svg');

    svg.attr('width', canvasWidth)
      .attr('height', canvasHeight);

    const g = svg
      .append('g')
      .attr('transform', 'translate(' + (canvasWidth / 2) + ', ' + (canvasHeight / 2) + ')');

    const arcInitialDatum: DefaultArcObject = {
      // startAngle: 0.25 * TAU,
      // endAngle: 0.127 * TAU + 0.25 * TAU
      innerRadius: radius,
      outerRadius: radius,
      startAngle: 0,
      endAngle: TAU
    };

    const arc = g
      .append('path')
      // .datum({ startAngle: 0.25 * TAU, endAngle: 0.127 * TAU + 0.25 * TAU })
      .datum(arcInitialDatum)
      // .style('fill', 'orange')
      // .style('fill', 'none')
      .style('stroke', 'green')
      .style('stroke-width', '30')
      .style('stroke-linejoin', 'round')
      .attr('d', arcPath);

    const arcNode = arc.node();

    const arcStartPoint = arcPath(arcInitialDatum)
      .split(' ')[0]
      .split(',');

    const initialDotX = (radius * Math.cos(0 - 0.25 * TAU)); // + radius; // Calculate the x position of the element.
    const initialDotY = (radius * Math.sin(0 - 0.25 * TAU)); // + radius;

    const dot = g
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 10)
      .style('fill', 'lime')
      .attr('transform', 'translate(' + initialDotX + ', ' + initialDotY + ')');

    d3.interval(
      () => {
        const currentStartAngle = arc.datum().startAngle;
        const currentEndAngle = arc.datum().endAngle;

        const newStartAngle: number = Math.random() * TAU  + 0.25 * TAU;
        const newEndAngle: number = Math.random() * TAU  + 0.25 * TAU;

        const interpolateStartAngle = d3.interpolate(currentStartAngle, newStartAngle);
        const interpolateEndAngle = d3.interpolate(currentEndAngle, newEndAngle);

        arc
          .transition()
          .duration(2000)
          .attrTween('d', (data: DefaultArcObject) => {
            // const interpolateStartAngle = d3.interpolate(data.startAngle, newStartAngle);
            // const interpolateEndAngle = d3.interpolate(data.endAngle, newEndAngle);

            return (t) => {
              data.startAngle = interpolateStartAngle(t);
              data.endAngle = interpolateEndAngle(t);
              return arcPath(data);
            };
          });

        dot
          .transition()
          .duration(2000)
          .attrTween('transform', (i) => {
            // console.log('dot.transition.attrTween => this', this);
            // console.log('dot.transition.attrTween => arguments', arguments);

            // const pathLength = arcNode.getTotalLength();

            return (t) => {
              // const p = arcNode.getPointAtLength(t * pathLength);
              // return 'translate(' + p.x + ', ' + p.y + ')';

              const endAngle = interpolateEndAngle(t) - 0.25 * TAU;

              const newX = (radius * Math.cos(endAngle)); // + radius; // Calculate the x position of the element.
              const newY = (radius * Math.sin(endAngle)); // + radius;

              return 'translate(' + newX + ', ' + newY + ')';
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
