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
    const data = [
      {
        id: '1a2b3c',
        title: 'Understanding JavaScript Closures',
        content:
          'Closures are a fundamental concept in JavaScript that allow functions to access variables from an enclosing scope or environment even after they leave the scope in which they were declared.',
      },
      {
        id: '4d5e6f',
        title: 'A Guide to Responsive Web Design',
        content:
          'Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. Learn how to create responsive layouts using CSS media queries.',
      },
      {
        id: '7g8h9i',
        title: 'Introduction to Machine Learning',
        content:
          'Machine learning is a subset of artificial intelligence that involves the use of algorithms and statistical models to enable computers to perform tasks without explicit instructions. This blog covers the basics of machine learning concepts and applications.',
      },
      {
        id: '0j1k2l',
        title: 'Getting Started with Docker',
        content:
          'Docker is a set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers. This blog will help you get started with Docker and understand its core concepts.',
      },
      {
        id: '3m4n5o',
        title: 'Building RESTful APIs with Node.js',
        content:
          'RESTful APIs are an architectural style for designing networked applications. This blog will guide you through the process of building a RESTful API using Node.js and Express.',
      },
    ];

    return new Observable<any[]>((observer) => {
      observer.next(data);
      observer.complete();
    });
  }

  updateBlog(id: number, data: any): Observable<any> {
    return new Observable<any>((observer) => {
      observer.next(data);
      observer.complete();
    });
    // return this.http.post(`${this.apiUrl}/blogs/${id}/update`, data);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/blogs/${id}`);
  }
}
