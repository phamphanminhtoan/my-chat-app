export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        displayName: action.displayName
      };
      case 'onLOGIN':
      return {
        auth: action.user,
        roomname: action.user.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
