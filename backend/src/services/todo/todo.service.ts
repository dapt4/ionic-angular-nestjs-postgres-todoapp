import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';
import { Todo } from 'src/types/todo';

@Injectable()
export class TodoService {
  constructor(@InjectClient() private readonly pg: Client) {}

  public async getAll(): Promise<Todo[]> {
    const todos = await this.pg.query('SELECT * FROM users;');
    return todos.rows;
  }

  // @Get('one/:id')
  // public getOne(@Param() params: any): string {
  //   return `the id is ${params.id}`;
  // }
  //
  // @Post('new/')
  // public newTodo(): string {
  //   return 'new todo';
  // }
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
