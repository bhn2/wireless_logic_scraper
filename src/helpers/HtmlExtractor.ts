import * as cheerio from 'cheerio';
import { Product } from '../models/Product';

export class HtmlExtractor {

    private static _instance: HtmlExtractor;

    private constructor() { }

    public static getInstance(): HtmlExtractor {
        if (this._instance == null) {
            this._instance = new HtmlExtractor()
        }
        return this._instance;
    }

    /**
     * Given a html webpage with product elements it will return a list of product objects
     * They will be ordered based on placement in the document
     * @param fullHtml: string - the html string to extract the products from
     * @returns: Product[] - the parsed products array
     */
    parseProducts(fullHtml: string): Product[] {
        const returnArray: Product[] = [];
        const $ = cheerio.load(fullHtml, {
            normalizeWhitespace: true,
            xmlMode: false
        });
        const HtmlExtractorRef = this;
        $('.package').each(function (this: any) {
            const singleHtmlProduct = $.html(this);
            returnArray.push(HtmlExtractorRef.parseProductCard(singleHtmlProduct))
        });
        return returnArray;
    }


    /**
     * When provided a string of html representing a product it will parse it based on html classes and attributes etc
     * A Product object will be returned
     * @param packageCardHtml: string - a single product represented in html
     * @returns: Product - an instance of Product with the assigned data
     */
    parseProductCard(packageCardHtml: string): Product {
        const $ = cheerio.load(packageCardHtml, {
            normalizeWhitespace: true,
            xmlMode: false
        });

        const title: string = $('.header h3').text();

        // strip the desc
        $('.package-description').find("br").each(function (this: any) {
            $(this).replaceWith(" ");
        });
        const description: string = $('.package-description').text();

        // get the numbers from the strings
        const price: number = this._extractCurrencyValueFromString($('.price-big').text())!;
        const discount: number | null = this._extractCurrencyValueFromString($('p[style*="color: red"]').text());

        return new Product(title, description, price, discount);
    }

    /**
     * Will extract a numerical currency from a string 
     * e.g. "this string has £4.33 in it" will return 4.33 
     * @param currency: string - the string to extract the number from 
     * @returns: number | null - a number or null if one was not found
     */
    _extractCurrencyValueFromString(stringParam: string): number | null {
        const regex = /[^0-9\.-]+/g;
        const match = stringParam.replace(regex, "");
        if (match !== '') {
            return Number(match)
        }
        return null;
    }
}
