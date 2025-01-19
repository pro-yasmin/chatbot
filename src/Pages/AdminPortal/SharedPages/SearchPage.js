/**
 * Manages search-related actions for tables, including searching for rows by value or text,
 * retrieving row details, and performing actions on specific rows.
 * @class
 */
export class SearchPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Searches for a unique row in a table based on a search value and returns details of the row.
   * @param {string} searchInputSelector - Selector for the search input field.
   * @param {string} searchValue - The value to search for in the table.
   * @param {string} tableSelector - Selector for the table containing rows to search.
   * @returns {Promise<Array>} - An array of objects, each containing a `<td>` locator and its child elements.
   * @throws Will throw an error if no rows or more than one row match the search criteria.
   */
  async searchOnUniqueRow(searchInputSelector, searchValue, tableSelector) {
    let rows;
    let rowCount;
    let uniqueRow;
    let tds;
    let tdDetails = [];
    // Step 1: Enter the search value in the input field
    await this.page.waitForSelector(`${tableSelector}//tr`, {
      state: "visible",
    });
    await this.page.waitForSelector(searchInputSelector, { state: "visible" });
    await this.page.fill(searchInputSelector, searchValue);
    // Step 2: Wait for the table rows to update (assuming the table is dynamically updated)
    await this.page.waitForSelector(`${tableSelector}//tr`, {
      state: "visible",
    });
    await this.page.waitForTimeout(5000);
    // Step 3: Get all visible rows in the table
    rows = await this.page
      .locator(`${tableSelector}//tr`)
      .filter({ has: this.page.locator("td") });
    // Step 4: Ensure only one row is visible
    rowCount = await rows.count();
    await this.page.waitForTimeout(5000);
    if (rowCount !== 1) {
      throw new Error(`Expected 1 row to be displayed, but found ${rowCount}`);
    }
    // Step 5: Get all <td> locators and their children for the unique row
    uniqueRow = rows.first();
    tds = await uniqueRow.locator("td");

    // Step 6: Map the <td> locators and their children to an array
    var tdCount = await tds.count(); // Get the count of <td> elements

    for (let i = 0; i < tdCount; i++) {
      var td = tds.nth(i); // Access each <td> locator
      var children = await td.locator("*").all(); // Get all child elements (buttons, spans, etc.)
      tdDetails.push({
        tdLocator: td,
        childLocators: children,
      });
    }
    return tdDetails;
  }

  /**
   * Retrieves the first row in a table and returns its details.
   * @param {string} tableSelector - Selector for the table containing rows.
   * @returns {Promise<Array>} - An array of objects, each containing a `<td>` locator and its child elements.
   */
  async getFirstRow(tableSelector) {
    let rows;
    let rowCount;
    let tds;
    let tdDetails = [];
    let firstRow;

    // Step 2: Wait for the table rows to update (assuming the table is dynamically updated)
    await this.page.waitForSelector(`${tableSelector}//tr`, {
      state: "visible",
    });
    await this.page.waitForTimeout(2000);
    // Step 3: Get all visible rows in the table
    rows = await this.page
      .locator(`${tableSelector}//tr`)
      .filter({ has: this.page.locator("td") });
    // Step 4: Ensure only one row is visible
    rowCount = await rows.count();

    // Step 5: Get all <td> locators and their children for the unique row
    firstRow = rows.first();
    tds = await firstRow.locator("td");

    // Step 6: Map the <td> locators and their children to an array
    var tdCount = await tds.count(); // Get the count of <td> elements

    for (let i = 0; i < tdCount; i++) {
      var td = tds.nth(i); // Access each <td> locator
      var children = await td.locator("*").all(); // Get all child elements (buttons, spans, etc.)
      tdDetails.push({
        tdLocator: td,
        childLocators: children,
      });
    }
    return tdDetails;
  }

  /**
   * Clicks on a specific action within a row.
   * @param {Array} row - An array containing details of the row's `<td>` elements.
   * @param {string} actionLocatorValue - Selector for the action element within the last `<td>` of the row.
   * @returns {Promise<void>} - Performs the action without returning a value.
   */
  async clickRowAction(row, actionLocatorvalue) {
    let lastTd;
    if (row && row.length > 0) {
      lastTd = row[row.length - 1].tdLocator;
      var actionLocator = lastTd.locator(actionLocatorvalue);
      await actionLocator.click();
    }
  }

  /**
   * Searches for a row in a table containing specific text and returns its details.
   * @param {string} tableSelector - Selector for the table containing rows.
   * @param {string} text - The text to search for in the rows.
   * @returns {Promise<Array>} - An array of objects, each containing a `<td>` locator and its child elements.
   * @throws Will throw an error if no matching row is found.
   */
  async getRowInTableWithSpecificText(tableSelector, text) {
    // Locate the table
    let table;
    let row;
    let rowCount;
    let firstRow;
    let tds;
    let tdDetails = [];

    // await this.page.waitForTimeout(5000);
    // table = this.page.locator(tableSelector);
    await this.page.waitForSelector(tableSelector, { state: "visible", timeout: 20000  });
    table = this.page.locator(tableSelector);
    
    // Ensure the table exists
    rowCount = await table.count();
    if (rowCount === 0) {
      throw new Error(`No table found with selector: "${tableSelector}"`);
    }

    // Locate the row containing a <td> with a <span> that has the specific text inside the table
    row = await this.page.locator(`${tableSelector}//tr`).filter({
      has: this.page.locator(`td span:text-is("${text}")`),
    });

    // Check if the matching row exists
    rowCount = await row.count();
    if (rowCount === 0) {
      throw new Error(
        `No row found in the table with <span> containing text: "${text}"`
      );
    }

    // Return the first matching row
    firstRow = await row.first();
    tds = await firstRow.locator("td");

    // Step 6: Map the <td> locators and their children to an array
    var tdCount = await tds.count(); // Get the count of <td> elements

    for (let i = 0; i < tdCount; i++) {
      var td = tds.nth(i); // Access each <td> locator
      var children = await td.locator("*").all(); // Get all child elements (buttons, spans, etc.)
      tdDetails.push({
        tdLocator: td,
        childLocators: children,
      });
    }
    return tdDetails;
  }
}
module.exports = { SearchPage };
