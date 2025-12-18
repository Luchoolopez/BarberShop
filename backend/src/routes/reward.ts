import { Router } from "express";
import { RewardController } from "../controllers/reward.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { validateSchema } from "../middlewares/validateSchema";
import { createRewardSchema, redeemRewardSchema } from "../validations/reward.schema";

const rewardRouter = Router();
const rewardController = new RewardController();


//publica
rewardRouter.get('/', authenticateToken, rewardController.getAvailableRewards);
rewardRouter.get('/my-rewards', authenticateToken, rewardController.getUserRewards);
rewardRouter.post('/redeem', authenticateToken, validateSchema(redeemRewardSchema), rewardController.redeemReward);

//admin
rewardRouter.post('/create', authenticateToken, isAdmin, validateSchema(createRewardSchema), rewardController.createReward);
rewardRouter.put('/:id', authenticateToken, isAdmin, rewardController.updateReward);
rewardRouter.delete('/:id', authenticateToken, isAdmin, rewardController.deleteReward);
rewardRouter.put('/use/:userRewardId', authenticateToken, isAdmin, rewardController.markRewardUsed);

export default rewardRouter;
export {rewardRouter as Router};