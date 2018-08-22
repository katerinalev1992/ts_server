import DataProvider from './DataProvider';
import User from '../models/User';

export default class UserDataProvider extends DataProvider {
    constructor() {
        super('User');
    }

    select(from: any, onSelect: (err: any, users: User[]) => void) {
        this.db_store.find(from, onSelect);
    }

    create(data: User, onCreate: (err: any, newData: User) => void) {
        this.db_store.insert(data, onCreate);
    }

    update(from: any, newData: User, onUpdate?: (err: any, numReplaced: number) => void) {
        this.db_store.update(from, {$set: newData});
    }

    delete(from: any, onDelete?: (err: any, numRemoved: number) => void) {
        this.db_store.remove(from, {multi: true}, onDelete);
    }

    findOne(from: any, onSelect: (err: any, user: User) => void) {
        this.db_store.findOne(from, onSelect);
    }

    protected onLoadStore(err: any) {
        if (err !== null) {
            console.error(err);
        }
    }
}