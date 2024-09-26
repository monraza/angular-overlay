import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Blog {
  id: string;
  title: string;
  content?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'https://jsonplaceholder.typicode.com'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}
  private blogSubject = new BehaviorSubject<Blog[]>([]);
  blogs$: Observable<Blog[]> = this.blogSubject.asObservable();

  getBlogs(): void {
    this.http
      .get<{ id: string; title: string; body: string }[]>(
        `${this.apiUrl}/posts`
      )
      .pipe(
        tap((blogs) => {
          console.log({ blogs });
          this.blogSubject.next(
            blogs
              .map((blog) => {
                return { id: blog.id, title: blog.title, content: blog.body };
              })
              .slice(0, 5)
          );
        })
      )
      .subscribe({
        error: (err) => {
          console.error('An error occurred:', err);
        },
      });
  }

  updateBlog(id: number, data: Blog): Observable<Blog> {
    return new Observable<Blog>((observer) => {
      observer.next(data);
      observer.complete();
    });
    // return this.http.post(`${this.apiUrl}/blogs/${id}/update`, data);
  }

  deleteBlog(blog: Blog): void {
    this.blogSubject.next(
      this.blogSubject.getValue().filter((b) => b !== blog)
    );
  }

  addBlog(blog: Blog): void {
    this.http
      .post<{ id: string; title: string; content: string }>(
        `${this.apiUrl}/posts`,
        blog
      )
      .pipe(
        tap((addedItem: Blog) => {
          console.log('Blog added:', addedItem);
          this.blogSubject.next([...this.blogSubject.getValue(), addedItem]);
        })
      )
      .subscribe({
        error: (err) => {
          console.error('An error occurred:', err);
        },
      });
  }
}
