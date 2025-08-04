import { injectable, inject } from "tsyringe";
import { TourRepository } from "@/repositories/tour.repository";
import { ImageService } from "@/services/image.service";
import Tour from "@/models/tour.model";
import { StatusEnum } from "@/enums/status.enum";

@injectable()
export class TourService {

    constructor(@inject(TourRepository) private tourRepository: TourRepository) {}

    // async createTour(tourData: Partial<Tour>): Promise<Tour> {
    //     return await this.tourRepository.createTour(tourData);
    // }

    async createTourWithImages(
        tourData: any,
        files: {
            coverImage?: Express.Multer.File[];
            featuredImage?: Express.Multer.File[];
            tourImages?: Express.Multer.File[];
        }
    ): Promise<Tour> {
        try {
            let coverImageUrl = '';
            let featuredImageUrl = '';
            const tourImageUrls: string[] = [];

            if (files.coverImage && files.coverImage[0]) {
                const result = await ImageService.uploadImage(
                    files.coverImage[0].buffer,
                    files.coverImage[0].mimetype
                );
                coverImageUrl = result.publicUrl;
            }

            if (files.featuredImage && files.featuredImage[0]) {
                const result = await ImageService.uploadImage(
                    files.featuredImage[0].buffer,
                    files.featuredImage[0].mimetype
                );
                featuredImageUrl = result.publicUrl;
            }

            if (files.tourImages && files.tourImages.length > 0) {
                for (const file of files.tourImages) {
                    const result = await ImageService.uploadImage(
                        file.buffer,
                        file.mimetype
                    );
                    tourImageUrls.push(result.publicUrl);
                }
            }

            const processedTourData: Partial<Tour> = {
                title: tourData.title,
                slug: tourData.slug,
                duration: tourData.duration,
                location: tourData.location,
                metaTitle: tourData.metaTitle,
                metaDescription: tourData.metaDescription,
                description: tourData.description,
                labels: tourData.labels,
                itinerary: tourData.itinerary,
                faq: tourData.faq,
                metaKeywords: tourData.metaKeywords,
                coverImage: coverImageUrl,
                featuredImage: featuredImageUrl,
                status: StatusEnum.ACTIVE
            };

            const prices = tourData.prices ? JSON.parse(tourData.prices) : [];

            return await this.tourRepository.createTourWithRelations(
                processedTourData,
                prices,
                tourImageUrls
            );

        } catch (error) {
            throw new Error(`Failed to create tour: ${error}`);
        }
    }

    async getAllTours(): Promise<Tour[]> {
        return await this.tourRepository.getAllTours();
    }
    
    async findTourById(tourId: number): Promise<Tour | null> {
        return await this.tourRepository.findTourById(tourId);
    }
    
    async updateTour(tourId: number, updateData: Partial<Tour>): Promise<Tour | null> {
        return await this.tourRepository.updateTour(tourId, updateData);
    }
    
    async deleteTour(tourId: number): Promise<boolean> {
        return await this.tourRepository.deleteTour(tourId);
    }
}