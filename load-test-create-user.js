'use strict';

const faker = require('faker');

const loadTestUser = module.exports = {};

loadTestUser.create = (userContext, events, done) => {
  // -----------------------------------------------------------------
  // ACCOUNT SCHEMA GENERATOR
  // -----------------------------------------------------------------
  userContext.vars.username = faker.internet.userName() + Math.random().toString();
  userContext.vars.email = faker.internet.email();
  userContext.vars.password = faker.internet.password() + Math.random.toString();

  // -----------------------------------------------------------------
  // PROFILE SCHEMA GENERATOR
  // -----------------------------------------------------------------
  userContext.vars.organizationName = faker.company.companyName();
  userContext.vars.contactFirstName = faker.name.firstName();
  userContext.vars.contactLastName = faker.name.lastName();
  userContext.vars.title = faker.lorem.word();
  userContext.vars.phoneNumber = faker.phone.phoneNumber();
  userContext.vars.mailingAddress = faker.address.streetAddress();
  userContext.vars.city = faker.address.city();
  userContext.vars.state = faker.address.state();
  userContext.vars.zipCode = faker.address.zipCode();
  userContext.vars.country = faker.address.country();

  return done();
};
