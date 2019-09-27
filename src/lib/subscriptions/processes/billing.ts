import assert from 'assert';
import Stripe from 'stripe';
import { IStripe } from '../types';

export default class Billing {

  private stripe: Stripe;

  constructor(params: IStripe) {
    assert(params.stripeKey, 'Need a stripe key');
    this.stripe = new Stripe(params.stripeKey);
  }

  public async createSubscription (args): Promise<Stripe.customers.ICustomer> {
    //we need an email, name, plan, card or cardToken
    assert(args.email && args.name && args.plan && args.card);

    //send off to stripe
    const subscription = await this.stripe.customers.create({
      email : args.email,
      description: args.name,
      source : args.card,
      plan: args.plan
    });

    return subscription;
  };

};
