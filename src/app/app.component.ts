import {Component, ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  viewportMobileQuery: MediaQueryList;
  form: FormGroup;
  lang = 'ru';

  viewportQueryListener: () => void;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private titleService: Title,
    private fb: FormBuilder,
  ) {
    this.viewportMobileQuery = media.matchMedia('(max-width: 600px)');
    this.viewportQueryListener = () => changeDetectionRef.detectChanges();
    this.viewportMobileQuery.addEventListener('change', this.viewportQueryListener);
  }

  ngOnInit() {
    this.titleService.setTitle('My Angular App');
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]]
    });
  }

  ngOnDestroy() {
    this.viewportMobileQuery.removeEventListener('change', this.viewportQueryListener);
  }
}
