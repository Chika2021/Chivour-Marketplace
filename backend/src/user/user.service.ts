import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User> , private jwtService: JwtService) {}

    async getUser(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async register(userDto: User): Promise<User | { error: string } | {token:string}> {
        const {name, email, password} = userDto;
        if(!name || !email || !password) {
            return { error: 'Missing required fields' };
        }
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            return { error: 'User already exists' };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ name, email, password: hashedPassword });
        await this.userRepository.save(user);
        const token = this.jwtService.sign({ id: user.id });
        return { ...user, token };
    }

    async login(userDto: User): Promise<User | { error: string } | {token:string}> {
        const { email, password } = userDto;
        if (!email || !password) {
            return { error: 'Missing required fields' };
        }
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return { error: 'User not found' };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: 'Invalid password' };
        }
        const token = this.jwtService.sign({ id: user.id });
        return { ...user, token };
    
    }

    async findById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id } });
    }
}
