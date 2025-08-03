import { Router } from 'express';
import authRoutes from '@/routes/auth.routes';
import userRoleRoutes from '@/routes/roles.routes';
export function getV1Routes(router: Router): void {
    
    
    // const router = Router();
    
    // Use Auth routes
    router.use('/auth', authRoutes);
    router.use('/users', authRoutes);
    router.use('/user-role', userRoleRoutes);
    
    //return router;
}