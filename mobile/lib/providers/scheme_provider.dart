import 'package:flutter/material.dart';
import '../models/scheme.dart';
import '../services/api_service.dart';
import '../services/offline_service.dart';

class SchemeProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  final OfflineService _offlineService = OfflineService();

  List<Scheme> _schemes = [];
  List<Scheme> _filteredSchemes = [];
  bool _isLoading = false;
  String? _error;
  String _searchQuery = '';
  String _selectedCategory = 'All';
  String _selectedState = 'All India';

  List<Scheme> get schemes => _filteredSchemes;
  bool get isLoading => _isLoading;
  String? get error => _error;
  String get searchQuery => _searchQuery;
  String get selectedCategory => _selectedCategory;
  String get selectedState => _selectedState;

  Future<void> loadSchemes({bool forceRefresh = false}) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      // Try to load from cache first
      if (!forceRefresh) {
        final cachedSchemes = await _offlineService.getCachedSchemes();
        if (cachedSchemes != null && cachedSchemes.isNotEmpty) {
          _schemes = cachedSchemes;
          _applyFilters();
          _isLoading = false;
          notifyListeners();
        }
      }

      // Fetch from API
      _schemes = await _apiService.getSchemes();
      
      // Cache the schemes
      await _offlineService.cacheSchemes(_schemes);
      
      _applyFilters();
    } catch (e) {
      _error = e.toString();
      
      // If API fails, try to load from cache
      final cachedSchemes = await _offlineService.getCachedSchemes();
      if (cachedSchemes != null && cachedSchemes.isNotEmpty) {
        _schemes = cachedSchemes;
        _applyFilters();
        _error = 'Showing cached data. ${e.toString()}';
      }
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<Scheme?> getSchemeById(String id) async {
    try {
      // Check in loaded schemes first
      final scheme = _schemes.firstWhere(
        (s) => s.id == id,
        orElse: () => throw Exception('Scheme not found'),
      );
      return scheme;
    } catch (e) {
      // Fetch from API
      return await _apiService.getSchemeById(id);
    }
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    _applyFilters();
    notifyListeners();
  }

  void setCategory(String category) {
    _selectedCategory = category;
    _applyFilters();
    notifyListeners();
  }

  void setState(String state) {
    _selectedState = state;
    _applyFilters();
    notifyListeners();
  }

  void clearFilters() {
    _searchQuery = '';
    _selectedCategory = 'All';
    _selectedState = 'All India';
    _applyFilters();
    notifyListeners();
  }

  void _applyFilters() {
    _filteredSchemes = _schemes.where((scheme) {
      // Search filter
      if (_searchQuery.isNotEmpty) {
        final query = _searchQuery.toLowerCase();
        if (!scheme.name.toLowerCase().contains(query) &&
            !scheme.description.toLowerCase().contains(query)) {
          return false;
        }
      }

      // Category filter
      if (_selectedCategory != 'All' && scheme.category != _selectedCategory) {
        return false;
      }

      // State filter
      if (_selectedState != 'All India' && scheme.state != _selectedState) {
        return false;
      }

      return true;
    }).toList();
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}
