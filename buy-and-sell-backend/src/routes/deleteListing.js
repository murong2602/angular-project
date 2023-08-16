import { db } from "../database";
import * as admin from 'firebase-admin';


export const deleteListingRoute = {
    method: 'DELETE',
    path: '/api/listings/{id}', 
    handler: async (req, h) => {
        // destructuring
        const {id} = req.params; 
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token)
        const userId = user.user_id; 
        // listing is only deleted if the correct user is requesting it 
        await db.query(`
            DELETE FROM listings WHERE id=? AND user_id=?   
        `, [id, userId])

        return {"message": 'Successfully deleted listing' }; 
    }
}