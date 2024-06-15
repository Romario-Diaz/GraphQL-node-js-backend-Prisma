import { createHash } from 'crypto'
import { baseModelResolver } from '../base/base.resolver'
// import { Avocado } from './avocado.model'
import type { Avocado } from '@prisma/client'

const avos: Avocado[] = [
  {
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    name: 'Pinkerton Avocado',
    id: 1,
    sku: 'BJSJHH3',
    price: 1.27,
    image: '/images/pinkerton.jpg',
    attributes: {
      description:
        "First grown on the Pinkerton Ranch in Saticoy, California, in early 19",
      shape: 'Long pear',
      hardiness: '-1 °C',
      taste: 'Marvelous, is an avocado'
    }
  }
]

export function findAll(): Avocado[] {
  return avos;
}

export function findOne(id: string): Avocado | null {
  return avos[0]
}

export const resolver: Record<keyof Avocado, (parent: Avocado) => unknown> = {
  ...baseModelResolver,
  id: (parent) => parent.id,
  sku: (parent) => parent.sku,
  name: (parent) => parent.name,
  price: (parent) => parent.price,
  image: (parent) => parent.image,
  attributes: (parent) => ({
    description: parent.attributes.description,
    shape: parent.attributes.shape,
    hardiness: parent.attributes.hardiness,
    taste: parent.attributes.taste,
  }),
}

export function createAvo(
  parent:unknown,
  {
    data,
  }: { data: Pick<Avocado, 'name' | 'price' | 'image'> & Avocado['attributes'] }
): Avocado {
  const currentLength = avos.length
  const newAvo: Avocado = {
    id: String(currentLength + 1),
    sku: createHash('sha256')
      .update(data.name, 'utf-8')
      .digest('base64')
      .slice(-6),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    name: data.name,
    price: data.price,
    image: data.image,
    attributes: {
      description: data.description,
      shape: data.shape,
      hardiness: data.hardiness,
      taste: data.taste
    }
  }

  avos.push(newAvo)
  return newAvo
}
