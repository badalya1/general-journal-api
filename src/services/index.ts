import { Application } from '../declarations';
import users from './users/users.service';
import categories from './categories/categories.service';
import accounts from './accounts/accounts.service';
import budgets from './budgets/budgets.service';
import transactions from './transactions/transactions.service';
import tags from './tags/tags.service';
import groups from './groups/groups.service';
import snapshots from './snapshots/snapshots.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(categories);
  app.configure(accounts);
  app.configure(budgets);
  app.configure(transactions);
  app.configure(tags);
  app.configure(groups);
  app.configure(snapshots);
}
