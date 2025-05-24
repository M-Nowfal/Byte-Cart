// Product Type
export interface ProductType {
  product: {
    _id: string,
    name: string,
    price: number,
    description: string,
    category: string,
    images: Array<string>,
    sellerId: string,
    barand: string,
    stock: number,
    ratings: number,
    reviews: Array<object>,
    status: boolean,
    tags: Array<string>
  }
}