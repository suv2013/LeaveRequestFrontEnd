import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './Components/role/role.component';
import { TeamComponent } from './Components/team/team.component';
import { UserComponent } from './Components/user/user.component';
import { UserTeamComponent } from './Components/user-team/user-team.component';
import { UserRoleComponent } from './Components/user-role/user-role.component';
import { LeaveRequestComponent } from './Components/leave-request/leave-request.component';
import { LeaveRequestApprovalComponent } from './Components/leave-request-approval/leave-request-approval.component';


const routes: Routes = [
  {path: 'roles', component: RoleComponent},
  {path: 'teams', component: TeamComponent},
  {path: 'users', component: UserComponent},
  {path: 'usersRoles', component: UserRoleComponent},
  {path: 'usersTeams', component: UserTeamComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RoleComponent,
                                  TeamComponent,
                                  UserComponent,
                                  UserRoleComponent,
                                  UserTeamComponent,
                                  LeaveRequestComponent,
                                  LeaveRequestApprovalComponent
                                ];
