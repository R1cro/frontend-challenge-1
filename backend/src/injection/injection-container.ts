import { Container } from 'inversify';

import { AppRouter } from '~/app.router';
import Injection from '~/injection/injection';
import AuthController from '~/modules/auth/auth.controller';
import AuthRouter from '~/modules/auth/auth.router';
import AuthService from '~/modules/auth/auth.service';

import UploadService from '~/modules/upload/upload.service';
import UploadController from '~/modules/upload/upload.controller';
import UploadRouter from '~/modules/upload/upload.router';
import UploadStore from '~/modules/upload/upload.store';

const InjectionContainer = new Container();

InjectionContainer.bind<UploadService>(Injection.UploadService).to(UploadService);
InjectionContainer.bind<AuthService>(Injection.AuthService).to(AuthService);
InjectionContainer.bind<AuthController>(Injection.AuthController).to(AuthController);
InjectionContainer.bind<AuthRouter>(Injection.AuthRouter).to(AuthRouter);
InjectionContainer.bind<AppRouter>(Injection.AppRouter).to(AppRouter);
InjectionContainer.bind<UploadController>(Injection.UploadController).to(UploadController);
InjectionContainer.bind<UploadRouter>(Injection.UploadRouter).to(UploadRouter);
InjectionContainer.bind<UploadStore>(Injection.UploadStore).to(UploadStore);

export default InjectionContainer;
