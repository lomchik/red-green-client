import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    save: function (balanceChangeData) {
      this.get('model').setProperties(balanceChangeData);
      this.get('model').save()
        .then(() => this.transitionToRoute('dashboard.incomes'));
    }
  }
});
