export class SearchPage {

  constructor(page) {
    this.page = page;
    }
    
   async searchOnUniqueRow(searchInputSelector, searchValue, tableSelector) 
   {
    let rows;
    let rowCount;
    let uniqueRow;
    let tds;
    let tdDetails = [];
    // Step 1: Enter the search value in the input field
    await this.page.waitForSelector(`${tableSelector}//tr`, { state: 'visible' });
    await this.page.waitForSelector(searchInputSelector, { state: 'visible' }); 
    await this.page.fill(searchInputSelector, searchValue);
    // Step 2: Wait for the table rows to update (assuming the table is dynamically updated)
    await this.page.waitForSelector(`${tableSelector}//tr`, { state: 'visible' });
    await  this.page.waitForTimeout(3000); 
     // Step 3: Get all visible rows in the table
     rows = await  this.page.locator(`${tableSelector}//tr`).filter({ has: this.page.locator('td') });
    // Step 4: Ensure only one row is visible
     rowCount = await rows.count();
     await  this.page.waitForTimeout(3000); 
    if (rowCount !== 1) {
      throw new Error(`Expected 1 row to be displayed, but found ${rowCount}`);
    }  
    // Step 5: Get all <td> locators and their children for the unique row
     uniqueRow = rows.first();
     tds = await uniqueRow.locator('td');

  // Step 6: Map the <td> locators and their children to an array
  var tdCount = await tds.count(); // Get the count of <td> elements

  for (let i = 0; i < tdCount; i++) {
    var td = tds.nth(i); // Access each <td> locator
    var children = await td.locator('*').all(); // Get all child elements (buttons, spans, etc.)
    tdDetails.push({
      tdLocator: td,
      childLocators: children,
    });
  } 
   return tdDetails;
  }


  async getFirstRow( tableSelector) 
   {
    let rows;
    let rowCount;
    let tds;
    let tdDetails = [];
    let firstRow;
    
    // Step 2: Wait for the table rows to update (assuming the table is dynamically updated)
    await this.page.waitForSelector(`${tableSelector}//tr`, { state: 'visible' });
    await  this.page.waitForTimeout(2000); 
     // Step 3: Get all visible rows in the table
     rows = await  this.page.locator(`${tableSelector}//tr`).filter({ has: this.page.locator('td') });
    // Step 4: Ensure only one row is visible
     rowCount = await rows.count();
    
    // Step 5: Get all <td> locators and their children for the unique row
    firstRow = rows.first();
     tds = await firstRow.locator('td');

  // Step 6: Map the <td> locators and their children to an array
  var tdCount = await tds.count(); // Get the count of <td> elements

  for (let i = 0; i < tdCount; i++) {
    var td = tds.nth(i); // Access each <td> locator
    var children = await td.locator('*').all(); // Get all child elements (buttons, spans, etc.)
    tdDetails.push({
      tdLocator: td,
      childLocators: children,
    });
  } 
   return tdDetails;
  }

  async clickRowAction( row , actionLocatorvalue) 
  {
    let lastTd;
    if (row && row.length > 0) {
      lastTd = row[row.length - 1].tdLocator;
      var actionLocator = lastTd.locator(actionLocatorvalue);
      await actionLocator.click();
     
  }
}

  async getRowInTableWithSpecificText(tableSelector, text)
   {
    // Locate the table
    let table;
    let row;
    let rowCount;
    let firstRow;
    let tds;
    let tdDetails = [];
    await  this.page.waitForTimeout(2000);
    table = this.page.locator(tableSelector);
    
  
    // Ensure the table exists
    rowCount = await table.count();
    if (rowCount === 0) {
      throw new Error(`No table found with selector: "${tableSelector}"`);
    }
  
    // Locate the row containing a <td> with a <span> that has the specific text inside the table
    row=await this.page.locator(`${tableSelector}//tr`).filter({
      has: this.page.locator(`td span:text-is("${text}")`),
    });
  
    // Check if the matching row exists
    rowCount = await row.count();
   if (rowCount === 0) {
       throw new Error(`No row found in the table with <span> containing text: "${text}"`);
  }
  
    // Return the first matching row
    firstRow =await row.first(); 
    tds = await firstRow.locator('td');

    // Step 6: Map the <td> locators and their children to an array
    var tdCount = await tds.count(); // Get the count of <td> elements
  
    for (let i = 0; i < tdCount; i++) {
      var td = tds.nth(i); // Access each <td> locator
      var children = await td.locator('*').all(); // Get all child elements (buttons, spans, etc.)
      tdDetails.push({
        tdLocator: td,
        childLocators: children,
      });
    } 
     return tdDetails;
  }

  

}
module.exports = { SearchPage };

