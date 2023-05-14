import { HtmlExtractor } from "./src/helpers/HtmlExtractor";
import { HttpCommander } from "./src/helpers/HttpCommander";
import { Product } from "./src/models/Product";
import minimist from 'minimist';

const PAGE_URL = "https://wltest.dns-systems.net/";

main().then(() => {
    console.log("Completed process")
    process.exit()
});

async function main(): Promise<void> {

    console.log("Starting process...")

    const rawArgs: any = minimist(process.argv.slice(2));
    const args = rawArgs as CommandLineArgs

    if (args.property != null && !Product.isProductProperty(args.property)) {
        console.log("You have not provided a valid property of Product to filter on");
        return;
    }

    const validSortParams = ["asc", "desc"];
    if (args.order != null && !validSortParams.includes(args.order)) {
        console.log("You have not provided a valid ordering value");
        return;
    }


    try {

        const html = await HttpCommander.getInstance().getBody(PAGE_URL)
        const products: Product[] = HtmlExtractor.getInstance().parseProducts(html);
        
        const property: any = args.property;
        const order: any = args.order;
        console.log("Sorting products by " + property + " in an " + order + " order");
        console.log("")
        console.log("Scraped products...");
        console.log(Product.getSortedProductsJson(products, property, order))
    } catch (e) {
        console.log(e);
        console.log("Failed to extract data")
    }
}



interface CommandLineArgs {
    property: string,
    order: string
}
