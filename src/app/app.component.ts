import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CarouselModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bookStore';
}
