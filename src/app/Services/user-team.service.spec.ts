import { TestBed } from '@angular/core/testing';

import { UserTeamService } from './user-team.service';

describe('UserTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserTeamService = TestBed.get(UserTeamService);
    expect(service).toBeTruthy();
  });
});
