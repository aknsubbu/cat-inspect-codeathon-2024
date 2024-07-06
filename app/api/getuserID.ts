// pages/api/getUserID.ts
import { auth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | null>
) {
  try {
    const { userId } = auth();
    res.status(200).json(userId);
  } catch (error) {
    console.error("Error fetching user ID:", error);
    res.status(500).json(null);
  }
}