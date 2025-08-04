import { inject, injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { TourService } from "@/services/tour.service";
import { APIResponse } from "@/types";
import { AppError } from "@/utils/errors/AppError";


@injectable()
export class TourController  {
    constructor(@inject(TourService) private tourService: TourService) {}

    async createTour(req: Request, res: Response): Promise<void> {
        try {
            const files = req.files as {
                coverImage?: Express.Multer.File[];
                featuredImage?: Express.Multer.File[];
                tourImages?: Express.Multer.File[];
            };

            if (!req.body.title || !req.body.description) {
                const response: APIResponse<null> = { 
                    status: false, 
                    error: "Title and description are required" 
                };
                res.status(400).json(response);
                return;
            }

            const newTour = await this.tourService.createTourWithImages(req.body, files);
            const response: APIResponse<typeof newTour> = {
                status: true, 
                message: "Tour created successfully",
                data: newTour
            };
            res.status(201).json(response);
        } catch (error: any) {
            const response: APIResponse<null> = { status: false, error: error.message };
            res.status(500).json(response); 
        }
    }

    async getAllTours(req: Request, res: Response): Promise<void> {
        try {
            const tour = await this.tourService.getAllTours();
            const response: APIResponse<typeof tour> = { status: true, data: tour };
            res.status(200).json(response);
        } catch (error: any) {
            const response: APIResponse<null> = { status: false, error: error.message };
            res.status(500).json(response);
        }
    }

    async getTourById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            console.log(id);
            // Validate the ID
            if (isNaN(Number(id))) {
                return next(new AppError(400, 'Invalid ID format'));
            }

            const tour = await this.tourService.findTourById(Number(id));
            if (!tour) {
                return next(new AppError(404, 'Tour not found'));
            }

            const response: APIResponse<typeof tour> = { status: true, data: tour };
            res.status(200).json(response);
        } catch (error: any) {
            const response: APIResponse<null> = { status: false, error: error.message };
            res.status(500).json(response);
        }
    }

    async updateTour(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            // Validate the ID
            if (isNaN(Number(id))) {
                return next(new AppError(400, 'Invalid ID format'));
            }

            const tour = await this.tourService.updateTour(Number(id), req.body);
            if (!tour) {
                return next(new AppError(404, 'Tour not found'));
            }

            const response: APIResponse<typeof tour> = { status: true, data: tour };
            res.status(200).json(response);
        } catch (error: any) {
            const response: APIResponse<null> = { status: false, error: error.message };
            res.status(500).json(response);
        }
    }

    async deleteTour(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            // Validate the ID
            if (isNaN(Number(id))) {
                return next(new AppError(400, 'Invalid ID format'));
            }

            const isDeleted = await this.tourService.deleteTour(Number(id));
            if (!isDeleted) {
                return next(new AppError(404, 'Tour not found'));
            }

            const response: APIResponse<null> = { status: true, message: 'Tour deleted successfully' };
            res.status(200).json(response);
        } catch (error: any) {
            const response: APIResponse<null> = { status: false, error: error.message };
            res.status(500).json(response);
        }
    }
}