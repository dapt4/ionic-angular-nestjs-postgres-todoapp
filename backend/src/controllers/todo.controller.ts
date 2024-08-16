import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  @Get('all')
  public getAll(): string {
    return 'This action returns all cats';
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
