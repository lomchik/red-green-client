import Ember from 'ember';
import BalanceChangePropertiesMixin from 'red-green-client/mixins/balance-change-properties';

export default Ember.Controller.extend(BalanceChangePropertiesMixin, {
  session: Ember.inject.service(),
  delete(balanceChange) {
    if (confirm('You are sure?')) {
      balanceChange.destroyRecord()
        .then(() => this.send('refreshRoute'));
    }
  }
});
