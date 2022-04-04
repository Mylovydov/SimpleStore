import {makeAutoObservable} from 'mobx';

export type TypeAdministratos = {
	_id: string
	username: string
	email: string
	password: string
	createdDate: any
	updatedDate: any
}

export interface IAdministratorsStore {
	administrators: TypeAdministratos[];
	setAdministrators: (administrators: TypeAdministratos[]) => void;
}

class AdministratorsStore implements IAdministratorsStore {
	_administrators: TypeAdministratos[] = [];

	constructor() {
		this._administrators = [
			{
				_id: '1',
				username: 'root',
				email: 'root@root.gmail.com',
				password: '$2b$05$g/DT5EV.5IO7Ep5h5yuqmeU/O3Rr17GMW3pkeeRWVVr.vxj7LOoN6',
				createdDate: '2022-01-27T10:53:12.956+00:00',
				updatedDate: '2022-01-27T10:53:12.956+00:00'
			},
			{
				_id: '2',
				username: 'Denys',
				email: 'den@den.gmail.com',
				password: '$2b$05$zBhCeT8rZcrp6SdVvvUhxe1.O6mi7eJgVYqmjv90pwoPOT/Z1zHda',
				createdDate: '2022-01-28T13:48:34.045+00:00',
				updatedDate: '2022-01-28T13:48:34.045+00:00'
			}
		];
		makeAutoObservable(this);
	}

	setAdministrators(administrators: TypeAdministratos[]): void {
		this._administrators = administrators;
	}

	get administrators(): any {
		return this._administrators;
	}
}

export default new AdministratorsStore();