import AsyncStorage from '@react-native-async-storage/async-storage';

export default function (state, action) {
  switch (action.type) {
    case 'ADD_TO_FAVORITES': {
      const selectedComic = action.payload.comic;
      const currentFavoriteComic = state.favoritesList.findIndex(
        item => item.id === selectedComic.id,
      );
      const isInFavorite = currentFavoriteComic !== -1;
      if (isInFavorite) {
        return state;
      }
      const updatedFavorites = [...state.favoritesList, selectedComic];
      AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavorites));
      return {...state, favoritesList: updatedFavorites};
    }

    case 'DELETE_FROM_FAVORITES': {
      const selectedComic = action.payload.comic;
      const currentFavoriteComic = state.favoritesList.findIndex(
        item => item.id === selectedComic.id,
      );
      const updatedFavoritesList = [...state.favoritesList];
      updatedFavoritesList.splice(currentFavoriteComic, 1);
      AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavoritesList));
      return {...state, favoritesList: updatedFavoritesList};
    }

    case 'SET_DATA':
      const favorites = action.payload;
      return {...state, favoritesList: favorites};

    default:
      return state;
  }
}
