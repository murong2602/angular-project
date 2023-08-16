import { db } from "../database";

export const getAllListingsRoute = {
    method: 'GET',
    path: '/api/listings', 
    // req has details about the request received and h is the response toolkit we send back
    // what is returned from the handler will be sent back to the client as a response 
    handler: async (req, h) => {
        const {results} = await db.query(
            'SELECT * FROM listings'
        );
        return results; 
    }
}