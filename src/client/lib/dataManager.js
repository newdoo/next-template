import { action, observable, computed } from 'mobx'

class DataManager {
  socket = null;

  @observable user = {nick: '', balance: 0}
  @observable bust = 0;
  @observable state = 'none'
  @observable selectSub = 0
  @observable bettings = new Map()
  @observable historys = new Map()

  balance = () => this.user.balance
  nick = () => this.user.nick

  @action setHistory = msg => msg.forEach(i => this.historys.set(i.seed, i))
  @computed get historyList() {return Array.from(this.historys.values())}

  @action addBettingData = msg => this.bettings.set(msg.nick, msg)
  @computed get bettingList() {return Array.from(this.bettings.values())}

  @action setSelectSub = select => this.selectSub = select
  @action setState = state => this.state = state
  @action setBust = bust => this.bust = bust
  @action setUser = (nick, balance) => this.user = {nick, balance}
}

let instance = null;
export default instance === null ? instance = new DataManager : instance
