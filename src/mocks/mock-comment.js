const mockComment = {
  id: 1,
  user: {
    id: 1,
    isPro: true,
    name: `qwer`,
    avatarUrl: `asdf`,
  },
  rating: 1,
  comment: `zxcv`,
  date: new Date(`2019-05-08T14:13:56.569Z`),
};

const mockCommentServerApi = {
  id: 1,
  user: {
    id: 4,
    [`is_pro`]: false,
    name: `Max`,
    [`avatar_url`]: `img/1.png`
  },
  rating: 4,
  comment: `A quiet cozy and Amsterdam.`,
  date: `2019-05-08T14:13:56.569Z`
};

const mockCommentApi = {
  id: 1,
  user: {
    id: 4,
    isPro: false,
    name: `Max`,
    avatarUrl: `img/1.png`
  },
  rating: 4,
  comment: `A quiet cozy and Amsterdam.`,
  date: new Date(`2019-05-08T14:13:56.569Z`),
};

export {
  mockComment,
  mockCommentApi,
  mockCommentServerApi
};
