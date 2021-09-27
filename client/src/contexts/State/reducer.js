export const reducer = (state, action) => {
  switch (action.type) {
    case 'selectArizona':
      return 'Arizona';
    case 'selectMichigan':
      return 'Michigan';
    case 'selectVirginia':
      return 'Virginia';
    default:
      return state;
  }
};

export const initialState = {
  state: '',
};
