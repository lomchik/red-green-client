import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('dashboard', {path: '/'}, function() {
    this.route('overview');
    this.route('incomes', function() {
      this.route('edit', {path: ':balance_change_id/edit'});
      this.route('new');
    });
    this.route('expenses', function() {
      this.route('new');
      this.route('edit', {path: ':balance_change_id/edit'});
    });
    this.route('settings');
  });
});

export default Router;
