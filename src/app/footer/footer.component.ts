import { Component, OnInit } from '@angular/core';
import {CoreService} from '../core/core.service';


@Component({
  selector: 'km-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private coreService: CoreService) {
  }

  ngOnInit() {
  }

  email(): string {
    return this.coreService.email;
  }

  avatar(): string {
    return this.coreService.avatar;
  }

  logout(): void {
    console.log('by');
    this.coreService.logout();
  }

  contribuintes(): any {
    return this.coreService.contribuintes;
  }

  alterar_contribuinte(pk: number) {
    this.coreService.alterar_contribuinte(pk).subscribe();
  }

}
