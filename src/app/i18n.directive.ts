import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import { AppComponent } from './app.component';
import {from, Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[appI18n]',
  exportAs: 'appI18n',
})
export class I18nDirective implements OnInit, OnDestroy {
  @Input() appI18n: string;
  value: Observable<string>;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.translate(this.appI18n);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private translate(term) {
    return this.value = from(import(`../assets/i18n/a.${this.appComponent.lang}.json`))
      .pipe(
        takeUntil(this.destroy$),
        map(result => result.default[term]),
      );
  }
}
