import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  host: ENV.serverURL,
  namespace: ENV.apiNamespace,
  pathForType (type) {
    let underscored = Ember.String.underscore(type);

    return Ember.String.pluralize(underscored);
  }
});
