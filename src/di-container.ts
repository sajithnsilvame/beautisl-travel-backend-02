import "reflect-metadata";
import { container } from "tsyringe";
import { AuthService } from "@/services/auth.service";
import AuthController from "@/controllers/auth.controller";
import { UserRoleService } from "@/services/userRole.service";
import { UserRoleController } from "@/controllers/userRole.controller";
import { TourService } from "@/services/tour.service";
import { TourController } from "@/controllers/tour.controller";
import { AuthHelper } from "@/utils/authHelper";

// Register classes with the container
container.registerSingleton<AuthService>(AuthService);
container.registerSingleton<AuthHelper>(AuthHelper);
container.registerSingleton(AuthController, AuthController);

container.registerSingleton<UserRoleService>(UserRoleService);
container.registerSingleton(UserRoleController, UserRoleController);

container.registerSingleton<TourService>(TourService);
container.registerSingleton(TourController, TourController);


// container.registerTransient<TodoService>(TodoService);
// container.registerInstance<TodoService>(mockTodoService);



export { container };
