import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {

  registerForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
      this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      phone: ["", Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.login(registerModel).subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          this.router.navigate(["signin"]);
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    }
  }
}
