import { blogmodel } from "@/schemas/blogschema";
import connecttodb from "@/utils/connection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connecttodb(); // Ensure connection to the database
        const { id } = req.query;
        const { post } = req.body;

        console.log("Request Body:", req.body);
        console.log("ID:", id);
        console.log("Post:", post);

        // Use findByIdAndUpdate to update the post field
        const updates = await blogmodel.findByIdAndUpdate(id, { post: post }, { new: true });

        console.log("Updating", updates);

        res.status(200).json({ updates });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error });
    }
}
