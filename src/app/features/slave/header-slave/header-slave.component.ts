import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-slave',
  templateUrl: './header-slave.component.html',
  styleUrls: ['./header-slave.component.scss'],
})
export class HeaderSlaveComponent implements OnInit, OnDestroy {
  public headerTitle: string;

  constructor() {}

  ngOnInit() {
    this.headerTitle = 'Witaj, czy wszystko OK?';
  }

  ngOnDestroy(): void { }
}
