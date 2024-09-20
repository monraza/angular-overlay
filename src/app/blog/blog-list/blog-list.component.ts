import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BlogService } from '../blog.service';
import { BlogEditDialogComponent } from '../blog-edit-dialog/blog-edit-dialog.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  blogs: any[] = [];
  showOptions: { [key: string]: boolean } = {};
  editMode: { [id: number]: boolean } = {}; // Tracks which blog is in edit mode
  blogForms: { [id: number]: FormGroup } = {}; // Stores form instances for each blog

  toggleOptions(blogId: string): void {
    this.showOptions[blogId] = !this.showOptions[blogId];
  }

  constructor(
    private blogService: BlogService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs;
      this.blogs.forEach((blog) => {
        this.blogForms[blog.id] = this.fb.group({
          title: [blog.title],
        });
      });
    });
  }

  editBlog(blog: any): void {
    const dialogRef = this.dialog.open(BlogEditDialogComponent, {
      width: '500px',
      data: { blog },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog data', result);
        this.loadBlogs(); // Reload the blogs if any changes were made
      }
    });
  }

  onDelete(blog: any): void {
    this.blogService.deleteBlog(blog.id).subscribe(() => {
      console.log('Blog deleted successfully');
    });
  }

  toggleEditMode(blogId: number): void {
    this.editMode[blogId] = !this.editMode[blogId];
  }

  saveTitle(blog: any): void {
    const updatedTitle = this.blogForms[blog.id].controls['title'].value;
    if (updatedTitle !== blog.title) {
      this.blogService
        .updateBlog(blog.id, { title: updatedTitle })
        .subscribe(() => {
          blog.title = updatedTitle; // Update the title in the UI
          this.toggleEditMode(blog.id); // Exit edit mode
        });
    } else {
      this.toggleEditMode(blog.id); // Exit edit mode
    }
  }

  // cancelEdit(blogId: number): void {
  //   this.blogForms[blogId].reset({
  //     title: this.blogs.find((b) => b.id === blogId).title,
  //   });
  //   this.toggleEditMode(blogId);
  // }

  addActive(blog: any): void {
    const anchorElement = document.getElementById(`blog-list__${blog.id}`);
    console.log({ anchorElement });
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
