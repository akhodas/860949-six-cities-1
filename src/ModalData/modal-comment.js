export default class ModelComment {

  constructor(data) {
    this.id = data ? data.id : undefined;
    this.user = data ? {
      id: data.user.id,
      isPro: data.user.is_pro,
      name: data.user.name,
      avatarUrl: data.user.avatar_url,
    } : {
      id: undefined,
      isPro: false,
      name: ``,
      avatarUrl: ``,
    };
    this.rating = data ? data.rating : 0;
    this.comment = data ? data.comment : `No comment`;
    this.date = data ? data.date : `2019-05-08T14:13:56.569Z`;
  }


  static parseOffer(data) {
    return new ModelComment(data);
  }

  static parseOffers(data) {
    return data.filter((item) => !!item).map(ModelComment.parseOffer);
  }
}

