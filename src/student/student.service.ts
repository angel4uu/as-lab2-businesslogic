import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StudentService {
  constructor(private http: HttpService) {}

  async getCountByCareer() {
    const query = `
      SELECT professional_career.name as career, COUNT(*) as student_count
      FROM student
      JOIN professional_career ON student.career_code = professional_career.code
      GROUP BY career;
    `;
    const response = await firstValueFrom(
      this.http.post('http://service:5000/database/query', { query })
    );

    return response.data;
  }

  //MAIN QUERY
  // Listar alumnos por carrera profesional cuyos alumnos que
  // ingresaron después del 1/1/2021 y que color favorito “no sea
  // Rojo” y cuya edad esté entre 18 y 25 años.
  async getMainQuery(careerCode: string) {
    const query = `
      SELECT *
      FROM students
      WHERE admission_date > '2021-01-01'
        AND favorite_color != 'Red'
        AND age BETWEEN 18 AND 25
        AND career_code = '${careerCode}';
    `;
    const response = await firstValueFrom(
      this.http.post('http://service:5000/database/query', { query })
    );

    return response.data;
  }
}