# Just Another Text Editor (J.A.T.E.)
  

## Description

This is a text editor that runs in the browser. It is a single-page application that meets the PWA criteria and has a number of data persistence techniques that serve as redundancy in case one of the options is not supported by the browser. This application utilizes IndexedDB to allow users to store multiple text records.

When a user opens up the application, the database is read and all (if any) records are displayed. At this point, the editor is not allowed to take focus and the editor is in readonly. A user can create a record by selecting New Record or select an existing record (if any) from the populated drop down list. New items are added to the database, and existing records are over written. 

To assist the user from losing work, the system automatically saves the record when the focus is lost from the editor.

At any point, the user can use the get all button to see all their records. There is also a Clear Database button that allows the user to wipe the database and start fresh. 

By clicking on the "Install" button, the user is prompted if they would like to install the site as an application. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)


## Installation

Use the following code in the command line to install the application:

    npm i

## Usage

Use the following code in the command line to run the application:

    start:dev       (concurrently \"cd server && npm run server\" \"cd client && npm run dev\"")
    start           ("npm run build && cd server && node server.js")
    server          ("cd server nodemon server.js --ignore client")
    build           ("cd client && npm run build")
    install         ("cd server && npm i && cd ../client && npm i")
    client          ("cd client && npm start")



## Contributing

N/A

## Tests

N/A

## Questions

GitHub Account:  [dmmerchant](https://github.com/dmmerchant)

Email Address: dmmerchant@gmail.com

