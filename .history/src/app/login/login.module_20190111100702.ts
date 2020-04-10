import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatCheckboxModule, MatCardModule,
     MatInputModule, MatSnackBarModule, MatToolbarModule, MatFormFieldModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        HttpModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatFormFieldModule],
    declarations: [LoginComponent],
    providers: [LoginService]
})
export class LoginModule {}
