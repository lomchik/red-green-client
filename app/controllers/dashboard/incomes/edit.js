import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
  },
  session: Ember.inject.service(),
  actions: {
    save: function (balanceChangeData) {
      this.get('model').setProperties(balanceChangeData);
      this.get('model').save()
        .then(() => this.transitionToRoute('dashboard.incomes'));
    }
  }
});
