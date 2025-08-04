import { injectable } from "tsyringe";
import Tour from "@/models/tour.model";
import TourPrices from "@/models/tourprices.model";
import Tourimages from "@/models/tourimages.model";
import { ITourRepository } from "@/types/repo/ITourRepository";
import sequelize from "@/config/database";

@injectable()
export class TourRepository implements ITourRepository {
    
    async createTour(tourData: Partial<Tour>): Promise<Tour> {
        return await Tour.create(tourData);
    }

    async createTourWithRelations(
        tourData: Partial<Tour>, 
        prices: Array<{ personCount: number; price: number }>,
        imageUrls: string[]
    ): Promise<Tour> {
        const transaction = await sequelize.transaction();
        
        try {
            const tour = await Tour.create(tourData, { transaction });
            
            if (prices && prices.length > 0) {
                const priceData = prices.map(price => ({
                    tourId: tour.id,
                    personCount: price.personCount,
                    price: price.price
                }));
                await TourPrices.bulkCreate(priceData, { transaction });
            }
            
            if (imageUrls && imageUrls.length > 0) {
                const imageData = imageUrls.map(url => ({
                    tourId: tour.id,
                    img_url: url
                }));
                await Tourimages.bulkCreate(imageData, { transaction });
            }
            
            await transaction.commit();
            
            return await Tour.findByPk(tour.id, {
                include: [
                    { model: TourPrices, as: 'TourPrices' },
                    { model: Tourimages, as: 'Tourimages' }
                ]
            }) as Tour;
            
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getAllTours(): Promise<Tour[]> {
        return await Tour.findAll();
    }

    async findTourById(tourId: number): Promise<Tour | null> {
        return await Tour.findByPk(tourId);
    }

    async updateTour(tourId: number, updateData: Partial<Tour>): Promise<Tour | null> {
        const tour = await this.findTourById(tourId);
        if (!tour) return null;
        return await tour.update(updateData);
            
    }   

    async deleteTour(tourId: number): Promise<boolean> {
        const tour = await this.findTourById(tourId);
        if (!tour) return false;
        await tour.destroy();
        return true;
    }
}