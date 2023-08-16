import { db } from "../database";
// for error code handling
import Boom from '@hapi/boom';

export const getListingRoute = {
    method: 'GET', 
    path: '/api/listings/{id}',
    handler: async(req, h) => {
        const id = req.params.id;
        const {results} = await db.query(
            // using the ? instead of appending the id to the end of the string prevents SQL injection
            'SELECT * FROM listings WHERE id=?', 
            [id],
        ); 
        const listing = results[0];
        if(!listing) throw Boom.notFound(`Listing does not exist with id ${id}`)
        return listing
    }
    // route handlers for hapi servers dont need try catch block because hapi automatically send an appropriate message with error code 500 
} 