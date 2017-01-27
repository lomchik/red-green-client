import Ember from 'ember';
import accounting from 'accounting';

export default Ember.Helper.extend({
  session: Ember.inject.service(),
  compute(params/*, hash*/) {
    const value = params[0]/100;
    const symbol = params[1] || this.get('session.currentUser.currencySymbol');

    return accounting.formatMoney(value, symbol);
  }
});
