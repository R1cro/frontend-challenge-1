const Injection = {
  AuthService: Symbol.for('AuthService'),
  AuthController: Symbol.for('AuthController'),
  AuthRouter: Symbol.for('AuthRouter'),
  AppRouter: Symbol.for('AppRouter'),

  UploadService: Symbol.for('UploadService'),
  UploadController: Symbol.for('UploadController'),
  UploadRouter: Symbol.for('UploadRouter'),
  UploadStore: Symbol.for('UploadStore')
};

export default Injection;
