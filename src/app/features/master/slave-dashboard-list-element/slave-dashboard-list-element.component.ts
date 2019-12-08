import {Component, Input, OnInit} from '@angular/core';
import {SlaveModel} from '../../../models/slave.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-slave-dashboard-list-element',
  templateUrl: './slave-dashboard-list-element.component.html',
  styleUrls: ['./slave-dashboard-list-element.component.scss'],
})
export class SlaveDashboardListElementComponent implements OnInit {
  @Input()
  slave: SlaveModel;
  public lastLocation;

  constructor(
    private router: Router
  ) { }

  ngOnInit(
  ) {
    this.slave.actions = [{
      lat: 50.0582514,
      long: 19.947557,
      time: 1575664894885,
      isOk: true
    }];
    this.lastLocation = this.slave.actions.length ? this.slave.actions[0] : null;
  }

  goToSlaveManage() {
    this.router.navigate(['master/slave-info', this.slave.id]);
  }

  goToMap(lat: number, long: number) {
    this.router.navigate(['master/slave-map', lat, long]);
  }
}
