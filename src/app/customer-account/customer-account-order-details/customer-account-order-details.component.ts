import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-account-order-details',
  templateUrl: './customer-account-order-details.component.html',
  styleUrls: ['./customer-account-order-details.component.scss']
})
export class CustomerAccountOrderDetailsComponent implements OnInit {

  private sub: any;
  id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (this.id > 0)
        alert('success');
      else
        alert('failed');
    });
  }

}
