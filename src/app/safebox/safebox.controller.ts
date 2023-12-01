import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SafeboxPrimitives } from '../../contexts/safebox/domain/Safebox';
import { SafeboxId } from '../../contexts/safebox/domain/SafeboxId';
import { SafeboxService } from './safebox.service';
import { SafeboxName } from '../../contexts/safebox/domain/SafeboxName';
import { SafeboxPassword } from '../../contexts/safebox/domain/SafeboxPassword';

@Controller('/safebox')
export class SafeboxController {
  constructor(private readonly service: SafeboxService) {}

  @Post()
  async create(@Body() body: Partial<SafeboxPrimitives>): Promise<string> {
    const id = SafeboxId.random(),
      name = new SafeboxName(body.name),
      password = new SafeboxPassword(body.password);

    await this.service.create({ id, name, password });

    return id.value;
  }

  @Get('/open/:id')
  async open(
    @Param('id') plainId: string,
    @Body() body: Partial<SafeboxPrimitives>,
  ): Promise<string> {
    const id = new SafeboxId(plainId),
      name = new SafeboxName(body.name),
      password = new SafeboxPassword(body.password);

    return this.service.open({ id, name, password });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<SafeboxPrimitives> {
    const safebox = await this.service.findById(new SafeboxId(id));
    return safebox.toPrimitives();
  }
}
