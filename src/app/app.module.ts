import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogEditDialogComponent } from './blog/blog-edit-dialog/blog-edit-dialog.component';
import { BlogService } from './blog/blog.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [AppComponent, BlogListComponent, BlogEditDialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  providers: [BlogService, provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
