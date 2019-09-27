export interface ICard {
  number : string,
  exp_month : number,
  exp_year : number,
  name : string
}

export interface ICreateSubscription {
  email : string;
  name : string;
  plan : string;
  card : ICard;
}
