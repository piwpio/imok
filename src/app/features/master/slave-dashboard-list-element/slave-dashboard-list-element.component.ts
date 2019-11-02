import {Component, Input, OnInit} from '@angular/core';
import {SlaveModel} from '../../../models/slave.model';

@Component({
  selector: 'app-slave-dashboard-list-element',
  templateUrl: './slave-dashboard-list-element.component.html',
  styleUrls: ['./slave-dashboard-list-element.component.scss'],
})
export class SlaveDashboardListElementComponent implements OnInit {
  @Input()
  slave: SlaveModel;

  constructor() { }

  ngOnInit() {}

}
