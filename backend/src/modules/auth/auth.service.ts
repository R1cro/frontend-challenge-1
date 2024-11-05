import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';

@injectable()
class AuthService {
  private static readonly ACTIVE_SESSIONS: Set<string> = new Set();

  public isAdmin(providedUsername: string, providedPassword: string): boolean {
    return providedUsername === 'admin' && providedPassword === 'admin';
  }

  public signIn(username: string, password: string): string | null {
    if (this.isAdmin(username, password)) {
      const sessionId = uuidv4();
      AuthService.ACTIVE_SESSIONS.add(sessionId);
      return sessionId;
    }
    return null;
  }

  public signOut(sessionId: string): void {
    AuthService.ACTIVE_SESSIONS.delete(sessionId);
  }

  public isSessionActive(sessionId: string): boolean {
    return AuthService.ACTIVE_SESSIONS.has(sessionId);
  }
}

export default AuthService;
