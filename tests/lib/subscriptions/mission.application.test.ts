import assert from 'assert';
import MembershipApplication from '../../../src/lib/subscriptions/models/MembershipApplication';
import { IMembershipApplication } from '../../../src/lib/subscriptions/types';

describe('Membership Application Requirement', () => {

  let validDetails: IMembershipApplication = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test.user@example.com',
    age: 30,
    height: 66,
    weight: 180,
  };

  let appInstance: MembershipApplication;

  beforeEach(() => {
    appInstance = new MembershipApplication(validDetails);
  });

  describe('Application valid if...', () => {
    it('all validators are successful', () => {
      assert(appInstance.isValid(), 'Not valid');
    });
    it('email if 4 or more characters and contains an @', () => {
      assert(appInstance.emailIsValid(), 'Invalid email');
    });
    it('height is between 60 and 75 inches', () => {
      assert(appInstance.heightIsValid(), 'Invalid height');
    });
    it('age is between 15 and 100', () => {
      assert(appInstance.ageIsValid(), 'Invalid age');
    });
    it('wight is between 100 and 300', () => {
      assert(appInstance.weightIsValid(), 'Invalid weight');
    });
    it('first and last name are provided', () => {
      assert(appInstance.nameIsValid(), 'Invalid name');
    });
  });

  describe("Application is invalid if...", function(){
    it('email is 4 characters or less', function () {
      const invalidDetails = { ...validDetails, email: 'dd' };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.emailIsValid());
    });
    it('email does not contain an @', function () {
      const invalidDetails = { ...validDetails, email: 'thingthingthing:thing.com' };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.emailIsValid());
    });
    it('email is omitted', function () {
      const invalidDetails = { ...validDetails, email: undefined };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.emailIsValid());
    });
    it('height is less than 60 inches', function () {
      const invalidDetails = { ...validDetails, height: 10 };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.heightIsValid());
    });
    it('height is more than 75 inches', function () {
      const invalidDetails = { ...validDetails, height: 80 };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.heightIsValid());
    });
    it('height is omitted', function () {
      const invalidDetails = { ...validDetails, height: undefined };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.heightIsValid());
    });
    it('age is more than 100', function () {
      const invalidDetails = { ...validDetails, age: 101 };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.ageIsValid());
    });
    it('age less than 15', function () {
      const invalidDetails = { ...validDetails, age: 14 };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.ageIsValid());
    });
    it('age is omitted', function () {
      const invalidDetails = { ...validDetails, age: undefined };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.ageIsValid());
    });
    it('weight less than 100', function () {
      const invalidDetails = { ...validDetails, weight: 99 };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.weightIsValid());
    });
    it('weight less more than 300', function () {
      const invalidDetails = { ...validDetails, weight: 301 };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.weightIsValid());
    });
    it('weight is omitted', function () {
      const invalidDetails = { ...validDetails, weight: undefined };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.weightIsValid());
    });
    it('first name is omitted', function () {
      const invalidDetails = { ...validDetails, firstName: undefined };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.nameIsValid());
    });
    it('last name is omitted', function () {
      const invalidDetails = { ...validDetails, lastName: undefined };
      const app = new MembershipApplication(invalidDetails);
      assert(!app.nameIsValid());
    });
  });
});

