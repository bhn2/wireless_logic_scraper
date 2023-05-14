
export class HttpCommander {

    private static _instance: HttpCommander;

    private constructor() { }

    public static getInstance() {
        if (this._instance == null) {
            this._instance = new HttpCommander()
        }
        return this._instance;
    }

    /**
     * Fetches a body for a given url.
     * @param url: string - the url to request 
     * @returns: Promise<string> - A promise that will contain the body of the url
     */
    async getBody(url: string): Promise<string> {
        console.log("Calling " + url);
        const response = await fetch(url);
        const body = await response.text();
        console.log("Successfully made request")
        return body;
    }
}