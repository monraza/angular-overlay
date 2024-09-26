import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, FormsModule],
})
export class AddBlogComponent {
  title = '';
  content = '';

  constructor(private blogService: BlogService) {}

  addBlog(): void {
    this.blogService.addBlog({
      id: Math.random().toString(36).substr(2, 9),
      title: this.title,
      content: this.content,
    });
    this.title = '';
    this.content = '';
  }
}
