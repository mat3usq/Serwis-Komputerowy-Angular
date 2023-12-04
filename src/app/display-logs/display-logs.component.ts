import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-logs.component.html',
  styleUrl: './display-logs.component.css'
})
export class DisplayLogsComponent {
  @Input [Logs]
  

}
