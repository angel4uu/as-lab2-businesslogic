import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Student } from './student.type';

@Injectable()
export class StudentService {
  constructor(private http: HttpService) {}

  async getCareers() {
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

  async getCountByCareer() {
    const query = `
      SELECT professional_career.name as career, COUNT(*) as student_count
      FROM student
      JOIN professional_career ON student.career_code = professional_career.code
      GROUP BY career;
    `;
    try {
      const response = await firstValueFrom(
        this.http.post('http://services:3000/database/query', { query })
      );
      return response.data as { career: string; student_count: number }[];
    } catch (error) {
      console.error('Error fetching count by career:', error);
      throw new Error('Failed to fetch count by career');
    }
  }

  //MAIN QUERY
  // Listar alumnos por carrera profesional cuyos alumnos que
  // ingresaron después del 1/1/2021 y que color favorito “no sea
  // Rojo” y cuya edad esté entre 18 y 25 años.
  async getMainQuery(careerCode: number){
    const query = `
      SELECT *
      FROM student
      WHERE entry_date > '2021-01-01'
        AND color LIKE '%Red%'
        AND age BETWEEN 18 AND 25
        AND career_code = $1;
    `;
    try {
      const response = await firstValueFrom(
        this.http.post('http://services:3000/database/query', {
          query,
          params: [careerCode],
        })
      );
      return response.data as Student[];
    } catch (error) {
      console.error('Error fetching main query results:', error);
      throw new Error('Failed to fetch main query results');
    }
  }
}