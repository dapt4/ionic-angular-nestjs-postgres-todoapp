import { Body, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';
import { SuccessRes, Todo } from 'src/types/todo';

@Injectable()
export class TodoService {
  constructor(@InjectClient() private readonly pg: Client) {}

  public async getAll(): Promise<Todo[]> {
    const todos = await this.pg.query('SELECT * FROM tasks;');
    return todos.rows;
  }

  public async getOne(id: string): Promise<Todo> {
    const todo = await this.pg.query<Todo>(
      'SELECT * FROM tasks WHERE id = $1;',
      [id],
    );
    return todo.rows[0];
  }

  public async newTodo(todo: Todo): Promise<SuccessRes> {
    const result = await this.pg.query(
      `INSERT INTO tasks (user_id, title, 
      description, created_at, completed) VALUES ($1, $2, $3, NOW(), false);`,
      [todo.user_id, todo.title, todo.description],
    );
    if (result.rowCount === 1) return { success: true };
    else return { success: false };
  }
  //
  // @Put('edit/:id')
  // public editOne(@Param() params: any): string {
  //   return `the id is ${params.id}`;
  // }
  //
  // @Delete('del/:id')
  // public deleteOne(@Param() params: any): string {
  //   return `the id is ${params.id}`;
  // }
}
