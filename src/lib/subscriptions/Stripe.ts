import Billing from './processes/billing';
import * as Config from '../Config';
import { ICreateSubscription } from './types';

const billing = new Billing({ stripeKey : Config.get('STRIPE_KEY') || '' });

const createSubscriptionParams: ICreateSubscription = {
  email : "test3@test.com",
  name : "Rob Conery",
  plan : "commander",
  card : {
    number : "4000000000000002",
    exp_month : 10,
    exp_year : 2019,
    name : "Rob Conery"
  }
};

billing.createSubscription(createSubscriptionParams);