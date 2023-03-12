import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ProfileGuard } from './profile.guard';

describe('ProfileGuard', () => {
  let guard: ProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastrService],
      imports: [
        ToastrModule.forRoot({
          timeOut: 7000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ]
    });
    guard = TestBed.inject(ProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
