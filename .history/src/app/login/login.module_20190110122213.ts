import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule,
        FormsModule,
        NgbModule],
    declarations: [LoginComponent],
    providers: [LoginService]
})
export class LoginModule {}
