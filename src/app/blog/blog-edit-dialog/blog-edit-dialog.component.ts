import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogService } from '../blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-edit-dialog',
  templateUrl: './blog-edit-dialog.component.html',
  styleUrls: ['./blog-edit-dialog.component.css'],
})
export class BlogEditDialogComponent {
  blogForm: FormGroup;
  originalTitle: string;

  constructor(
    public dialogRef: MatDialogRef<BlogEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private blogService: BlogService
  ) {
    this.originalTitle = data.blog.title;
    console.log({ 'data.blog.description': data });

    this.blogForm = this.fb.group({
      title: [data.blog.title, Validators.required],
      description: [data.blog.content, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log({ 'this.blogForm.value': this.blogForm.value });

    if (this.blogForm.valid) {
      this.blogService
        .updateBlog(this.data.blog.id, this.blogForm.value)
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }

  onDelete(): void {
    this.blogService.deleteBlog(this.data.blog.id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onUpdateTitle(): void {
    if (this.blogForm.controls['title'].value !== this.originalTitle) {
      const updatedTitle = { title: this.blogForm.controls['title'].value };
      this.blogService
        .updateBlog(this.data.blog.id, updatedTitle)
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }
}
