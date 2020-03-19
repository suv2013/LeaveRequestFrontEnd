import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/Services/team.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Team } from 'src/app/Model/team';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public teams = [];
  public teamId;
  public errormsg;
  teamForm: any;
  teamIdUpdate = null;
  displayedColumns: string[] = ['teamId', 'teamName', 'edit', 'delete'];


  constructor(private teamService: TeamService ,
              private router: Router,
              private route: ActivatedRoute,
              private formbulider: FormBuilder  ) { }

  ngOnInit() {

    this.teamForm = this.formbulider.group({
      teamName: ['', [Validators.required]],
      teamId: ['', []]
    });
    this.getTeam();
  }

  getTeam() {
    this.teamService.getTeams()
    .subscribe(data => {
      this.teams = data;
    },
    error => {
      this.errormsg = error.message;
    });
  }

  SubmitTeam(team: Team) {
    if (this.teamIdUpdate === true) {
      this.updateTeam(team);
     } else {
      this.createTeam(team);
     }
  }

  createTeam(team: Team) {
    this.teamService.createTeam(team).subscribe(data => {
      this.getTeam();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  updateTeam(team) {
    this.teamService.updateTeam(team).subscribe(data => {
      this.teamIdUpdate = null;
      this.getTeam();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  loadTeamForEdit(data: Team, event ): void {
    event.stopPropagation();
    this.teamForm.controls.teamName.setValue(data.teamName);
    this.teamForm.controls.teamId.setValue(data.teamId);
    this.teamIdUpdate = true;
    // const editDialogRef = this.dialog.open(EditClientComponent, {
    //   data: data
    // });
  }

  deleteTeam(teamid: string): void {
    this.teamService.deleteTeam(teamid).subscribe(data => {
      //this.massage = 'Team Deleted.';
      this.getTeam();
    },
    error => {
      this.errormsg = error.message;
    });
  }

  onTeamFormSubmit() {
    //this.dataSaved = false;
    const team = this.teamForm.value;
    this.SubmitTeam(team);
    this.teamForm.reset();
  }

  resetForm() {
    this.teamForm.reset();
    //this.massage = null;
    //this.dataSaved = false;
  }

}
