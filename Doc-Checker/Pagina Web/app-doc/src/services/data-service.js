import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import {app} from '../firebase'

const db = getFirestore(app)

class DataService {
    async create(user,token,data) {
        const docRef = doc(db,user,token)
        try{
            const doc = await setDoc(docRef,data)
        } catch (e){
            console.log(e)
        }
            return doc
    }

    async getColl(user){
        const column = collection(db,user)
        let tokens = []
        try {
        const query = await getDocs(column)
        query.forEach((doc) => {
            tokens.push(doc.id)
            })
        } catch(e){
            console.log(e)
        }

        return tokens
    }
}

export default new DataService();