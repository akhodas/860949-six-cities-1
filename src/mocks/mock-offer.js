const mockOffers = [{
  id: 1,
  city: {
    name: `Minsk`,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 5,
    },
  },
  previewImage: `path`,
  images: [`path1`, `path2`],
  title: `title`,
  isFavorite: true,
  isPremium: true,
  rating: 0,
  type: `type`,
  bedrooms: 0,
  maxAdults: 0,
  price: 0,
  goods: [`goods1`, `goods2`],
  host: {
    id: 1,
    isPro: true,
    name: `name`,
    avatarUrl: `pathAvatar`
  },
  description: `description`,
  location: {
    latitude: 1,
    longitude: 1,
    zoom: 8
  }
}];

const mockOffer = {
  id: 0,
  city: {
    name: `Minsk`,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 5,
    },
  },
  previewImage: `path`,
  images: [`path1`, `path2`],
  title: `title`,
  isFavorite: true,
  isPremium: true,
  rating: 0,
  type: `type`,
  bedrooms: 0,
  maxAdults: 0,
  price: 0,
  goods: [`goods1`, `goods2`],
  host: {
    id: 1,
    isPro: true,
    name: `name`,
    avatarUrl: `pathAvatar`
  },
  description: `description`,
  location: {
    latitude: 1,
    longitude: 1,
    zoom: 8
  }
};

const mockOfferServerApi = {
  id: 0,
  city: {
    name: `Minsk`,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 5,
    },
  },
  [`preview_image`]: `path`,
  images: [`path1`, `path2`],
  title: `title`,
  [`is_favorite`]: true,
  [`is_premium`]: true,
  rating: 0,
  type: `type`,
  bedrooms: 0,
  [`max_adults`]: 0,
  price: 0,
  goods: [`goods1`, `goods2`],
  host: {
    id: 1,
    [`is_pro`]: true,
    name: `name`,
    [`avatar_url`]: `pathAvatar`
  },
  description: `description`,
  location: {
    latitude: 1,
    longitude: 1,
    zoom: 8
  }
};
const mockOfferApi = {
  id: 0,
  city: {
    name: `Minsk`,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 5,
    },
  },
  previewImage: `path`,
  images: [`path1`, `path2`],
  title: `title`,
  isFavorite: true,
  isPremium: true,
  rating: 0,
  type: `type`,
  bedrooms: 0,
  maxAdults: 0,
  price: 0,
  goods: [`goods1`, `goods2`],
  host: {
    id: 1,
    isPro: true,
    name: `name`,
    avatarUrl: `pathAvatar`
  },
  description: `description`,
  location: {
    latitude: 1,
    longitude: 1,
    zoom: 8
  }
};


export {
  mockOffer,
  mockOffers,
  mockOfferApi,
  mockOfferServerApi,
};
