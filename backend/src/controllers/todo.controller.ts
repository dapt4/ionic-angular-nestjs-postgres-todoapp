import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodoService } from 'src/services/todo/todo.service';
import { SuccessRes, Todo } from 'src/types/todo';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get('all')
  public async getAll(): Promise<Todo[]> {
    const todos = await this.todoService.getAll();
    return todos;
  }
  @Get('one/:id')
  public async getOne(@Param('id') id: string): Promise<Todo> {
    const todo: Todo = await this.todoService.getOne(id);
    return todo;
  }

  @Post('new')
  public async newTodo(@Body() body: Todo): Promise<SuccessRes> {
    return await this.todoService.newTodo(body);
  }

  // @Put('edit/:id')
  // public editOne(@Param() params: any): string {
  //   return `the id is ${params.id}`;
  // }
  // @Delete('del/:id')
  // public deleteOne(@Param() params: any): string {
  //   return `the id is ${params.id}`;
  // }
}
