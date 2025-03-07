import { Router } from 'express';
import catchAsync from './middlewares/catchAsync.js';

import axios from 'axios';

const router = Router();

const url =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/<LOCATION>?unitGroup=metric&include=current&key=6Z9ATEFDW9DGSUXGEU3NS7VAV&contentType=json';

router.get(
  '/:location',
  catchAsync(async (req, res) => {
    const response = await axios.get(
      url.replace('<LOCATION>', req.params.location),
    );
    res.status(200).json(response.data);
  }),
);

export default router;
