import { Component, Input } from '@angular/core';
import { RegistryService } from '../../registry.service';

@Component({
  selector: 'app-userarea',
  templateUrl: './userarea.component.html',
  styleUrls: ['./userarea.component.scss']
})
export class UserareaComponent {
  constructor(private service: RegistryService) {}
  userInfo = this.service.getInStorage('user');
}
