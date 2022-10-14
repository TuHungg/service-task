import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { compare, hash } from "bcryptjs";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import mongoose from "mongoose";

import { v4 as uuidv4 } from "uuid";
import { User, UserSchema } from "./schemas/users.schemas";
import { UserRepository } from "./users.repository";

@Injectable()
export class UsersHandler implements UserRepository {
	public constructor(
		@InjectModel(User.name) private userModel: mongoose.Model<User>
	) {}

	public async getUserModel() {
		if (!this.userModel) {
			this.userModel = mongoose.model("user", UserSchema);
		}

		return this.userModel;
	}

	public async getUserbyName(username: string): Promise<User> {
		const model = await this.getUserModel();

		const user = await model.findOne({ username });

		return user;
	}

	public async signup(
		username: string,
		password: string,
		address?: string,
		age?: number
	): Promise<string> {
		const model = await this.getUserModel();

		const hashPassword = await hash(password, 12);
		const userId = uuidv4();

		const user = await model.create({
			userId,
			username,
			password: hashPassword,
			address,
			age,
		});

		await user.save();
		return `Sign up ${username} successfully`;
	}

	public async signin(username: string, password: string): Promise<string> {
		const user = await this.getUserbyName(username);

		if (!user) {
			return `User ${username} of password invalid`;
		}

		const checkedPassword = await compare(password, user.password);

		if (!checkedPassword) {
			return `User ${username} of password invalid`;
		}

		const accessToken = sign(
			{ _id: user.userId, username, role: user.role },
			process.env.SECRET_KEY,
			{ algorithm: "HS256", expiresIn: "1h" }
		);

		return accessToken;
	}

	public async update(
		_id: mongoose.Types.ObjectId,
		username: string,
		address: string,
		age: number
	): Promise<string> {
		const model = await this.getUserModel();

		await model.updateOne({ _id }, { username, address, age });

		return `Update user have value { ${username}, ${address}, ${age} }`;
	}

	public async checkIdUser(id: string): Promise<boolean> {
		const model = await this.getUserModel();

		const checkId = await model.findById(id);

		if (!checkId) {
			return false;
		}

		return true;
	}

	public async verifyToken(token: string): Promise<JwtPayload | string> {
		const decoded = verify(token, process.env.SECRET_KEY);
		return decoded;
	}

	public async getAllUser(): Promise<User[]> {
		const model = await this.getUserModel();
		const users = await model.find();

		return users;
	}
}
