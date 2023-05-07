import { NextRequest } from "next/server";
import { NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

const handler = async (req: NextRequest, res: NextApiResponse) => {
    const querySnapshot = await getDocs(collection(db, "suggestions"))

    const body = []
    querySnapshot.forEach(doc => body.push(doc.data()))

    res.status(200).send(JSON.stringify(body))
}

export default handler