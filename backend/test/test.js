var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


describe("Grubhub", function () {


//1
//     describe('Add section Test-1', function () {

//         it('Section added', function () {
//             agent.post("/section/addsection")
//                 .send({ sectionName: "mocha_section7", user_id: "2"})
//                 .then(function (res) {
//                     expect(res.status).to.equal(200);
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 });
//         });
//         console.log(`--------------------------------`);

//     });






// // //2
//     describe('Login Test-2', function () {

//         it('Incorrect Password', function () {
//             agent.post("/login")
//                 .send({ email_id: "own@own.com", password: "dsds" })
//                 .then(function (res) {
//                     expect(res.status).to.equal(200);
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 });
//         });
//         console.log(`--------------------------------`);


//     });

    

    

// //3
//     describe('Delete Item Test-3', function () {

//         it('Item deleted ', function () {
//             agent.post("/item/deleteitem")
//                 .send({ item_name: "xyz"})
//                 .then(function (res) {
//                     expect(res.status).to.equal(200 );
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 });
//         });                    console.log(`--------------------------------`);

//     });

//4
    describe('Delete section Test-4', function () {

        it('Section deleted ', function () {
            agent.post("/section/deletesection")
                .send({ menu_section_name: "mocha_section4"})
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });                    console.log(`--------------------------------`);

    });


5
    describe('Owner Signup Test-5', function () {

        it('Owner added', function () {
            agent.post("/signup/owner")
                .send({ name: "moccha_Owner", res_name: "Restaurant", res_cuisine: "Cuisine", email_id: "ownerds3@sjsu.edu", password: "password", res_zip_code: "23342", address:"San Jose", phone_number: "980765551"})
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });
    console.log(`--------------------------------`);


});