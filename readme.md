# Product Parser

This CLI application can be used to scrape products available at [wltest.dns-systems](https://wltest.dns-systems.net/). 

Products will be returned and presented as a JSON array in the command line. 

Two arguments can be provided to alter how the response data is sorted. 


| Argument | Options |
| ----------- | ----------- |
| property |     paymentPeriod<br/>title<br/>description<br/>price<br/>discount<br/>annualPrice
| order | asc<br/>desc |


## Requirements
Supported Operating systems: windows, macOS, linux 

This application requires node and npm to be installed on the machine. 

## Installation

The application requires packages that are listed in the 
```./package.json```. 

To install these, In the directory root run 
```
npm i
```

## Running the application 

As per the specification, the application can sort by the annual price in a descending manner. This can be achieved by running the following in the directory root.

```
npm run-script run
```

Additionally the application can sort on other product properties. An example that sorts ascending by the product title can be seen by executing:

```
npm run-script titleAsc
```

The application can be run manually by first building the typescript and then executing the main. Custom parameters (as seen in the table above) can be seen in the table above. 
```
npm run-script build && node build/app.js --property <INSERT_PROPERTY_HERE> --order <INSERT_ORDERING_HERE>
```

If any of the custom parameters you provide are invalid an error will be shown. 
An example of one of these errors can be seen by running 
```
npm run-script invalid
```


## Tests
Tests have been included using Jest and can be executed using either of the following commands:  

```
npm test 

OR

npm run-script test
```

# Uncertainties 
Please note I was unsure about the following things: 

1) The product descriptions contained "br" tags, I assumed they were not needed, so I have replaced with blank spaces. 
2) Whether the output json needed to have the property listed as "output title" or just "title". I have used just "title" in my output but this could easily be changed
	by modifying the toJson() method in the Product class... as well as fixing any tests and method signatures that use this key. 