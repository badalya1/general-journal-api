// Initializes the `snapshots` service on path `/snapshots`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Snapshots } from './snapshots.class';
import createModel from '../../models/snapshots.model';
import hooks from './snapshots.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'snapshots': Snapshots & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/snapshots', new Snapshots(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('snapshots');

  service.hooks(hooks);
}
