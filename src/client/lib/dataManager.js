import { action, observable } from 'mobx'

class DataManager {
  @observable nick = ''
  @observable bust = 0;
  @observable state = 'none'
  @observable isBetting = false
  @observable bettingList = []
  @observable stopList = []
  @observable selectSub = 0

  socket = null;

  @action setSelectSub = select => this.selectSub = select
  @action setStopList = list => this.stopList = list
  @action setBettingList = list => this.bettingList = list
  @action setBetting = bet => this.isBetting = bet
  @action setState = state => this.state = state 
  @action setBust = bust => this.bust = bust
  @action setNick = nick => this.nick = nick
}

let instance = null;
export default instance === null ? instance = new DataManager : instance
