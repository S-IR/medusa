import {
  Product,
  ProductCategory,
  ProductCollection,
  ProductVariant,
} from "@models"
import { SqlEntityManager } from "@mikro-orm/postgresql"
import ProductOption from "../../../src/models/product-option"

export async function createProductAndTags(
  manager: SqlEntityManager,
  data: any[]
) {
  const products: any[] = data.map((productData) => {
    return manager.create(Product, productData)
  })

  await manager.persistAndFlush(products)

  return products
}

export async function createProductVariants(
  manager: SqlEntityManager,
  data: any[]
) {
  const variants: any[] = data.map((variantsData) => {
    return manager.create(ProductVariant, variantsData)
  })

  await manager.persistAndFlush(variants)

  return variants
}

export async function createCollections(
  manager: SqlEntityManager,
  collectionData: any[]
) {
  const collections: any[] = collectionData.map((collectionData) => {
    return manager.create(ProductCollection, collectionData)
  })

  await manager.persistAndFlush(collections)

  return collections
}

export async function createCategories(
  manager: SqlEntityManager,
  categoriesData: any[]
): Promise<ProductCategory[]> {
  const categories: ProductCategory[] = []

  for (let categoryData of categoriesData) {
    let categoryDataClone = { ...categoryData }
    let parentCategory: ProductCategory | null = null
    const parentCategoryId = categoryDataClone.parent_category_id as string
    delete categoryDataClone.parent_category_id

    if (parentCategoryId) {
      parentCategory = await manager.findOne(ProductCategory, parentCategoryId)
    }

    const category = await manager.create(ProductCategory, {
      ...categoryDataClone,
      parent_category: parentCategory
    })

    categories.push(category)
  }

  await manager.persistAndFlush(categories)

  return categories
}

export async function createOptions(
  manager: SqlEntityManager,
  optionsData: any[]
) {
  const options: any[] = optionsData.map((o) => {
    return manager.create(ProductOption, o)
  })

  await manager.persistAndFlush(options)

  return options
}

export async function assignCategoriesToProduct(
  manager: SqlEntityManager,
  product: Product,
  categories: ProductCategory[]
) {
  product.categories.add(categories)

  await manager.persistAndFlush(product)

  return product
}