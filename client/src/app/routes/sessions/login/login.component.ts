import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService } from '@core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,
    private startup: StartupService,
    private settings: SettingsService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('quantum')]],
      password: ['', [Validators.required, Validators.pattern('quantum')]],
    });
  }

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const { token, uid, username } = { token: 'quantum-token', uid: 1, username: 'quantum' };
    // Set user info
    this.settings.setUser({
      id: uid,
      name: 'Aswin',
      email: 'aswin1906@gmail.com',
      avatar: './assets/images/avatar.jpg',
    });
    // Set token info
    this.token.set({ token, uid, username });
    // Regain the initial data
    this.startup.load().then(() => {
      let url = this.token.referrer!.url || '/';
      if (url.includes('/auth')) {
        url = '/';
      }
      this.router.navigateByUrl(url);
    });
  }
}
