import { atom } from 'recoil';

export const recipesState = atom({
  key: 'recipesState',
  default: [],
});

export const wishlistDisplayState = atom({
  key: 'wishlistDisplayState',
  default: false,
});
