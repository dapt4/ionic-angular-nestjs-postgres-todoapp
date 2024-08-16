import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from 'src/services/todo/todo.service';
import { Todo } from 'src/types/todo';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get('all')
  public async getAll(): Promise<Todo[]> {
    const todos = await this.todoService.getAll();
    return todos;
  }
  @Get('one/:id')
  public getOne(@Param() params: any): string {
    return `the id is ${params.id}`;
  }

  @Post('new/')
  public newTodo(): string {
    return 'new todo';
  }

  @Put('edit/:id')
  public editOne(@Param() params: any): string {
    return `the id is ${params.id}`;
  }

  @Delete('del/:id')
  public deleteOne(@Param() params: any): string {
    return `the id is ${params.id}`;
  }
}
