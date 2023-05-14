import { HtmlExtractor } from '../../helpers/HtmlExtractor';
import * as fs from 'fs';
import * as path from 'path';
import { Product } from '../../models/Product';


const SINGLE_PANEL_FILE_PATH = "../single_panel.html";
const TWO_ROWS_FILE_PATH = "../two_rows_panels.html";

describe('HtmlExtractor Tests', () => {
    test('given a "product" html element it should parse a Package class correctly', () => {
        const htmlExtractor: HtmlExtractor = HtmlExtractor.getInstance();
        const singlePanelHtmlString = loadFile(SINGLE_PANEL_FILE_PATH);
        const parsedProduct: Product = htmlExtractor.parseProductCard(singlePanelHtmlString);

        expect(parsedProduct.toJson()).toEqual({
            title: "Basic: 6GB Data - 1 Year",
            description: "Up to 6GB of data per year including 240 SMS (5p / MB data and 4p / SMS thereafter)",
            price: 66.00,
            discount: 5.86
        });
    });


    test('given tow rows that each contain 2 products html elements it should parse them correctly', () => {
        const htmlExtractor: HtmlExtractor = HtmlExtractor.getInstance();
        const singlePanelHtmlString = loadFile(TWO_ROWS_FILE_PATH);
        const parsedProducts: Product[] = htmlExtractor.parseProducts(singlePanelHtmlString);

        expect(parsedProducts.map(val => val.toJson())).toEqual([
            {
                title: "Basic: 500MB Data - 12 Months",
                description: "Up to 500MB of data per month including 20 SMS (5p / MB data and 4p / SMS thereafter)",
                price: 5.99,
                discount: null
            },
            {
                title: "Standard: 1GB Data - 12 Months",
                description: "Up to 1 GB data per month including 35 SMS (5p / MB data and 4p / SMS thereafter)",
                price: 9.99,
                discount: null
            },

            {
                title: "Basic: 6GB Data - 1 Year",
                description: "Up to 6GB of data per year including 240 SMS (5p / MB data and 4p / SMS thereafter)",
                price: 66.00,
                discount: 5.86
            },
            {
                title: "Standard: 12GB Data - 1 Year",
                description: "Up to 12GB of data per year including 420 SMS (5p / MB data and 4p / SMS thereafter)",
                price: 108.00,
                discount: 11.90
            },
        ]);
    });



    test('It should correctly parse currency numbers from strings', () => {
        const htmlExtractor: HtmlExtractor = HtmlExtractor.getInstance();
        expect(htmlExtractor._extractCurrencyValueFromString("£5.55")).toEqual(5.55);
        expect(htmlExtractor._extractCurrencyValueFromString("£5.50")).toEqual(5.5);
        expect(htmlExtractor._extractCurrencyValueFromString("£1")).toEqual(1);
        expect(htmlExtractor._extractCurrencyValueFromString("£")).toEqual(null);
    });


    function loadFile(pathString: string) {
        const filePath = path.join(__dirname, pathString);
        const singlePackageHtml: string = fs.readFileSync(filePath, 'utf8');
        return singlePackageHtml;
    }
});