import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogService } from '../blog.service';
import { BlogEditDialogComponent } from '../blog-edit-dialog/blog-edit-dialog.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  blogs: any[] = [];

  constructor(private blogService: BlogService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
  }

  editBlog(blog: any): void {
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
}
