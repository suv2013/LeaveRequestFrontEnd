import { Injectable } from '@angular/core';
import { IisUrl, SolutionUrl } from './url.constant';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private url = IisUrl.concat('leaveRequest');
  constructor() { }
}
