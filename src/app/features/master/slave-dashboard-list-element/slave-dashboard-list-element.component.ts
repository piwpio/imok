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
    this.lastLocation = this.slave.actions.length ? this.slave.actions[0] : null;
  }

  goToSlaveManage() {
    this.router.navigate(['master/slave-info', this.slave.id]);
  }

  goToMap(lat: number, long: number) {
    console.log(lat, long);
    this.router.navigate(['master/slave-map', lat, long]);
  }
}
