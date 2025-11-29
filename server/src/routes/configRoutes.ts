import { Router } from "express";
import {
  listPropertyTypeConfigs,
  createPropertyTypeConfig,
  updatePropertyTypeConfig,
  deletePropertyTypeConfig,
} from "../controllers/configController";
import { AdminTokenMiddleware } from "../middleware/adminToken";

const router = Router();

// Property Types CRUD (protected by admin token)
router.get("/property-types", AdminTokenMiddleware, listPropertyTypeConfigs);
router.post("/property-types", AdminTokenMiddleware, createPropertyTypeConfig);
router.put("/property-types/:id", AdminTokenMiddleware, updatePropertyTypeConfig);
router.delete("/property-types/:id", AdminTokenMiddleware, deletePropertyTypeConfig);

export default router;
