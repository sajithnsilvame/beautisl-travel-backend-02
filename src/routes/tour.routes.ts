import { Router } from "express";
import { container } from "tsyringe";
import { TourController } from "@/controllers/tour.controller";
import { Authenticated } from '@/middlewares/auth.middleware';
import multer from "multer";

const router = Router();
const tourController = container.resolve(TourController);
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

/**
 * @swagger
 * /tour/create:
 *   post:
 *     tags: [Tour]
 *     summary: Create a Tour
 *     description: Create a new Tour with images and pricing
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Amazing Bali Tour"
 *               slug:
 *                 type: string
 *                 example: "amazing-bali-tour"
 *               duration:
 *                 type: string
 *                 example: "5 days 4 nights"
 *               location:
 *                 type: string
 *                 example: "Bali, Indonesia"
 *               metaTitle:
 *                 type: string
 *                 example: "Amazing Bali Tour - Best Experience"
 *               metaDescription:
 *                 type: string
 *                 example: "Experience the best of Bali with our amazing tour package"
 *               description:
 *                 type: string
 *                 example: '{"ops":[{"insert":"Rich text description"}]}'
 *               labels:
 *                 type: string
 *                 example: '["Adventure", "Cultural", "Nature"]'
 *               itinerary:
 *                 type: string
 *                 example: '{"day1": "Arrival and check-in", "day2": "Temple tour"}'
 *               faq:
 *                 type: string
 *                 example: '[{"question": "What to bring?", "answer": "Comfortable clothes"}]'
 *               metaKeywords:
 *                 type: string
 *                 example: '["Bali", "Tour", "Adventure"]'
 *               prices:
 *                 type: string
 *                 example: '[{"personCount": 1, "price": 500}, {"personCount": 2, "price": 900}]'
 *               coverImage:
 *                 type: string
 *                 format: binary
 *                 description: Cover image for the tour
 *               featuredImage:
 *                 type: string
 *                 format: binary
 *                 description: Featured image for the tour
 *               tourImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Multiple tour images
 *     responses:
 *       201:
 *         description: Tour created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tour created successfully"
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/create", Authenticated, upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'featuredImage', maxCount: 1 },
  { name: 'tourImages', maxCount: 10 }
]), tourController.createTour.bind(tourController));

/**
 * @swagger
 * /tour/get-all:
 *   get:
 *     tags: [Tour]
 *     summary: Get all Tours
 *     description: Retrieve all Tours
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Tours
 */
router.get('/get-all', Authenticated, tourController.getAllTours.bind(tourController));

/**
 * @swagger
 * /tour/get/{id}:
 *   get:
 *     tags: [Tour]
 *     summary: Get a Tour by ID
 *     description: Retrieve a specific Tour by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Tour
 *     responses:
 *       200:
 *         description: A single Tour
 *       404:
 *         description: Tour not found
 */
router.get('/get/:id', Authenticated, tourController.getTourById.bind(tourController));

/**
 * @swagger
 * /tour/update/{id}:
 *   put:
 *     tags: [Tour]
 *     summary: Update a Tour
 *     description: Update a Tour by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Tour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *       404:
 *         description: Tour not found
 */
router.put('/update/:id', Authenticated, tourController.updateTour.bind(tourController));

/**
 * @swagger
 * /tour/delete/{id}:
 *   delete:
 *     tags: [Tour]
 *     summary: Delete a Tour
 *     description: Delete a Tour by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Tour
 *     responses:
 *       200:
 *         description: Tour deleted successfully
 *       404:
 *         description: Tour not found
 */
router.delete('/delete/:id', Authenticated, tourController.deleteTour.bind(tourController));

export default router;