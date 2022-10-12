export interface UserRepository {
	signup(
		username: string,
		password: string,
		address?: string,
		age?: number
	): Promise<string>;

	signin(username: string, password: string): Promise<string>;
}
