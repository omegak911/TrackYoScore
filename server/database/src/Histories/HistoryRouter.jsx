import express from 'express';

import { 
  addConfirmation, 
  validateConfirmation, 
  fetchConfirmation, 
  fetchHistory 
} from './HistoryCtrl';

const router = express.Router();

router.route('/confirmation')
  .get(fetchConfirmation)
  .post(addConfirmation)
  .put(validateConfirmation);

router.route('/history')
  .get(fetchHistory);

export default router;