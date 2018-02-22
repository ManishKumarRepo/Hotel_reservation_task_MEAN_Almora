import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-deleteuser',
	templateUrl: './deleteuser.component.html',
	styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {
	admin:Boolean;
	constructor() { }


	ngOnInit() {


	}

	

}
