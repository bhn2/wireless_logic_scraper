// This could also be done as a abstract class with 
// monthly and annual as subclasses. The discount field could be moved into annual 
// and getTotalPrice() could be made abstract which monthly would override and * price by 12  
export class Product {

    paymentPeriod: "annual" | "monthly";
    title: string;
    description: string;
    price: number;
    discount: number | null;

    constructor(title: string, description: string, price: number, discount: number | null) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.paymentPeriod = discount != null ? 'annual' : 'monthly'
    }

    /**
     * Returns the product object converted to json 
     * @returns: {
     *       title: string - title of the product
     *       description: string - the description of the product 
     *       price: number | null - the price as shown in the raw html. Does not factor in payment period
     *       discount: number | null - The discount if one exists
     * }
     */
    toJson(): {
        title: string
        description: string
        price: number | null
        discount: number | null
    } {
        return {
            title: this.title,
            description: this.description,
            price: this.price,
            discount: this.discount
        };
    }

    /**
     * Gets the annual price for the product
     * @returns number - the total cost for this product over an annual period
     */
    annualPrice = (): number => {
        if (this.paymentPeriod === "monthly") {
            return this.price * 12;
        } else {
            return this.price
        }
    }

    /**
     * Will sort a list of product objects by a provided property. Formatted json will be returned for each product
     * @param products: Product[] - The list of products to sort
     * @param property: keyof Product - the field of product to sort on e.g. price. Function properties will be executed at runtime 
     * @param ordering: asc | desc - whether the sort should be ascending or descending
     * @returns: {
     *       title: string - title of the product
     *       description: string - the description of the product 
     *       price: number | null - the price as shown in the raw html. Does not factor in payment period
     *       discount: number | null - The discount if one exists
     * }[]
     */
    static getSortedProductsJson(products: Product[], property: keyof Product, ordering: "asc" | "desc"): {
        title: string
        description: string
        price: number | null
        discount: number | null
    }[] {
        return products.sort((a: Product, b: Product) => {
            let aValue: any = property != null && a != null && a[property] != null ? a[property] : '';
            let bValue: any = property != null && b != null && b[property] != null ? b[property] : '';

            if (typeof aValue === 'function') {
                aValue = aValue();
            }

            if (typeof bValue === 'function') {
                bValue = bValue();
            }

            if (ordering === "asc") {
                return bValue < aValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        }).map(val => val.toJson());
    }

    /**
     * Checks if a string is a property of Product e.g. price
     * @param arg: string - the property to check
     * @returns boolean - whether it contains the property 
     */
    static isProductProperty(arg: string): boolean {
        return Object.getOwnPropertyNames(new Product("", "", 0, null)).includes(arg);
    }
}