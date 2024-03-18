import { UserLogin } from '../model/user';
import { UsersRepository } from './users.repository';

describe('Given the class Users Repository', () => {
  describe('When we instantiate it without errors', () => {
    const mockRepo = new UsersRepository('');
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce([{}, {}]),
      });
    });
    const mockUser = {
      id: '01',
      userName: 'Luffy',
    };
    const mockUserLogin = {
      password: '01',
      userName: 'Luffy',
    } as UserLogin;
    const mockToken = 'Token';

    test('Then, method getAll should have been called', () => {
      mockRepo.getAll();
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, method getById should have been called', () => {
      mockRepo.getById(mockUser.id);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, method create should have been called', () => {
      mockRepo.create(mockUser as unknown as FormData);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, login method should return user', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(['Test']),
      });
      await mockRepo.login(mockUserLogin);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, method update should have been called', () => {
      mockRepo.update(mockUser.id, mockUser, mockToken);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, method delete should have been called', () => {
      mockRepo.delete(mockUser.id, mockToken);
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('When we instantiate it with errors', () => {
    const mockErrorRepo = new UsersRepository('');
    const mockUser = {
      id: '01',
      userName: 'Luffy',
    };
    const mockUserLogin = { username: 'Zoro' } as unknown as UserLogin;

    const mockToken = 'Token';

    test('Then, method getAll should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(mockErrorRepo.getAll()).rejects.toThrow();
    });

    test('Then, method getById should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(mockErrorRepo.getById(mockUser.id)).rejects.toThrow();
    });

    test('Then, method create should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(
        mockErrorRepo.create(mockUser as unknown as FormData)
      ).rejects.toThrow();
    });

    test('Then, method update should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(
        mockErrorRepo.update(mockUser.id, mockUser, mockToken)
      ).rejects.toThrow();
    });

    test('Then, method login should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(mockErrorRepo.login(mockUserLogin)).rejects.toThrow();
    });

    test('Then, method delete should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(mockErrorRepo.delete(mockUser.id, mockToken)).rejects.toThrow();
    });
  });
});
