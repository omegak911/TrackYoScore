import express from 'express';

import { 
  addConfirmation, 
  validateConfirmation, 
  doesConfirmationExist, 
  fetchHistory 
} from './HistoryCtrl';

const router = express.Router();

router.route('/confirmation')
  .get(doesConfirmationExist)
  .post(addConfirmation)
  .put(validateConfirmation);

router.route('/history')
  .get(fetchHistory);



export default router;