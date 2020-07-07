// Initializes the `budgets` service on path `/budgets`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Budgets } from './budgets.class';
import createModel from '../../models/budgets.model';
import hooks from './budgets.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'budgets': Budgets & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/budgets', new Budgets(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('budgets');

  service.hooks(hooks);
}
