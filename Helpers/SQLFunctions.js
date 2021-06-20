
/*
* Function: getAllContacts
* Params: con - Connection to mysql database
* Returns: results || error
*/
var getAllContacts = function(pool){
    return new Promise(function(resolve, reject) { // Create promise
        pool.query("SELECT * FROM Contacts", function(err, results) { // query the mysql database for all records in table "Contacts"
            if(err) return reject(err); // if theres an error reject promise with error
            return resolve(results); // resolve promise with results
        });
    });
}

/*
* Function: addContact
* Params: con - Connection to mysql database, data - the information the user inputted for the contact
* Returns: results || error
*/
var addContact = function(pool, data) {
    return new Promise(function(resolve, reject) { // Create promise
        if(data["Name"] == null || data["PhoneNumber"] == null ||
           data["Name"] == "" || data["PhoneNumber"] == "") { // if name and phone number are null in the data
            return reject("Missing Name and/or Phone Number");  // reject promise with "missing name and/or phone number" error
        }
        // Insert new record into the "Contacts" table
        pool.query(`INSERT INTO Contacts (Name, Company, Address, PhoneNumber, EmailAddress, Notes) VALUES ('${data["Name"]}', '${data["Company"]}', '${data["Address"]}', '${data["PhoneNumber"]}', '${data["Email"]}', '${data["Notes"]}')`, function (err, results) {
            if(err) return reject(err); // if theres an error reject promise with error
            return resolve(results); // resolve promise with results
        });
    });
}

/*
* Function: addContact
* Params: con - Connection to mysql database, newData - the new information the user inputted for the contact, id - ID of contact
* Returns: results || error
*/
var editContact = function(pool, newData, id) {
    return new Promise(function(resolve, reject) { // Create promise
        // if newData is missing any of the information
        if("Name" in newData && "Company" in newData && "Address" in newData && "PhoneNumber" in newData && "Email" in newData && "Notes" in newData){
            if(newData["Name"] == null || newData["PhoneNumber"] == null ||
            newData["Name"] == "" || newData["PhoneNumber"] == "") { // if name and phone number are null in the data
                return reject("Missing Name and/or Phone Number");  // reject promise with "missing name and/or phone number" error
            }
            // Update record in the "Contacts" table with new information
            pool.query(`UPDATE Contacts SET Name = '${newData["Name"]}', Company = '${newData["Company"]}', Address = '${newData["Address"]}', PhoneNumber = '${newData["PhoneNumber"]}', EmailAddress = '${newData["Email"]}', Notes = '${newData["Notes"]}' WHERE ID = ${id}`, function (err, results) {
                if(err) return reject(err); // if theres an error reject promise with error
                return resolve(results); // resolve promise with results
            });
        } else {
            return reject("Missing Parameters"); // reject promise with "Missing Parameters" if newData is missing information
        }
    })
}

/*
* Function: addContact
* Params: con - Connection to mysql database, id - ID of contact
* Returns: results || error
*/
var deleteContact = function(pool, id) {
    return new Promise(function(resolve, reject) { // Create promise
        pool.query(`DELETE FROM Contacts WHERE ID = ${id};`, function(err, results) { // Delete record from mysql database using ID
            if(err) return reject(err); // if theres an error reject promise with error
            return resolve(results); // resolve promise with results
        });
    });
}

/*
* Function: addContact
* Params: con - Connection to mysql database, searchKey - The data you want to query the mysql database with
* Returns: results || error
*/
var searchContact = function(pool, searchKey) {
    return new Promise(function(resolve, reject) { // Create promise
        // Select all records in "Contacts" table where the search key is in any of the columns
        pool.query(`SELECT * FROM Contacts WHERE LOCATE('${searchKey}', Name) > 0 OR LOCATE('${searchKey}', Company) > 0 OR LOCATE('${searchKey}', Address) > 0 OR LOCATE('${searchKey}', PhoneNumber) > 0 OR LOCATE('${searchKey}', EmailAddress) > 0`, function(err, results) {
            if(err) return reject(err) // if theres an error reject promise with error
            return resolve(results); // resolve promise with results
        })
    });
}


// Export all functions
module.exports = {
    getAllContacts,
    addContact,
    editContact,
    deleteContact,
    searchContact
};