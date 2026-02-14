import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart' as supabase;
import '../models/user.dart' as models;
import '../services/auth_service.dart';

class AuthProvider with ChangeNotifier {
  final AuthService _authService = AuthService();
  
  supabase.User? _supabaseUser;
  models.User? _user;
  bool _isLoading = true;
  String? _error;

  supabase.User? get supabaseUser => _supabaseUser;
  models.User? get user => _user;
  bool get isAuthenticated => _supabaseUser != null;
  bool get isLoading => _isLoading;
  String? get error => _error;

  AuthProvider() {
    _init();
  }

  Future<void> _init() async {
    try {
      _supabaseUser = _authService.currentUser;
      if (_supabaseUser != null) {
        await _loadUserProfile();
      }
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }

    // Listen to auth state changes
    _authService.onAuthStateChange.listen((data) async {
      _supabaseUser = data.session?.user;
      if (_supabaseUser != null) {
        await _loadUserProfile();
      } else {
        _user = null;
      }
      notifyListeners();
    });
  }

  Future<void> _loadUserProfile() async {
    try {
      _user = await _authService.getUserProfile(_supabaseUser!.id);
      notifyListeners();
    } catch (e) {
      _error = e.toString();
    }
  }

  Future<bool> signIn(String email, String password) async {
    try {
      _error = null;
      _isLoading = true;
      notifyListeners();

      await _authService.signIn(email, password);
      return true;
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> signUp(String email, String password, {String? fullName}) async {
    try {
      _error = null;
      _isLoading = true;
      notifyListeners();

      await _authService.signUp(email, password, fullName: fullName);
      return true;
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> signOut() async {
    try {
      await _authService.signOut();
      _user = null;
      _supabaseUser = null;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
    }
  }

  Future<bool> updateProfile(models.User updatedUser) async {
    try {
      _error = null;
      await _authService.updateUserProfile(updatedUser);
      _user = updatedUser;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      return false;
    }
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}
