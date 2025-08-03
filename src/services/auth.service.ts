import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/jwt";
import { AuthRepository } from "@/repositories/auth.repository";
import { add } from 'date-fns';
import { injectable, inject } from "tsyringe";



@injectable()
export class AuthService {
  
  constructor(@inject(AuthRepository) private authRepository: AuthRepository) {}

  /**
   * Function: Register a new user
   * @param fullname 
   * @param email 
   * @param password 
   * @param mobile 
   * @returns 
   */
  async register(
    fullname: string,
    email: string,
    password: string,
    mobile?: string
  ): Promise<{ id: number; fullname: string; email: string; mobile?: string; roleId: number }> {
    const existingUser = await this.authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultRoleId = 4; 

    const user = await this.authRepository.createUser({
      fullname,
      email,
      password: hashedPassword,
      mobile,
      roleId: defaultRoleId,
    });

    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      mobile: user.mobile,
      roleId: user.roleId,
    };
  }

  async login(email: string, password: string): Promise<{ token: string; user: { id: number; fullname: string; email: string; mobile?: string; roleId: number } }> {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = generateToken({ id: user.id, email: user.email });
    
    // Create session with 1 hour expiry
    const expiresAt = add(new Date(), { hours: 1 });
    await this.authRepository.createUserSession(user.id, token, expiresAt);

    return {
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
        roleId: user.roleId
      },
    };
  }

  async logout(token: string): Promise<void> {
    const isInvalidated = await this.authRepository.invalidateUserSession(token);
    if (!isInvalidated) {
      throw new Error('Token is already invalid or does not exist');
    }
  }

  async getAuthUserDetails(userId: number): Promise<any> {
    const user = await this.authRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      mobile: user.mobile,
      roleId: user.roleId,
    };
  }

  async updateUserDetails(userId: number, updateData: {
  fullname?: string;
  mobile?: string;
  email?: string;
}): Promise<any> {
  
  const updatedUser = await this.authRepository.updateUser(userId, updateData);
  if (!updatedUser) {
    throw new Error("User not found");
  }

  return {
    id: updatedUser.id,
    fullname: updatedUser.fullname,
    email: updatedUser.email,
    mobile: updatedUser.mobile,
    roleId: updatedUser.roleId,
  };
  }

  async updatePassword(userId: number, currentPassword: string, newPassword: string): Promise<boolean> {
    // Validate current password
    const isValid = await this.authRepository.validatePassword(userId, currentPassword);
    if (!isValid) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    const updated = await this.authRepository.updateUserPassword(userId, hashedPassword);
    if (!updated) {
      throw new Error('Failed to update password');
    }

    // Invalidate all sessions
    await this.authRepository.invalidateAllUserSessions(userId);
    
    return true;
  }

  async logoutAllSessions(userId: number): Promise<void> {
    await this.authRepository.invalidateAllUserSessions(userId);
  }
}