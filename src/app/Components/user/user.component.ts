import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/Model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users = [];
  public userId;
  public errormsg;
  userForm: any;
  userIdUpdate = null;
  displayedColumns: string[] = ['userId',
                                'userName',
                                'fullname',
                                'edit',
                                'delete'];

  constructor(private userService: UserService ,
              private router: Router,
              private route: ActivatedRoute,
              private formbulider: FormBuilder  ) { }

    ngOnInit() {
      this.userForm = this.formbulider.group({
        userId: ['', []],
        userName: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]]
      });

      this.getUser() ;
    }

    getUser() {
      this.userService.getUsers()
      .subscribe(data => {
      this.users = data;
      },
      error => {
        this.errormsg = error.message;
      });
    }

    SubmitUser(user: User) {
      if (this.userIdUpdate === true) {
        this.updateUser(user);
       } else {
        this.createUser(user);
       }
    }
  
    createUser(user: User) {
      user.password = '123';
      this.userService.createUser(user).subscribe(data => {
        this.getUser();
      },
      error => {
        this.errormsg = error.message;
      });
    }
  
    updateUser(user) {
      user.password = '123';
      this.userService.updateUser(user).subscribe(data => {
        this.userIdUpdate = null;
        this.getUser();
      },
      error => {
        this.errormsg = error.message;
      });
    }
  
    loadUserForEdit(data: User, event ): void {
      event.stopPropagation();
      this.userForm.controls.userName.setValue(data.userName);
      this.userForm.controls.firstName.setValue(data.firstName);
      this.userForm.controls.lastName.setValue(data.lastName);
      this.userForm.controls.userId.setValue(data.userId);
      this.userIdUpdate = true;
      // const editDialogRef = this.dialog.open(EditClientComponent, {
      //   data: data
      // });
    }

    deleteUser(userid: string): void {
      this.userService.deleteUser(userid).subscribe(data => {
        //this.massage = 'User Deleted.';
        this.getUser();
      },
      error => {
        this.errormsg = error.message;
      });
    }

    onUserFormSubmit() {
      //this.dataSaved = false;
      const user = this.userForm.value;
      this.SubmitUser(user);
      this.userForm.reset();
    }

    resetForm() {
      this.userForm.reset();
      //this.massage = null;
      //this.dataSaved = false;
    }

}
