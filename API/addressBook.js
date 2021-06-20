var express = require('express');
var router = express.Router();
const SQLFunctions = require("../Helpers/SQLFunctions");
const pool = require("../Helpers/SQLConnection");

/*
* Router: /API/addressBook/all
* Desc: List all contacts in mysql database
*/
router.get("/all", function(req, res){
    // res.status(200).send("Connected to endpoint my gov'ner");
    SQLFunctions.getAllContacts(pool) // Run getAllContacts function
    .then(results => { // After getAllContacts function completes do below operations
        for(var i = 0; i < results.length; i++) { // loop over all records
            for(let [key, value] of Object.entries(results[i])){ // loop over all columns in record
                if(value == "null"){ // if value equals null
                    results[i][key] = "" // set value to nothing
                }
            }
        }
        res.status(200).send(results); // Return results 
    })
    .catch(err => { // Catch any errors
        res.status(400).send({"err": err}); // Return errors
    });
});

/*
* Router: /API/addressBook/contact
* Desc: Search mysql database using search key
*/
router.get("/contact", function(req, res) {
    var searchKey = req.query.search; // Grab search key from url query
    SQLFunctions.searchContact(pool, searchKey) // Run searchContact function
    .then(results => { // After searchContact function completes run anonumous function
        for(var i = 0; i < results.length; i++) { // loop over all records
            for(let [key, value] of Object.entries(results[i])){ // loop over all columns in record
                if(value == "null"){ // if value equals null
                    results[i][key] = "" // set value to nothing
                }
            }
        }
        res.status(200).send(results); // Return results
    })
    .catch(err => { // Catch any errors
        res.status(400).send({"err": err}); // Return errors
    });
});

/*
* Router: /API/addressBook/add
* Desc: add contact to mysql database
*/
router.post("/add", function(req, res) {
    var data = req.body; // Grab json data
    SQLFunctions.addContact(pool, data) // Run addContact function
    .then(results => { // After addContact function completes run anonumous function
        res.status(201).send(results); // Return results
    })
    .catch(err => { // Catch any errors
        console.trace(err);
        res.status(400).send({"err": err}); // Return errors
    });
});

/*
* Router: /API/addressBook/edit
* Desc: Edit contact details in mysql database
*/
router.put("/edit", function(req, res) {
    var id = req.query.id; // Grab id from url query
    var data = req.body; // Grab json data
    SQLFunctions.editContact(pool, data, id) // Run editContact function
    .then(results => { // After editContact function completes run anonumous function
        res.status(200).send(results) // Return results
    })
    .catch(err => { // Catch any errors
        res.status(400).send({"err": err}); // Return errors
    });
});

/*
* Router: /API/addressBook/delete
* Desc: Delete contact from mysql database
*/
router.delete("/delete", function(req, res) {
    var id = req.query.id; // Grab id from url query
    SQLFunctions.deleteContact(pool, id) // Run deleteContact function
    .then(results => { // After deleteContact function completes run anonumous function
        res.status(200).send(results) // Return results
    })
    .catch(err => { // Catch any errors
        res.status(400).send({"err": err}); // Return errors
    });
});

module.exports = router; // Export router