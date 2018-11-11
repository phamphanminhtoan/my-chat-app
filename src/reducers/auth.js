export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid,
                image: action.image,
                displayName: action.displayName
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};
