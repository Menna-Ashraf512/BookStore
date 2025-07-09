import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../components/footer/footer.component";
import { NavbarComponent } from "../components/navbar/navbar.component";

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
