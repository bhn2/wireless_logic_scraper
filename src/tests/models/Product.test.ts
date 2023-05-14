import { Product } from '../../models/Product';

describe('Product Tests', () => {

    test('It should correctly return the product formatted as json', () => {
        const product: Product = new Product("toms_title", "toms_desc", 10, 1);
        expect(product.toJson()).toEqual({
            title: "toms_title",
            description: "toms_desc",
            price: 10,
            discount: 1
        });
    });


    test("it should correctly calculate the annual price", () => {
        const annualProduct: Product = new Product("toms_title", "toms_desc", 10, 1);
        expect(annualProduct.annualPrice()).toEqual(10);

        const monthlyProduct: Product = new Product("toms_title", "toms_desc", 10, null);
        expect(monthlyProduct.annualPrice()).toEqual(120);
    });


    test("it should correctly sort a set of products as json", () => {
        const product1: Product = new Product("1toms_title", "toms_desc", 2, 3);
        const product2: Product = new Product("3toms_title", "toms_desc", 4, 10);
        const product3: Product = new Product("2toms_title", "toms_desc", 1, null);
        const product4: Product = new Product("4toms_title", "toms_desc", 100, 1);
        const arrayToTest: Product[] = [product1, product2, product3, product4];

        // sort the price descending
        expect(Product.getSortedProductsJson(arrayToTest, "price", "asc")).toEqual([
            product3.toJson(),
            product1.toJson(),
            product2.toJson(),
            product4.toJson()
        ]);

        // sort the title ascending
        expect(Product.getSortedProductsJson(arrayToTest, "title", "asc")).toEqual([
            product1.toJson(),
            product3.toJson(),
            product2.toJson(),
            product4.toJson()
        ]);

        // sort the annual price descending
        expect(Product.getSortedProductsJson(arrayToTest, "annualPrice", "desc")).toEqual([
            product4.toJson(),
            product3.toJson(),
            product2.toJson(),
            product1.toJson()
        ]);
    });

});