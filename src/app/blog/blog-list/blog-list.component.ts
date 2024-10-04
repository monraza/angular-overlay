import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BlogService, Blog } from '../blog.service';

import { BlogEditDialogComponent } from '../blog-edit-dialog/blog-edit-dialog.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatListModule,
    MatCardModule,
  ],
})
export class BlogListComponent implements OnInit {
  blogs$: Observable<Blog[]> | undefined;
  showOptions: Record<string, boolean> = {};
  editMode: Record<string, boolean> = {}; // Tracks which blog is in edit mode
  blogForms: Record<string, FormGroup> = {}; // Stores form instances for each blog

  toggleOptions(blogId: string): void {
    this.showOptions[blogId] = !this.showOptions[blogId];
  }

  constructor(
    private blogService: BlogService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.blogs$ = this.blogService.blogs$;
  }

  ngOnInit(): void {
    this.loadBlogs();
    this.blogs$?.subscribe((blogs) => {
      blogs.forEach((blog: Blog) => {
        this.blogForms[blog.id] = this.fb.group({
          title: [blog.title],
        });
      });
    });
  }

  loadBlogs(): void {
    this.blogService.getBlogs();
  }

  editBlog(blog: Blog): void {
    const dialogRef = this.dialog.open(BlogEditDialogComponent, {
      width: '500px',
      data: { blog },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadBlogs(); // Reload the blogs if any changes were made
      }
    });
  }

  onDelete(blog: Blog): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Proceed with the delete operation
        this.blogService.deleteBlog(blog);
        console.log('Blog deleted:', blog);
      } else {
        console.log('Delete canceled');
      }
    });
  }

  toggleEditMode(blogId: string): void {
    this.editMode[blogId] = !this.editMode[blogId];

    setTimeout(() => {
      const anchorElement = document.getElementById(`blog-list__${blogId}`);
      const inputElement = anchorElement?.querySelector('input');
      inputElement?.focus();
    }, 0);
  }

  saveTitle(blog: Blog): void {
    console.log('Save title', blog);
    const updatedTitle = this.blogForms[blog.id].controls['title'].value;
    if (updatedTitle !== blog.title) {
      this.blogService
        .updateBlog(blog.id, { ...blog, title: updatedTitle })
        .subscribe(() => {
          blog.title = updatedTitle; // Update the title in the UI
          this.toggleEditMode(blog.id); // Exit edit mode
        });
    } else {
      console.log('No changes made');

      this.toggleEditMode(blog.id); // Exit edit mode
    }
  }

  // cancelEdit(blogId: number): void {
  //   this.blogForms[blogId].reset({
  //     title: this.blogs.find((b) => b.id === blogId).title,
  //   });
  //   this.toggleEditMode(blogId);
  // }

  addActive(blog: Blog): void {
    const anchorElement = document.getElementById(`blog-list__${blog.id}`);

    if (anchorElement) {
      anchorElement.classList.add('active');
    }
  }

  removeActive(): void {
    const allAnchorElements = document.querySelectorAll('.blog-list-item');
    allAnchorElements.forEach((element) => {
      element.classList.remove('active');
    });
  }
}
