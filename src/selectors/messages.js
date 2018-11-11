export default (rooms, person, id) => {
    if (person !== null) {
        if (id) {
           
            var a = rooms.find((r) => r.id === `${person.uid}-${id}`);
            var b = rooms.find((r) => r.id === `${id}-${person.uid}`);
            const c = a !== undefined ? a : b;
            return c;
        }
    }
}