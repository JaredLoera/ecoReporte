import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotAllowedDivaceComponent } from './not-allowed-divace.component';

describe('NotAllowedDivaceComponent', () => {
  let component: NotAllowedDivaceComponent;
  let fixture: ComponentFixture<NotAllowedDivaceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAllowedDivaceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotAllowedDivaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
