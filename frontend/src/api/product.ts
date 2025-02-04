import { request_handler, type ResultPackage } from '@/api/base'
import type { StreamerInfo } from '@/api/streamerInfo'
import { header_authorization } from '@/api/user'

// 调用商品信息接口数据结构定义
type ProductListType = {
  currentPage?: number // 当前页号
  pageSize?: number // 每页记录数
  productName?: string // 商品名称
  product_class?: string // 商品分类
}

interface ProductItem {
  user_id: number // User 识别号，用于区分不用的用户
  request_id: string // 请求 ID

  product_id: number
  product_name: string
  product_class: string
  heighlights: string[]
  image_path: string
  instruction: string
  departure_place: string
  delivery_company: string
  selling_price: number
  amount: number
  upload_date: string
  delete: boolean
}

interface ProductData {
  product_list: ProductItem[]
  currentPage: number
  pageSize: number
  totalSize: number
}

// 查询接口
const productListRequest = (params: ProductListType) => {
  return request_handler<ResultPackage<ProductData>>({
    method: 'POST',
    url: '/products/list',
    data: params,
    headers: {
      Authorization: header_authorization.value
    }
  })
}

// 查询指定商品的信息接口
const getProductByIdRequest = async (productId: string) => {
  return request_handler<ResultPackage<ProductItem>>({
    method: 'GET',
    url: '/products/info',
    params: {
      productId
    },
    headers: {
      Authorization: header_authorization.value
    }
  })
}

// 添加或者更新商品接口
const productCreadeOrEditRequest = (params: ProductListType) => {
  console.info(params)

  return request_handler<ResultPackage<ProductData>>({
    method: 'POST',
    url: '/products/upload/form',
    data: params,
    headers: {
      Authorization: header_authorization.value
    }
  })
}

// 根据 ID 获取说明书内容
const genProductInstructionContentRequest = (instructionPath_: string) => {
  return request_handler({
    method: 'POST',
    url: '/products/instruction',
    data: { instructionPath: instructionPath_ },
    headers: {
      Authorization: header_authorization.value
    }
  })
}

// 删除商品接口
const deleteProductByIdRequest = async (productId: number) => {
  return request_handler<ResultPackage<string>>({
    method: 'POST',
    url: '/products/delete',
    data: { product_id: productId },
    headers: {
      Authorization: header_authorization.value
    }
  })
}

export {
  type ProductItem,
  type StreamerInfo,
  type ProductListType,
  type ProductData,
  productListRequest,
  productCreadeOrEditRequest,
  getProductByIdRequest,
  genProductInstructionContentRequest,
  deleteProductByIdRequest
}
