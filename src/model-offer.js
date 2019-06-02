export default class ModelOffer {

  constructor(data) {
    this.id = data ? data.id : undefined;
    this.city = data ? data.city : {
      name: ``,
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 1,
      }
    };
    this.previewImage = data ? data.preview_image : undefined;
    this.images = data ? data.images : [``];
    this.title = data ? data.title : ``;
    this.isFavorite = data ? data.is_favorite : false;
    this.isPremium = data ? data.is_premium : false;
    this.rating = data ? data.rating : 0;
    this.type = data ? data.type : ``;
    this.bedrooms = data ? data.bedrooms : 0;
    this.maxAdults = data ? data.max_adults : 0;
    this.price = data ? data.price : 0;
    this.goods = data ? data.goods : [``];
    this.host = data ? {
      id: data.host.id,
      isPro: data.host.is_pro,
      name: data.host.name,
      avatarUrl: data.host.avatar_url,
    } : {
      id: undefined,
      isPro: false,
      name: ``,
      avatarUrl: ``,
    };
    this.description = data ? data.description : ``;
    this.location = data ? data.location : {
      latitude: 0,
      longitude: 0,
      zoom: 1,
    };
  }


  static parseOffer(data) {
    return new ModelOffer(data);
  }

  static parseOffers(data) {
    return data.filter((item) => !!item).map(ModelOffer.parseOffer);
  }
}
