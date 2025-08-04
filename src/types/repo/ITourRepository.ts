import Tour from "@/models/tour.model";
        
export interface ITourRepository {
    createTour(tour: Partial<Tour>): Promise<Tour>;
    createTourWithRelations(
        tourData: Partial<Tour>, 
        prices: Array<{ personCount: number; price: number }>,
        imageUrls: string[]
    ): Promise<Tour>;
    getAllTours(): Promise<Tour[]>;
    findTourById(tourId: number): Promise<Tour | null>;
    updateTour(tourId: number, updateData: Partial<Tour>): Promise<Tour | null>;
    deleteTour(tourId: number): Promise<boolean>;
}