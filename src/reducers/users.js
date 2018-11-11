export default (state = {}, action) => {
    switch (action.type) {
        case 'ONLOAD':
       
            return [...action.users];

        default:
            
            return state;
    }
};
