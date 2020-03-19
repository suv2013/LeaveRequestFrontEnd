import { Component, OnInit } from '@angular/core';
import { UserTeamService } from 'src/app/Services/user-team.service';
import { UserService } from 'src/app/Services/user.service';
import { TeamService } from 'src/app/Services/team.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserTeam } from 'src/app/Model/userTeam';
@Component({
  selector: 'app-user-team',
  templateUrl: './user-team.component.html',
  styleUrls: ['./user-team.component.css']
})
export class UserTeamComponent implements OnInit {

  public userTeams = [];
  public users = [];
  public teams = [];
  public userId;
  public errormsg;
  userTeamForm: any;
  userTeamIdUpdate = null;

  displayedColumns: string[] = ['userTeamId',
                                'fullname',
                                'teamName',
                                'edit',
                                'delete'];

  constructor(private userTeamService: UserTeamService ,
              private userService: UserService,
              private teamService: TeamService,
              private router: Router,
              private route: ActivatedRoute,
              private formbulider: FormBuilder  ) { }

  ngOnInit() {

    this.userTeamForm = this.formbulider.group({
      userTeamId: ['', []],
      userId: ['', [Validators.required]],
      teamId: ['', [Validators.required]]
    });

    this.getUserTeams();
    this.getUsers();
    this.getTeams();
  }

  getUserTeams() {
    this.userTeamService.getUserTeams()
        .subscribe(data => {
        this.userTeams = data;
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

  getTeams() {
    this.teamService.getTeams()
        .subscribe(data => {
          this.teams = data;
        },
        error => {
          this.errormsg = error.message;
    });
  }

  SubmitUserTeam(userTeam: UserTeam) {
    if (this.userTeamIdUpdate === true) {
      this.updateUserTeams(userTeam);
     } else {
      this.createUserTeam(userTeam);
     }
  }

  createUserTeam(userTeam: UserTeam) {
    this.userTeamService.createUserTeam(userTeam).subscribe(data => {
      this.getUserTeams();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  updateUserTeams(userTeam) {
    this.userTeamService.updateUserTeam(userTeam).subscribe(data => {
      this.userTeamIdUpdate = null;
      this.getUserTeams();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  loadUserTeamsForEdit(data: UserTeam, event ): void {
    event.stopPropagation();
    this.userTeamForm.controls.userTeamId.setValue(data.userTeamId);
    this.userTeamForm.controls.teamId.setValue(data.teamId);
    this.userTeamForm.controls.userId.setValue(data.userId);
    this.userTeamIdUpdate = true;
    // const editDialogRef = this.dialog.open(EditClientComponent, {
    //   data: data
    // });
  }

  deleteUserTeam(userTeamid: string): void {
    this.userTeamService.deleteUserTeam(userTeamid).subscribe(data => {
      //this.massage = 'User Deleted.';
      this.getUserTeams();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  onUserTeamFormSubmit() {
    //this.dataSaved = false;
    const userTeam = this.userTeamForm.value;
    this.SubmitUserTeam(userTeam);
    this.userTeamForm.reset();
  }

  resetForm() {
    this.userTeamForm.reset();
    //this.massage = null;
    //this.dataSaved = false;
  }
}
