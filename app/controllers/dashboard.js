import Ember from 'ember';
import BalanceChangePropertiesMixin from 'red-green-client/mixins/balance-change-properties';
import moment from 'moment';

export default Ember.Controller.extend(BalanceChangePropertiesMixin, {
  session: Ember.inject.service(),
  queryParams: ['period'],
  period: moment().format('YYYY-MM'),
  prevPeriod: Ember.computed('period', function () {
    return moment(this.get('period')).subtract(1,"month").format("YYYY-MM");
  }),
  nextPeriod: function () {
    return moment(this.get('period')).add(1,"month").format("YYYY-MM");
  }.property('period'),
  actions: {
    goPeriodBack() {
      const previousPeriod = moment(this.get('period'))
        .subtract(1,"month").format("YYYY-MM");
      this.set('period', previousPeriod);
    },
    goPeriodNext() {
      const nextPeriod = moment(this.get('period'))
        .add(1,"month").format("YYYY-MM");
      this.set('period', nextPeriod);
    },
    logout() {
      this.get('session').invalidate();
    },
    openNewBalanceModal(type) {
      let entryDate = moment(); // current date
      if (this.get('query').period !== entryDate.format('YYYY-MM')) {
        // first day of period from queryParams
        entryDate = moment(this.get('query').period + "-01");
      }
      this.set('balanceChange', this.store.createRecord('balance-change', {
          changeType: type,
          entryDate: entryDate.format('YYYY-MM-DD')
        }
      ));

      this.set('showModalDialog', true);
    },
    closeNewBalanceModal() {
      this.set('showModalDialog', false);
    },
    save(balanceChangeData) {
      this.get('balanceChange').setProperties(balanceChangeData);
      this.get('balanceChange').save().then(() => {
        this.send('closeNewBalanceModal');
        this.send('refreshRoute'); // bubble up to dashboard route
      });
    }
  }
});
