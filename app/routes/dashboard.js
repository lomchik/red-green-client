import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  queryParams: {
    period: {
      refreshModel: true
    }
  },
  beforeModel(transition) {
    this._super(...arguments);

    if (transition.targetName === 'dashboard.index') {
      this.transitionTo('dashboard.overview');
    }
  },
  model(params) {
    var filter = {period: params.period};
    return Ember.RSVP.hash({
      balanceChange: this.store.query('balance-change', {filter: filter}),
      query: filter
    });
  },
  actions: {
    refreshRoute() {
      this.refresh(); //refreshes the model
    }
  }
});
