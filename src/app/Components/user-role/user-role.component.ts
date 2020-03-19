import { Component, OnInit } from '@angular/core';
import { UserRoleService } from 'src/app/Services/user-role.service';
import { RoleService } from 'src/app/Services/role.service';
import { UserService } from 'src/app/Services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRole } from 'src/app/Model/userRole';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {
  public userRoles = [];
  public users = [];
  public roles = [];
  public userId;
  public errormsg;
  userRoleForm: any;
  userRoleIdUpdate = null;

  displayedColumns: string[] = ['userRoleId',
                                'fullname',
                                'roleName',
                                'edit',
                                'delete'];

  constructor(private userRoleService: UserRoleService ,
              private userService: UserService,
              private roleService: RoleService,
              private router: Router,
              private route: ActivatedRoute,
              private formbulider: FormBuilder  ) { }

  ngOnInit() {
    this.userRoleForm = this.formbulider.group({
      userRoleId: ['', []],
      userId: ['', [Validators.required]],
      roleId: ['', [Validators.required]]
    });

    this.getUserRoles();
    this.getUsers();
    this.getRoles();
  }

  getUserRoles() {
    this.userRoleService.getUserRoles()
        .subscribe(data => {
        this.userRoles = data;
      },
      error => {
        this.errormsg = error.message;
    });
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe(data => {
    this.users = data;
    },
    error => {
      this.errormsg = error.message;
    });
  }

  getRoles() {
    this.roleService.getRoles()
        .subscribe(data => {
          this.roles = data;
        },
        error => {
          this.errormsg = error.message;
    });
  }

  SubmitUserRole(userRole: UserRole) {
    if (this.userRoleIdUpdate === true) {
      this.updateUserRoles(userRole);
     } else {
      this.createUserRole(userRole);
     }
  }

  createUserRole(userRole: UserRole) {
    this.userRoleService.createUserRole(userRole).subscribe(data => {
      this.getUserRoles();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  updateUserRoles(userRole) {
    this.userRoleService.updateUserRole(userRole).subscribe(data => {
      this.userRoleIdUpdate = null;
      this.getUserRoles();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  loadUserRolesForEdit(data: UserRole, event ): void {
    event.stopPropagation();
    this.userRoleForm.controls.userRoleId.setValue(data.userRoleId);
    this.userRoleForm.controls.roleId.setValue(data.roleId);
    this.userRoleForm.controls.userId.setValue(data.userId);
    this.userRoleIdUpdate = true;
    // const editDialogRef = this.dialog.open(EditClientComponent, {
    //   data: data
    // });
  }

  deleteUserRole(userRoleid: string): void {
    this.userRoleService.deleteUserRole(userRoleid).subscribe(data => {
      //this.massage = 'User Deleted.';
      this.getUserRoles();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  onUserRoleFormSubmit() {
    //this.dataSaved = false;
    const userRole = this.userRoleForm.value;
    this.SubmitUserRole(userRole);
    this.userRoleForm.reset();
  }

  resetForm() {
    this.userRoleForm.reset();
    //this.massage = null;
    //this.dataSaved = false;
  }

}
