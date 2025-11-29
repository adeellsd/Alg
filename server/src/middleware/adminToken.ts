import { Request, Response, NextFunction } from "express";

export function AdminTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    res.status(500).json({ success: false, error: "ADMIN_TOKEN is not set on server" });
    return;
  }
  const got = req.header("x-admin-token");
  if (got && got === expected) {
    next();
    return;
  }
  res.status(401).json({ success: false, error: "Unauthorized" });
}
