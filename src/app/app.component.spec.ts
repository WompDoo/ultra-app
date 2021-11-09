import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ HttpClientModule, ReactiveFormsModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ultra-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ultra-app');
  });

  it(`should have as navbar'`, (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const navbar = fixture.debugElement.query(By.css('.navbar-brand')).nativeElement.getText();
      console.log(navbar)
      expect(navbar).toEqual('Ultra Giphy');
    });
    done();
  });

  it('should be able to search for gifs', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('#search')).nativeElement;
      expect(input).not.toBeNull();
      fixture.componentInstance.searchedValue = 'test';
      expect(fixture.componentInstance.searchedValue).toBe('test');
      done();
    });
  });
});
