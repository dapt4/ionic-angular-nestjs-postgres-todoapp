import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';
import { EditBody, SuccessRes, Todo } from 'src/types/todo';
import { REQUEST } from '@nestjs/core';
import { CustomRequest } from 'src/types/middleware';

@Injectable()
export class TodoService {
  constructor(
    @InjectClient() private readonly pg: Client,
    @Inject(REQUEST) private req: CustomRequest,
  ) {}

  public async getAll(): Promise<Todo[]> {
    const todos = await this.pg.query('SELECT * FROM tasks;');
    return todos.rows;
  }

  public async getOne(id: string): Promise<Todo> {
    const todo = await this.pg.query('SELECT * FROM tasks WHERE id = $1;', [
      id,
    ]);
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

  public async editTodo(
    id: string,
    { title, description, completed }: EditBody,
  ): Promise<SuccessRes> {
    const query = `
      UPDATE tasks
      SET title = COALESCE($1, title),
          description = COALESCE($2, description),
          completed = COALESCE($3, completed)
      WHERE id = $4 AND user_id = $5;
    `;
    const values = [title, description, completed, id, this.req.userid];
    const result = await this.pg.query(query, values);
    if (result.rowCount === 1) return { success: true };
    if (result.rowCount === 0) return { success: false };
  }

  public async deleteTodo(id: string): Promise<SuccessRes> {
    try {
      const query = `DELETE FROM tasks WHERE id = $1;`;
      const result = await this.pg.query(query, [id]);
      if (result.rowCount === 1) return { success: true };
      if (result.rowCount === 0) return { success: false };
    } catch (err) {
      console.error(err);
    }
  }
}
