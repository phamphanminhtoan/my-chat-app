import database from '../firebase/firebase';


export const test = (person, id) => {

    var messages = null;

    if (id) {

        database.ref("rooms").once('value', (snapshot) => {

            const roomKey = [];
            var temp = snapshot.val();
            for (var key in temp) {
                roomKey.push({
                    key
                });

            }

            var c = roomKey.find((r) => r.key === `${id}-${person}`) !== undefined
                ? roomKey.find((r) => r.key === `${id}-${person}`).key
                : roomKey.find((r) => r.key === `${person}-${id}`).key;

            database.ref(`rooms/${c}/messages`).once('value', (snapshot) => {

                messages = snapshot.val();
                console.log(messages)
                return messages;
            });

        });
    }

}


export default (rooms, person, id) => {
    
    if (person !== null) {
        if (id) {
            console.log(rooms)
            var a = rooms.find((r) => r.id === `${person.uid}-${id}`);
            var b = rooms.find((r) => r.id === `${id}-${person.uid}`);
            const c = a !== undefined ? a : b;
            return c;
        }
    }
    
    
    
}