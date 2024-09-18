import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'https://your-api-url.com'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<any[]> {
    //return this.http.get<any[]>(`${this.apiUrl}/blogs`);
    const data = new Array(10).fill(0).map((_, index) => ({
      id: index,
      title: `Blog ${index + 1}`,
      content: `This is the content of blog ${index + 1}`,
    }));
    return new Observable<any[]>((observer) => {
      observer.next(data);
      observer.complete();
    });
  }

  updateBlog(id: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/blogs/${id}/update`, data);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/blogs/${id}`);
  }
}
