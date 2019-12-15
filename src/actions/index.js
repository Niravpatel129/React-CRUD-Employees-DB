// action to changeLoading to true or false
export const setLoadingSpinner = toggleOption => {
  return {
    type: 'TOGGLE_LOADING_SPINNER',
    payload: toggleOption
  };
};
