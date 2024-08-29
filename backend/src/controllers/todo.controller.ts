import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from 'src/services/todo/todo.service';
import { EditBody, SuccessRes, Todo } from 'src/types/todo';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  public async getAll(): Promise<Todo[]> {
    const todos = await this.todoService.getAll();
    return todos;
  }
  @Get('/:id')
  public async getOne(@Param('id') id: string): Promise<Todo> {
    const todo: Todo = await this.todoService.getOne(id);
    return todo;
  }

  @Post()
  public async newTodo(@Body() body: Todo): Promise<SuccessRes> {
    return await this.todoService.newTodo(body);
  }

  @Put('/:id')
  public async editOne(
    @Param('id') id: string,
    @Body() body: EditBody,
  ): Promise<SuccessRes> {
    return await this.todoService.editTodo(id, body);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: string): Promise<SuccessRes> {
    return await this.todoService.deleteTodo(id);
  }
}
