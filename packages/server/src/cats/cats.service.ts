import { Injectable } from '@nestjs/common'
import type { CreateCatDto } from './dto/create-cat.dto'
import type { UpdateCatDto } from './dto/update-cat.dto'

@Injectable()
export class CatsService {
  create(createCatDto: CreateCatDto) {
    console.warn(createCatDto)

    return 'This action adds a new cat'
  }

  findAll() {
    return 'This action returns all cats'
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    console.warn(updateCatDto)

    return `This action updates a #${id} cat`
  }

  remove(id: number) {
    return `This action removes a #${id} cat`
  }
}
