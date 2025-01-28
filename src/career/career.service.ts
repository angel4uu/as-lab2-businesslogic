import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CareerService {
  constructor(private http: HttpService) {}

  async getAllCareers() {
    const query = `
      SELECT code, name
      FROM professional_career
    `;
    try {
      const response = await firstValueFrom(
        this.http.post('http://services:3000/database/query', { query })
      );
      return response.data as { career: string; code: number }[];
    } catch (error) {
      console.error('Error fetching count by career:', error);
      throw new Error('Failed to fetch count by career');
    }
  }
}