import { Component, OnInit } from '@angular/core';
import {RoleService} from 'src/app/Services/role.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Role } from 'src/app/Model/role';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  dataSaved = false;
  roleForm: any;
  allRole: Observable<Role[]>;
  roleIdUpdate = null;
  massage = null;
  role = {};
  public roles = [];
  public roleId;
  public errormsg;
  displayedColumns: string[] = ['roleId', 'roleName', 'edit', 'delete'];

  constructor(private roleService: RoleService ,
              private router: Router,
              private route: ActivatedRoute,
              private formbulider: FormBuilder  ) { }

  ngOnInit() {

    this.roleForm = this.formbulider.group({
      roleName: ['', [Validators.required]],
      roleId: ['', []]
      // EmailId: ['', [Validators.required]],
      // Gender: ['', [Validators.required]],
      // Address: ['', [Validators.required]],
      // PinCode: ['', [Validators.required]],
    });
    this.getRole();
  }

getRole() {
  this.roleService.getRoles()
      .subscribe(data => {
        this.roles = data;
      },
      error => {
        this.errormsg = error.message;
  });
}

  SubmitRole(role: Role) {
    if (this.roleIdUpdate === true) {
      this.updateRole(role);
     } else {
      this.createRole(role);
     }
  }

  createRole(role: Role) {
    this.roleService.createRole(role).subscribe(data => {
      this.getRole();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  updateRole(role) {
    this.roleService.updateRole(role).subscribe(data => {
      this.roleIdUpdate = null;
      this.getRole();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  loadRoleForEdit(data: Role, event ): void {
    event.stopPropagation();
    this.roleForm.controls.roleName.setValue(data.roleName);
    this.roleForm.controls.roleId.setValue(data.roleId);
    this.roleIdUpdate = true;
    // const editDialogRef = this.dialog.open(EditClientComponent, {
    //   data: data
    // });
  }

  deleteRole(roleid: string): void {
    this.roleService.deleteRole(roleid).subscribe(data => {
      this.massage = 'Role Deleted.';
      this.getRole();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const role = this.roleForm.value;
    this.SubmitRole(role);
    this.roleForm.reset();
  }

  resetForm() {
    this.roleForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }

}
