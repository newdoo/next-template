import { action, observable } from 'mobx'

class Store {
  @observable data;
}

let instance = null;
export default instance === null ? instance = new Store : instance
