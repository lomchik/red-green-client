import Ember from 'ember';

export default Ember.Route.extend({
  model (params, transition) {
    let entryDate = moment(); // current date
    if (transition.queryParams.period) {
      // first day of period from queryParams
      entryDate = moment(transition.queryParams.period + "-01");
    }
    return this.store.createRecord('balance-change',
      { changeType: 'income',
        entryDate: entryDate.format('YYYY-MM-DD')
      }
    );
  }
});
