export enum RouterPaths {
  HOME = '/',
  SERVICES = '/services',
  PRODUCTS = '/products',
  CREATE = '/create',
  MY_PRODUCTS = '/products/my-products',
  PRODUCT = '/products/:id',
  FAVORITES = '/favorites',
  CONFIRMATION = '/confirmation',
  NOT_FOUND = '/:pathMatch(.*)*',
}
