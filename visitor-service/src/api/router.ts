import Router, { Request, Response } from 'express'
import IdentifyLocationsController from './controllers/identifyLocations/identify-locations-controller';
import IdentifyLocationUsecase from '../domain/usecases/identifyLocations/identifiy-locations-usecase';

const router = Router()
const identifyLocationsUsecase = new IdentifyLocationUsecase()
const identifyLocationsController = new IdentifyLocationsController(identifyLocationsUsecase)


router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
      message: `GEOGTTR - VISITOR SERVICE`,
  })
})

router.post('/identify/locations', async (req: Request, res: Response) => {
  const response = await identifyLocationsController.execute(req, res)
  res.status(response.code).json(response)
})

export default router