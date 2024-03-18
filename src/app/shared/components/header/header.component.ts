import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() changeView = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleView(view: string) {
    this.changeView.emit(view);
  }
}