import { Router } from 'express';
import AuthController from '@/controllers/auth.controller';
import { container } from 'tsyringe';
import { Authenticated } from '@/middlewares/auth.middleware';
import { authLimiter } from '@/middlewares/rateLimit.middleware';
import { validateRequest } from '@/middlewares/requestValidate.middleware';
import { UserRegisterSchema } from '@/schemas/User.schema';

const router = Router();
const authController = container.resolve(AuthController);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [User]
 *     summary: Register a new user
 *     description: Register a new user with full name, email, password, and optional mobile number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *             properties:
 *               fullname:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: "John Doe"
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "password123"
 *                 description: User's password (minimum 6 characters)
 *               mobile:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 15
 *                 pattern: "^\\+?[\\d\\s\\-\\(\\)]+$"
 *                 example: "+1234567890"
 *                 description: User's mobile number (optional)
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     fullname:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     mobile:
 *                       type: string
 *                       example: "+1234567890"
 *                     roleId:
 *                       type: integer
 *                       example: 4
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: Registration failed due to validation error or duplicate email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User with this email already exists"
 */
router.post('/register', authLimiter, validateRequest(UserRegisterSchema), authController.register.bind(authController));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [User]
 *     summary: Login user
 *     description: Authenticate user and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         email:
 *                           type: string
 *                         fullname:
 *                           type: string
 *                         mobile:
 *                           type: string
 *                         roleId:
 *                            type: number
 */
router.post('/login', authLimiter, authController.login.bind(authController));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [User]
 *     summary: Logout user
 *     description: Logout the currently authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', Authenticated, authController.logout.bind(authController));

/**
 * @swagger
 * /auth/user:
 *   get:
 *     tags: [User]
 *     summary: Get authenticated user details
 *     description: Returns the current authenticated user's information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     fullname:
 *                       type: string
 *                     roleId:
 *                       type: integer
 */
router.get('/user', Authenticated, authController.getAuthUser.bind(authController));

/**
 * @swagger
 * /auth/update-user:
 *   put:
 *     tags: [User]
 *     summary: Update authenticated user details
 *     description: Update the current authenticated user's information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: User's full name
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     fullname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     mobile:
 *                       type: string
 *                     roleId:
 *                       type: integer
 */
router.put('/update-user', Authenticated, authController.updateUser.bind(authController));

/**
 * @swagger
 * /auth/update-password:
 *   put:
 *     tags: [User]
 *     summary: Update user password
 *     description: Update authenticated user's password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "currentpass123"
 *               newPassword:
 *                 type: string
 *                 example: "newpass123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.put('/update-password', Authenticated, authController.updatePassword.bind(authController));

export default router;