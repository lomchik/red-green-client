import Ember from 'ember';

export default Ember.Mixin.create({
  query: Ember.computed.readOnly('model.query'),
  balanceChanges: Ember.computed.alias('model.balanceChange'),
  incomes: Ember.computed.filterBy('balanceChanges.[]', 'changeType', 'income'),
  expenses: Ember.computed.filterBy('balanceChanges.[]', 'changeType', 'expense'),
  incomeValues: Ember.computed('incomes.[]', 'incomes.@each.value', function() {
    return this.get('incomes').mapBy('value');
  }),
  expenseValues: Ember.computed('expenses.[]', 'expenses.@each.value', function() {
    return this.get('expenses').mapBy('value');
  }),
  incomeSum: Ember.computed.sum('incomeValues'),
  expenseSum: Ember.computed.sum('expenseValues'),
  sumDifference: Ember.computed('incomeSum', 'expenseSum', function() {
    return this.get('incomeSum') - this.get('expenseSum');
  }),
  incomePercent: Ember.computed(
    'incomeSum',
    'expenseSum',
    function() {
      const sumBoth = this.get('incomeSum') + this.get('expenseSum');
      return this.get('incomeSum')*100/(sumBoth);
    }
  ),
  expensePercent: Ember.computed(
    'incomeSum',
    'expenseSum',
    function() {
      const sumBoth = this.get('incomeSum') + this.get('expenseSum');
      return this.get('expenseSum')*100/(sumBoth);
    }
  ),
});
