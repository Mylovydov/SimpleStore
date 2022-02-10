import { makeAutoObservable } from "mobx"

export type TypeAdmin = {
   _id: string
   // username: string
   // email: string
   // createdDate: any
   // updatedDate: any
}

export interface IAdminStore {
   isAuth: boolean
   admin: TypeAdmin
   setIsAuth: (bool: boolean) => void
   setAdmin: (admin: TypeAdmin) => void
}

class AdminStore implements IAdminStore {
   _isAuth: boolean = false
   _admin: TypeAdmin = { _id: ''}
   
   constructor() {
      this._isAuth = false
      this._admin = {
         _id: ''
      }
      makeAutoObservable(this)
   }

   setIsAuth(bool: boolean): void {
      this._isAuth = bool
   }

   setAdmin(admin: any): void {
      this._admin = admin
   }

   get isAuth(): boolean {
      return this._isAuth
   }

   get admin(): any {
      return this._admin
   }
}

export default new AdminStore()