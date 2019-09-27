import MembershipApplication from '../../src/lib/subscriptions/models/MembershipApplication';
import sinon from 'sinon';
import Stripe from 'stripe';
import DB from '../../src/lib/subscriptions/db';
import Mission from '../../src/lib/subscriptions/models/Mission';

export const validApplication = new MembershipApplication({
  firstName : "Test",
  lastName : "User",
  email : "test@test.com",
  age : 30,
  height : 66,
  weight : 180,
  role : "commander",
  card : 1
});

export const goodStripeArgs = {
  name : "Test User",
  email : "test@test.com",
  plan : "commander",
  card : 1
};

export const badStripeArgs = {
  name : "Test User",
  email : "test@test.com",
  plan : "commander",
  card : 2
};

export const goodStripeResponse = (args) => {
  args || (args = {});
  var plan = args.plan || "commander";
  return {
    object: plan,
    created: 1425829693,
    id: 'cus_5pmBAvK65LCm36',
    livemode: false,
    description: 'Test User',
    email: 'test@test.com',
    delinquent: false,
    metadata: {},
    subscriptions:
     { object: 'list',
       total_count: 1,
       has_more: false,
       url: '/v1/customers/cus_5pmBAvK65LCm36/subscriptions',
       data: [],
       create: () => {}
    },
    discount: null,
    account_balance: 0,
    currency: 'usd',
    sources:
     { object: 'list',
       total_count: 1,
       has_more: false,
       url: '/v1/customers/cus_5pmBAvK65LCm36/sources',
       data: []
    },
    default_source: 'card_5pmBNPZibeUtn8'
  }
};

export const badStripeResponse = (): Stripe.errors.StripeError => {

  return {
    rawType: 'card_error',
    code: 'card_declined',
    params: undefined,
    message: 'Your card was declined.',
    detail: undefined,
    raw: {
        message: 'Your card was declined.',
        type: 'card_error',
        code: 'card_declined',
        decline_code: 'generic_decline'
      },
    type: 'StripeCardError',
    headers: {},
    requestId: '',
    readonly: 1,
    name: ''
    }
};
