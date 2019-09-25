import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UsersService } from 'src/app/shared/services/users.service'
import { User } from 'src/app/shared/models/user.model'
import { Message } from 'src/app/shared/models/message.modal'

@Component({
  selector: 'hm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  form: FormGroup
  message: Message

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.message = new Message('danger', '')
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  private showMessage(text: string, type: string = 'danger' ) {
    this.message = new Message(type, text)
    window.setTimeout(()=>{
      this.message.text = ''
    }, 5000)
  }

  onSubmit() {
    const formData = this.form.value
    this.userService.getUserByEmail(formData.email)
        .subscribe((user: User) => {
          if(Object.keys(user).length !== 0) {
            if(user[0].password === formData.password) {
               alert('Вы авторизовались')
            } else {
              this.showMessage('Вы ввели неверный пароль')
            }
          } else {
             this.showMessage('Такого пользователя не существует')
          }
        })
  }

}
