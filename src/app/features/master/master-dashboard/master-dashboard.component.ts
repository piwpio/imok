import { Component, OnInit } from '@angular/core';
import {MasterService} from '../../../services/master.service';
import {SlaveModel} from '../../../models/slave.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-master-dashboard',
  templateUrl: './master-dashboard.component.html',
  styleUrls: ['./master-dashboard.component.scss'],
})
export class MasterDashboardComponent implements OnInit {
  public slaves: Array<SlaveModel> = [];

  constructor(
    private router: Router,
    private masterService: MasterService
  ) { }

  ngOnInit() {
    this.masterService.getSlaves()
      .subscribe(slaves => {
        console.log(slaves);
        this.slaves = slaves;
      });
  }

  goToCreateNewSlaveView() {
    this.router.navigate(['master/new-slave']);
  }

}
