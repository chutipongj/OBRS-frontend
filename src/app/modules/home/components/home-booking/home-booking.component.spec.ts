import { FormBuilder } from '@angular/forms';

import { HomeBookingComponent } from './home-booking.component';
import {
  createRouterStub,
  createStoreStub,
  createTranslateStub,
} from '../../../../testing/test-stubs';

describe('HomeBookingComponent', () => {
  let component: HomeBookingComponent;
  let translateStub: any;

  beforeEach(() => {
    translateStub = createTranslateStub();
    component = new HomeBookingComponent(
      new FormBuilder(),
      createRouterStub(),
      createStoreStub(),
      createStoreStub(),
      translateStub
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('defaults the passenger selection to 1 adult and 0 kids', () => {
    expect(component.bookingForm.get('passengerInfo')?.value).toEqual([
      { type: 'ADULT', count: 1 },
      { type: 'KIDS', count: 0 },
    ]);
  });

  it('uses the English background for non-Thai languages', () => {
    expect(component.homeBgImage).toBe('images/home-bg-en.png');
  });

  it('uses the Thai background when the current language is Thai', () => {
    translateStub.currentLang = 'th';
    component = new HomeBookingComponent(
      new FormBuilder(),
      createRouterStub(),
      createStoreStub(),
      createStoreStub(),
      translateStub
    );

    expect(component.homeBgImage).toBe('images/home-bg-th.svg');
  });

  it('uses the Chinese background when the current language is Chinese', () => {
    translateStub.currentLang = 'zh';
    component = new HomeBookingComponent(
      new FormBuilder(),
      createRouterStub(),
      createStoreStub(),
      createStoreStub(),
      translateStub
    );

    expect(component.homeBgImage).toBe('images/home-bg-cn.png');
  });

  it('swaps the background image when the language changes', () => {
    component.ngOnInit();

    translateStub.currentLang = 'th';
    translateStub.onLangChange.next({ lang: 'th', translations: {} });
    expect(component.homeBgImage).toBe('images/home-bg-th.svg');

    translateStub.currentLang = 'zh';
    translateStub.onLangChange.next({ lang: 'zh', translations: {} });
    expect(component.homeBgImage).toBe('images/home-bg-cn.png');

    translateStub.currentLang = 'en';
    translateStub.onLangChange.next({ lang: 'en', translations: {} });
    expect(component.homeBgImage).toBe('images/home-bg-en.png');

    component.ngOnDestroy();
  });
});
