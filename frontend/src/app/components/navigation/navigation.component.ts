import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PostAdComponent } from '../post-ad/post-ad.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  public postAdModal(): void {
    const config = {
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.modalService.show(PostAdComponent, config);
  }

}
